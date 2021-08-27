use once_cell::sync::Lazy;

pub fn init_reverse() {
    outflank(1, 0);
    flipped(0);
}

fn new_outflank() -> [[u8; 1<<8]; 8] {
    let mut outflank: [[u8; 1<<8]; 8] = [[0; 1<<8]; 8];
    for i in 0..8 {
        let pos = 1 << i;
        for opp in 0..(1u16<<8) {
            outflank[i][opp as usize] = calc_outflank(pos, opp as u8);
        }
    }
    outflank
}

fn calc_outflank(pos: u8, opp: u8) -> u8 {
    let mut ret = 0;
    let mut p = pos;
    p = p << 1;
    if p & opp != 0 {
        while p&opp != 0 {
            p = p << 1;
        }
        ret |= p;
    }
    p = pos;
    p = p >> 1;
    if p & opp != 0 {
        while p&opp != 0 {
            p = p >> 1;
        }
        ret |= p;
    }
    ret
}

pub fn outflank(pos: u8, opp: u8) -> u8 {
    static OUTFLANK: Lazy<[[u8; 1<<8]; 8]> = Lazy::new(new_outflank);
    OUTFLANK[pos.trailing_zeros() as usize][opp as usize]
}

fn new_flipped() -> [u8; 1<<8] {
    let mut flipped: [u8; 1<<8] = [0; 1<<8];
    for of in 0..(1u16<<8) {
        flipped[of as usize] = calc_flipped(of as u8);
    }
    flipped
}

pub fn calc_flipped(of: u8) -> u8 {
    let mut ret = 0;
    let mut b = of & ((-(of as i16)) as u8);
    b = b << 1;
    let mut t = 0;
    for _ in 0..8 {
        if of & b != 0 {
            ret |= t;
            t = 0;
        } else {
            t |= b;
        }
        b = b << 1;
    }
    ret
}

pub fn flipped(of: u8) -> u8 {
    static FLIPPED: Lazy<[u8; 1<<8]> = Lazy::new(new_flipped);
    FLIPPED[of as usize]
}

pub fn reverse(player: u64, opponent: u64, pos: u64) -> u64 {
    let mut ret = 0;
    let i = pos.trailing_zeros();
    let x = i / 8;
    let y = i % 8;
    for d in 0..4 {
        let ply = extruct_line(player, x, y, d);
        let opp = extruct_line(opponent, x, y, d);
        let p = extruct_line(pos, x, y, d);
        let flip = flipped(p | (outflank(p, opp) & ply));
        ret |= inv_extruct_line(flip, x, y, d);
    }
    ret
}

pub fn extruct_line(b: u64, x: u32, y: u32, d: usize) -> u8 {
    let f = [
        get_horizontal_edge,
        get_vertical_edge,
        get_diag_up_left_edge,
        get_diag_up_right_edge
    ];
    let s = [
        |b: u64, x: u32, _: u32| -> u64 { b >> (8*x) },
        |b: u64, _: u32, y: u32| -> u64 { b >> y },
        |b: u64, x: u32, y: u32| -> u64 { if x < y { b << (8*(y - x)) } else { b >> (8*(x - y))}},
        |b: u64, x: u32, y: u32| -> u64 { if x+y > 7 { b >> (8*((y + x) - 7)) } else { b << (8*(7 - (x + y)))}}
    ];
    let masks = [
        0x0000_0000_0000_00ff,
        0x0101_0101_0101_0101,
        0x8040_2010_0804_0201,
        0x0102_0408_1020_4080
    ];
    f[d](s[d](b, x, y)&masks[d])
}

pub fn inv_extruct_line(l: u8, x: u32, y: u32, d: usize) -> u64 {
    let f = [
        set_horizontal_edge,
        set_vertical_edge,
        set_diag_up_left_edge,
        set_diag_up_right_edge
    ];
    let s = [
        |b: u64, x: u32, _: u32| -> u64 { b << (8*x) },
        |b: u64, _: u32, y: u32| -> u64 { b << y },
        |b: u64, x: u32, y: u32| -> u64 { if x < y { b >> (8*(y - x)) } else { b << (8*(x - y))}},
        |b: u64, x: u32, y: u32| -> u64 { if x+y > 7 { b << (8*((y + x) - 7)) } else { b >> (8*(7 - (x + y)))}}
    ];
    s[d](f[d](l), x, y)
}

pub fn get_horizontal_edge(board: u64) -> u8 {
    (board & 0x0000_0000_0000_00ff) as u8
}

pub fn set_horizontal_edge(edge: u8) -> u64 {
    edge as u64
}

pub fn get_vertical_edge(board: u64) -> u8 {
    ((board.wrapping_mul(0x0102_0408_1020_4080) & 0xff00_0000_0000_0000) >> (8 * 7)) as u8
}

pub fn set_vertical_edge(edge: u8) -> u64 {
    (((edge as u64).wrapping_mul(0x0101_0101_0101_0101) & 0x8040_2010_0804_0201)
        .wrapping_mul(0x0000_0000_0000_00ff)
        >> 7)
        & 0x0101_0101_0101_0101
}

pub fn get_diag_up_right_edge(board: u64) -> u8 {
    ((board.wrapping_mul(0x0101_0101_0101_0101) & 0xff00_0000_0000_0000) >> (8 * 7)) as u8
}

pub fn set_diag_up_right_edge(edge: u8) -> u64 {
    (edge as u64).wrapping_mul(0x0101_0101_0101_0101) & 0x0102_0408_1020_4080
}

pub fn get_diag_up_left_edge(board: u64) -> u8 {
    ((board.wrapping_mul(0x0101_0101_0101_0101) & 0xff00_0000_0000_0000) >> (8 * 7)) as u8
}

pub fn set_diag_up_left_edge(edge: u8) -> u64 {
    (edge as u64).wrapping_mul(0x0101_0101_0101_0101) & 0x8040_2010_0804_0201
}


#[cfg(test)]
mod tests {
    use crate::othello::{Board};

    use super::*;
    #[test]
    fn test_outflank() {
        let pos = 0x10;
        let opp = 0x28;
        assert_eq!(outflank(pos, opp), 0x44);
        let opp = 0x68;
        assert_eq!(outflank(pos, opp), 0x84);
        let opp = 0xe8;
        assert_eq!(outflank(pos, opp), 0x04);
        let opp = 0x44;
        assert_eq!(outflank(pos, opp), 0x00);
        let pos = 0x01;
        let opp = 0x06;
        assert_eq!(outflank(pos, opp), 0x08);
        let pos = 0x01;
        let opp = 0x04;
        assert_eq!(outflank(pos, opp), 0x00);
        let pos = 0x02;
        let opp = 0x05;
        assert_eq!(outflank(pos, opp), 0x08);
        let pos = 0x04;
        let opp = 0x13;
        assert_eq!(outflank(pos, opp), 0x00);
    }

    #[test]
    fn test_flipped() {
        assert_eq!(flipped(0x81), 0x7e);
        assert_eq!(flipped(0x89), 0x76);
        assert_eq!(flipped(0x10), 0x00);
        assert_eq!(flipped(0x48), 0x30);
        assert_eq!(flipped(0x42), 0x3c);
    }

    #[test]
    fn test_reverse() {
        let player = 0x0000_0002_0000_0000;
        let opponent = 0x0000_009c_0000_0000;
        let pos = 0x0000_0020_0000_0000;
        assert_eq!(reverse(player, opponent, pos), 0x0000_001c_0000_0000);
    }

    #[test]
    fn test_extruct_line() {
        let board_string = r#"   A B C D E F G H
1 | | | | | | | | |
2 | |-|-|-|-| | | |
3 | | |O|O| | | | |
4 | |-|O|X|X|-| | |
5 |X|X|X|O|O|-| | |
6 |O|X|X|O|O|-| | |
7 |-|O|X|-|-| | | |
8 |-|-|O| | | | | |

next: X
"#;
        let board = Board::parse(board_string);
        let p: u64 = 0x0000_0000_0004_0000;
        let i = p.trailing_zeros();
        let x = i / 8;
        let y = i % 8;
        let line = extruct_line(board.opponent, x, y, 0);
        assert_eq!(line, 0x98);
        let p: u64 = 0x0020_0000_0000_0000;
        let i = p.trailing_zeros();
        let x = i / 8;
        let y = i % 8;
        let line = extruct_line(board.player, x, y, 1);
        assert_eq!(line, 0x0e);
        let p: u64 = 0x0000_0000_0000_1000;
        let i = p.trailing_zeros();
        let x = i / 8;
        let y = i % 8;
        let line = extruct_line(board.player, x, y, 2);
        assert_eq!(line, 0x60);
        let p: u64 = 0x0020_0000_0000_0000;
        let i = p.trailing_zeros();
        let x = i / 8;
        let y = i % 8;
        let line = extruct_line(board.player, x, y, 2);
        assert_eq!(line, 0x08);
        let p: u64 = 0x0008_0000_0000_0000;
        let i = p.trailing_zeros();
        let x = i / 8;
        let y = i % 8;
        let line = extruct_line(board.opponent, x, y, 3);
        assert_eq!(line, 0xb0);
        let p: u64 = 0x0000_0000_0400_0000;
        let i = p.trailing_zeros();
        let x = i / 8;
        let y = i % 8;
        let line = extruct_line(board.opponent, x, y, 3);
        assert_eq!(line, 0x28);
    }

    #[test]
    fn test_inv_extruct_line() {
        let board_string = r#"   A B C D E F G H
1 | | | | | | | | |
2 | |-|-|-|-| | | |
3 | | |O|O| | | | |
4 | |-|O|X|X|-| | |
5 |X|X|X|O|O|-| | |
6 |O|X|X|O|O|-| | |
7 |-|O|X|-|-| | | |
8 |-|-|O| | | | | |

next: X
"#;
        let board = Board::parse(board_string);
        let p: u64 = 0x0000_0000_0004_0000;
        let i = p.trailing_zeros();
        let x = i / 8;
        let y = i % 8;
        let line = extruct_line(board.opponent, x, y, 0);
        assert_eq!(inv_extruct_line(line, x, y, 0), 0x0000_0000_0098_0000);

        let p: u64 = 0x0020_0000_0000_0000;
        let i = p.trailing_zeros();
        let x = i / 8;
        let y = i % 8;
        let line = extruct_line(board.player, x, y, 1);
        assert_eq!(inv_extruct_line(line, x, y, 1), 0x0000_0000_2020_2000);

        let p: u64 = 0x0000_0000_0000_1000;
        let i = p.trailing_zeros();
        let x = i / 8;
        let y = i % 8;
        let line = extruct_line(board.player, x, y, 2);
        assert_eq!(inv_extruct_line(line, x, y, 2), 0x0000_0000_4020_0000);

        let p: u64 = 0x0020_0000_0000_0000;
        let i = p.trailing_zeros();
        let x = i / 8;
        let y = i % 8;
        let line = extruct_line(board.player, x, y, 2);
        assert_eq!(inv_extruct_line(line, x, y, 2), 0x0000_0008_0000_0000);

        let p: u64 = 0x0008_0000_0000_0000;
        let i = p.trailing_zeros();
        let x = i / 8;
        let y = i % 8;
        let line = extruct_line(board.opponent, x, y, 3);
        assert_eq!(inv_extruct_line(line, x, y, 3), 0x0000_1020_0080_0000);

        let p: u64 = 0x0000_0000_0400_0000;
        let i = p.trailing_zeros();
        let x = i / 8;
        let y = i % 8;
        let line = extruct_line(board.opponent, x, y, 3);
        assert_eq!(inv_extruct_line(line, x, y, 3), 0x0000_0000_0008_0020);
    }

    #[test]
    fn test_get_vertical_edge() {
        let board_string = r#"   A B C D E F G H
1 | | | | | | | |X|
2 | | | | | | | |X|
3 | | | | | | | | |
4 | | | | | | | | |
5 | | | | | | | |X|
6 | | | | | | | |X|
7 | | | | | | | | |
8 | | | | | | | |X|

next: X
"#;
        let mut board = Board::parse(board_string);
        board.player = get_vertical_edge(board.player) as u64;
        let rotated_string = r#"   A B C D E F G H
1 | | | | | | | | |
2 | | | | | | | | |
3 | | | | | | | | |
4 | | | | | | | | |
5 | | | | | | | | |
6 | | | | | | | | |
7 | | | | | | | | |
8 |X|X| | |X|X| |X|

next: X
"#;
        let expected = Board::parse(rotated_string);
        assert_eq!(board, expected);
    }

    #[test]
    fn test_set_vertical_edge() {
        let board_string = r#"   A B C D E F G H
1 | | | | | | | |X|
2 | | | | | | | |X|
3 | | | | | | | | |
4 | | | | | | | | |
5 | | | | | | | |X|
6 | | | | | | | |X|
7 | | | | | | | | |
8 | | | | | | | |X|

next: X
"#;
        let board = Board::parse(board_string);
        assert_eq!(
            board.player,
            set_vertical_edge(get_vertical_edge(board.player))
        );
    }

    #[test]
    fn test_get_diag_up_right_edge() {
        let board_string = r#"   A B C D E F G H
1 | | | | | | | |X|
2 | | | | | | |X| |
3 | | | | | | | | |
4 | | | | | | | | |
5 | | | |X| | | | |
6 | | |X| | | | | |
7 | | | | | | | | |
8 |X| | | | | | | |

next: X
"#;
        let mut board = Board::parse(board_string);
        board.player = get_diag_up_right_edge(board.player) as u64;
        let rotated_string = r#"   A B C D E F G H
1 | | | | | | | | |
2 | | | | | | | | |
3 | | | | | | | | |
4 | | | | | | | | |
5 | | | | | | | | |
6 | | | | | | | | |
7 | | | | | | | | |
8 |X| |X|X| | |X|X|

next: X
"#;
        let expected = Board::parse(rotated_string);
        assert_eq!(board, expected);
    }

    #[test]
    fn test_set_diag_up_right_edge() {
        let board_string = r#"   A B C D E F G H
1 | | | | | | | |X|
2 | | | | | | |X| |
3 | | | | | | | | |
4 | | | | | | | | |
5 | | | |X| | | | |
6 | | |X| | | | | |
7 | | | | | | | | |
8 |X| | | | | | | |

next: X
"#;
        let board = Board::parse(board_string);
        assert_eq!(
            board.player,
            set_diag_up_right_edge(get_diag_up_right_edge(board.player))
        );
    }

    #[test]
    fn test_get_diag_up_left_edge() {
        let board_string = r#"   A B C D E F G H
1 |X| | | | | | | |
2 | | | | | | | | |
3 | | |X| | | | | |
4 | | | |X| | | | |
5 | | | | | | | | |
6 | | | | | | | | |
7 | | | | | | |X| |
8 | | | | | | | |X|

next: X
"#;
        let mut board = Board::parse(board_string);
        board.player = get_diag_up_left_edge(board.player) as u64;
        let rotated_string = r#"   A B C D E F G H
1 | | | | | | | | |
2 | | | | | | | | |
3 | | | | | | | | |
4 | | | | | | | | |
5 | | | | | | | | |
6 | | | | | | | | |
7 | | | | | | | | |
8 |X| |X|X| | |X|X|

next: X
"#;
        let expected = Board::parse(rotated_string);
        assert_eq!(board, expected);
    }

    #[test]
    fn test_set_diag_up_left_edge() {
        let board_string = r#"   A B C D E F G H
1 |X| | | | | | | |
2 | | | | | | | | |
3 | | |X| | | | | |
4 | | | |X| | | | |
5 | | | | | | | | |
6 | | | | | | | | |
7 | | | | | | |X| |
8 | | | | | | | |X|

next: X
"#;
        let board = Board::parse(board_string);
        assert_eq!(
            board.player,
            set_diag_up_left_edge(get_diag_up_left_edge(board.player))
        );
    }
}
