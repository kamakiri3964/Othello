static mut MASK: [[[u64; 4]; 8]; 8] = [[[0; 4]; 8]; 8];
static mut OUTFLANK: [[u8; 1<<8]; 8] = [[0; 1<<8]; 8];
static mut FLIPPED: [u8; 1<<8] = [0; 1<<8];

unsafe fn init_mask() {
    MASK = new_mask();
}

unsafe fn get_mask(x: usize, y: usize, d: usize) -> u64 {
    *MASK.get_unchecked(x).get_unchecked(y).get_unchecked(d)
}

unsafe fn init_outflank() {
    OUTFLANK = new_outflank();
}

unsafe fn init_flipped() {
    FLIPPED = new_flipped();
}

pub fn init_reverse() {
    unsafe{
        init_outflank();
        init_flipped();
        init_mask();
    }
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
    unsafe {
        *OUTFLANK.get_unchecked(pos.trailing_zeros() as usize).get_unchecked(opp as usize)
    }
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
    unsafe {
        *FLIPPED.get_unchecked(of as usize)
    }
}

pub fn reverse(player: u64, opponent: u64, pos: u64) -> u64 {
    let mut ret = 0;
    let i = pos.trailing_zeros();
    let x = i / 8;
    let y = i % 8;
    for d in 0..4 {
        unsafe {  // x = [0, 8), y = [0, 8), d = [0, 4)
            let ply = extruct_line(player, x, y, d);
            let opp = extruct_line(opponent, x, y, d);
            let p = extruct_line(pos, x, y, d);
            let flip = flipped(p | (outflank(p, opp) & ply));
            ret |= inv_extruct_line(flip, x, y, d);
        }
    }
    ret
}

fn new_mask() -> [[[u64; 4]; 8]; 8] {
    let mut mask: [[[u64; 4]; 8]; 8] = [[[0; 4]; 8]; 8];
    let mut m = 0x0000_0000_0000_00ff;
    for x in 0..8 {
        for y in 0..8 {
            mask[x][y][0] = m;
        }
        m <<= 8;
    }
    let mut m = 0x0101_0101_0101_0101;
    for y in 0..8 {
        for x in 0..8 {
            mask[x][y][1] = m;
        }
        m <<= 1;
    }
    let m = 0x8040_2010_0804_0201;
    for y in 0..8 {
        for x in 0..8 {
            mask[x][y][2] = if x < y { m >> (8*(y - x)) } else { m << (8*(x - y))};
        }
    }
    let m = 0x0102_0408_1020_4080;
    for y in 0..8 {
        for x in 0..8 {
            mask[x][y][3] = if x+y > 7 { m << (8*((y + x) - 7)) } else { m >> (8*(7 - (x + y)))};
        }
    }
    mask
}

pub unsafe fn extruct_line(b: u64, x: u32, y: u32, d: usize) -> u8 {
    match d {
        0 => {
            ((b & get_mask(x as usize, y as usize, d)) >> (8 * x) ) as u8
        },
        1 => {
            (((b & get_mask(x as usize, y as usize, d)) >> y).wrapping_mul(0x8040_2010_0804_0201) >> (8 * 7)) as u8
        },
        2 => {
            ((b & get_mask(x as usize, y as usize, d)).wrapping_mul(0x0101_0101_0101_0101) >> (8 * 7)) as u8
        },
        3 => {
            ((b & get_mask(x as usize, y as usize, d)).wrapping_mul(0x0101_0101_0101_0101) >> (8 * 7)) as u8
        },
        _ => { panic!("direction(d) should be 0-4") }
    }
}

pub unsafe fn inv_extruct_line(l: u8, x: u32, y: u32, d: usize) -> u64 {
    match d {
        0 => {
            (l as u64) << (8 * x)
        },
        1 => {
            ((l as u64).wrapping_mul(0x8040_2010_0804_0201) >> (7-y)) & get_mask(x as usize, y as usize, d)
        },
        2 => {
            (l as u64).wrapping_mul(0x0101_0101_0101_0101) & get_mask(x as usize, y as usize, d)
        },
        3 => {
            (l as u64).wrapping_mul(0x0101_0101_0101_0101) & get_mask(x as usize, y as usize, d)
        },
        _ => { panic!("direction(d) should be 0-4") }
    }
}


#[cfg(test)]
mod tests {
    use crate::othello::{Board};

    use super::*;
    #[test]
    fn test_outflank() {
        unsafe {
            init_outflank();
        }
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
        unsafe {
            init_flipped();
        }
        assert_eq!(flipped(0x81), 0x7e);
        assert_eq!(flipped(0x89), 0x76);
        assert_eq!(flipped(0x10), 0x00);
        assert_eq!(flipped(0x48), 0x30);
        assert_eq!(flipped(0x42), 0x3c);
    }

    #[test]
    fn test_reverse() {
        init_reverse();
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
        unsafe {
            init_mask();
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
            assert_eq!(line, 0x70);
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
        unsafe {
            init_mask();
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
    }
}
