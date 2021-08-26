use serde::{Deserialize, Serialize};
use std::{
    fmt,
    ops::{Shl, Shr},
};

use crate::reverse::reverse;

#[derive(Debug, PartialEq, Eq)]
pub enum GameStatus {
    Ok,
    Pass,
    End,
}

#[derive(Debug, PartialEq, Eq, Serialize, Deserialize, Clone)]
pub struct Board {
    pub player: u64,
    pub opponent: u64,
    pub is_player_black: bool,
}

impl Board {
    pub fn new() -> Board {
        return Board {
            player: 0x0000000810000000,
            opponent: 0x0000001008000000,
            is_player_black: true,
        };
    }

    pub fn parse(s: &str) -> Board {
        const UPPER_LEFT: u64 = 0x8000000000000000;
        let mut board = Board::new();
        let mut black = 0;
        let mut white = 0;
        let v = s.split('\n').collect::<Vec<_>>();
        v.iter()
            .by_ref()
            .skip(1)
            .take(8)
            .enumerate()
            .for_each(|(i, &b)| {
                b.chars().by_ref().skip(3).enumerate().for_each(|(j, a)| {
                    if a == 'X' {
                        black |= UPPER_LEFT >> i * 8 + j / 2;
                    } else if a == 'O' {
                        white |= UPPER_LEFT >> i * 8 + j / 2;
                    }
                })
            });
        let s = v[v.len() - 2];
        if s.split(":").collect::<Vec<_>>()[1] == " X" {
            board.is_player_black = true;
        } else {
            board.is_player_black = false;
        }
        board.player = black;
        board.opponent = white;
        board
    }

    pub fn legal(&self) -> u64 {
        let n_shifts_and_masks = [
            (1u64, 0x7e7e7e7e7e7e7e7e), // right / left
            (7u64, 0x007e7e7e7e7e7e00), // down left / up right
            (8u64, 0x00ffffffffffff00), // down / up
            (9u64, 0x007e7e7e7e7e7e00), // down right / up left
        ];
        let d_shifts = [Shl::shl, Shr::shr];
        let mut candidate = 0;

        for (n_shifts, mask) in n_shifts_and_masks.iter() {
            let mask = mask & self.opponent;
            for shift in d_shifts.iter() {
                let mut bits = mask & shift(self.player, n_shifts);
                for _ in 0..5 {
                    bits |= mask & shift(bits, n_shifts);
                }
                candidate |= shift(bits, n_shifts);
            }
        }
        candidate & !(self.player | self.opponent)
    }

    pub fn is_legal(&self, pos: u64) -> bool {
        pos.count_ones() == 1 && self.legal() & pos != 0
    }

    pub fn reverse(&self, pos: u64) -> u64 {
        reverse(self.player, self.opponent, pos)
        // let n_shifts_and_masks = [
        //     (1u64, 0x7e7e7e7e7e7e7e7e), // right / left
        //     (7u64, 0x007e7e7e7e7e7e00), // down left / up right
        //     (8u64, 0x00ffffffffffff00), // down / up
        //     (9u64, 0x007e7e7e7e7e7e00), // down right / up left
        // ];
        // let d_shifts = [Shl::shl, Shr::shr];
        // let mut reverse = 0;
        // for (n_shifts, mask) in n_shifts_and_masks.iter() {
        //     for shift in d_shifts.iter() {
        //         let mut r = 0;
        //         let mut p = shift(pos, n_shifts);
        //         while p & mask & self.opponent != 0u64 {
        //             r |= p;
        //             p = shift(p, n_shifts);
        //         }
        //         if p & self.player != 0u64 {
        //             reverse |= r;
        //         }
        //     }
        // }
        // reverse
    }

    pub fn put_uncheck(&self, pos: u64) -> Self {
        let disc_to_flip = self.reverse(pos);
        let new_o = self.player | pos | disc_to_flip;
        let new_p = self.opponent ^ disc_to_flip;
        Board {
            player: new_p,
            opponent: new_o,
            is_player_black: !self.is_player_black,
        }
    }

    pub fn put(&self, pos: u64) -> Result<Self, &str> {
        if !self.is_legal(pos) {
            return Err("illegal position to put");
        }
        Ok(self.put_uncheck(pos))
    }

    pub fn next(&self, pos: u64) -> Result<(Self, GameStatus), &str> {
        match self.put(pos) {
            Ok(mut next) => {
                if next.legal() != 0 {
                    Ok((next, GameStatus::Ok))
                } else {
                    let t = next.player;
                    next.player = next.opponent;
                    next.opponent = t;
                    next.is_player_black = !next.is_player_black;
                    if next.legal() != 0 {
                        Ok((next, GameStatus::Pass)) // pass
                    } else {
                        let t = next.player;
                        next.player = next.opponent;
                        next.opponent = t;
                        next.is_player_black = !next.is_player_black;
                        Ok((next, GameStatus::End)) // finish game
                    }
                }
            }
            Err(x) => Err(x),
        }
    }
}

pub fn parse_coord(s: &str) -> Result<u64, &str> {
    let v = s.chars().collect::<Vec<_>>();
    if v.len() != 2 {
        return Err("invalid coordition format");
    }
    let mut c = 0x8000000000000000;
    match v[0] {
        'a' => {}
        'b' => {
            c >>= 1;
        }
        'c' => {
            c >>= 2;
        }
        'd' => {
            c >>= 3;
        }
        'e' => {
            c >>= 4;
        }
        'f' => {
            c >>= 5;
        }
        'g' => {
            c >>= 6;
        }
        'h' => {
            c >>= 7;
        }
        _ => return Err("invalid coordition format"),
    }
    match v[1] {
        '1' => {}
        '2' => {
            c >>= 1 * 8;
        }
        '3' => {
            c >>= 2 * 8;
        }
        '4' => {
            c >>= 3 * 8;
        }
        '5' => {
            c >>= 4 * 8;
        }
        '6' => {
            c >>= 5 * 8;
        }
        '7' => {
            c >>= 6 * 8;
        }
        '8' => {
            c >>= 7 * 8;
        }
        _ => return Err("invalid coordition format"),
    }
    Ok(c)
}

impl fmt::Display for Board {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        const UPPER_LEFT: u64 = 0x8000000000000000;
        let (b, w) = if self.is_player_black {
            (self.player, self.opponent)
        } else {
            (self.opponent, self.player)
        };
        let board: String = (0..8)
            .map(|i| {
                let row: String = (0..8)
                    .map(|j| {
                        let pos_mask = UPPER_LEFT >> i * 8 + j;
                        if b & pos_mask != 0 {
                            "|X"
                        } else if w & pos_mask != 0 {
                            "|O"
                        } else {
                            "| "
                        }
                    })
                    .collect();
                format!("{} {}|\n", i + 1, row)
            })
            .collect();
        let next = if self.is_player_black { "X" } else { "O" };
        write!(f, "   A B C D E F G H\n{}\nnext: {}\n", board, next)
    }
}

pub fn lsb_idx(pos: u64) -> Option<usize> {
    // const DE_BUIJN_SEQ: u64 = 0x03F566ED27179461;
    // const POS_MAP: [usize; 64] = [
    //     0, 1, 59, 2, 60, 40, 54, 3, 61, 32, 49, 41, 55, 19, 35, 4, 62, 52, 30, 33, 50, 12, 14, 42,
    //     56, 16, 27, 20, 36, 23, 44, 5, 63, 58, 39, 53, 31, 48, 18, 34, 51, 29, 11, 13, 15, 26, 22,
    //     43, 57, 38, 47, 17, 28, 10, 25, 21, 37, 46, 9, 24, 45, 8, 7, 6,
    // ];
    if pos == 0 {
        return None;
    }
    // let v = pos & ((-(pos as i128)) as u64);
    // let h = ((v.wrapping_mul(DE_BUIJN_SEQ)) >> 58) as usize;
    // Some(POS_MAP[h])
    Some(pos.trailing_zeros() as usize)
}

pub fn lsb(pos: u64) -> u64 {
    pos & ((-(pos as i128)) as u64)
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_display_board() {
        let board = Board::new();
        let board_string = r#"   A B C D E F G H
1 | | | | | | | | |
2 | | | | | | | | |
3 | | | | | | | | |
4 | | | |O|X| | | |
5 | | | |X|O| | | |
6 | | | | | | | | |
7 | | | | | | | | |
8 | | | | | | | | |

next: X
"#;
        assert_eq!(format!("{}", board), board_string);
    }

    #[test]
    fn test_parse_board() {
        let board = Board::new();
        let parsed_board = Board::parse(&format!("{}", board));
        assert_eq!(board, parsed_board);
    }

    #[test]
    fn test_legal() {
        let board = Board::new();
        let legal = board.legal();
        assert_eq!(legal, 0x0000102004080000);
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
        let board_string = r#"   A B C D E F G H
1 | | | | | | | | |
2 | |X|X|X|X| | | |
3 | | | | | | | | |
4 | |X| | | |X| | |
5 | | | | | |X| | |
6 | | | | | |X| | |
7 |X| | |X|X| | | |
8 |X|X| | | | | | |

next: X
"#;
        let legal = Board::parse(board_string);
        assert_eq!(board.legal(), legal.player);
    }

    #[test]
    fn test_reverse() {
        let board = Board::new();
        let to_flip = board.reverse(0x0000100000000000);
        assert_eq!(to_flip, 0x0000001000000000);
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
        let to_flip = board.reverse(0x0000000000008000);
        assert_eq!(to_flip, 0x0000000000804000);
        let to_flip = board.reverse(0x0000000000001000);
        assert_eq!(to_flip, 0x0000000010100000);
    }

    #[test]
    fn test_parse_coord() {
        assert_eq!(parse_coord("a1"), Ok(0x8000000000000000));
        assert_eq!(parse_coord("c7"), Ok(0x0000000000002000));
        assert_eq!(parse_coord("c10"), Err("invalid coordition format"));
        assert_eq!(parse_coord("z1"), Err("invalid coordition format"));
        assert_eq!(parse_coord("a9"), Err("invalid coordition format"));
        assert_eq!(parse_coord("A1"), Err("invalid coordition format"));
    }

    #[test]
    fn test_next_state() {
        let mut board = Board::new();
        let mut p = 0;
        if let Ok(t) = parse_coord("f5") {
            p = t
        }
        if let Ok((b, status)) = board.next(p) {
            assert_eq!(status, GameStatus::Ok);
            board = b
        }
        if let Ok(t) = parse_coord("d6") {
            p = t
        }
        if let Ok((b, status)) = board.next(p) {
            assert_eq!(status, GameStatus::Ok);
            board = b
        }
        if let Ok(t) = parse_coord("c5") {
            p = t
        }
        if let Ok((b, status)) = board.next(p) {
            assert_eq!(status, GameStatus::Ok);
            board = b
        }
        if let Ok(t) = parse_coord("f4") {
            p = t
        }
        if let Ok((b, status)) = board.next(p) {
            assert_eq!(status, GameStatus::Ok);
            board = b
        }
        if let Ok(t) = parse_coord("e7") {
            p = t
        }
        if let Ok((b, status)) = board.next(p) {
            assert_eq!(status, GameStatus::Ok);
            board = b
        }
        if let Ok(t) = parse_coord("f6") {
            p = t
        }
        if let Ok((b, status)) = board.next(p) {
            assert_eq!(status, GameStatus::Ok);
            board = b
        }
        if let Ok(t) = parse_coord("g5") {
            p = t
        }
        if let Ok((b, status)) = board.next(p) {
            assert_eq!(status, GameStatus::Ok);
            board = b
        }
        if let Ok(t) = parse_coord("e6") {
            p = t
        }
        if let Ok((b, status)) = board.next(p) {
            assert_eq!(status, GameStatus::Ok);
            board = b
        }
        if let Ok(t) = parse_coord("e3") {
            p = t
        }
        if let Ok((_, status)) = board.next(p) {
            assert_eq!(status, GameStatus::End);
        }
    }

    #[test]
    fn test_next_state_pass() {
        let moves = ["f5", "f6", "d3", "g5", "h5", "h4", "f7", "h6"];
        let exp = [
            GameStatus::Ok,
            GameStatus::Ok,
            GameStatus::Ok,
            GameStatus::Ok,
            GameStatus::Ok,
            GameStatus::Ok,
            GameStatus::Ok,
            GameStatus::Pass,
        ];
        let mut board = Board::new();
        let mut p = 0;
        for (m, e) in moves.iter().zip(exp.iter()) {
            if let Ok(t) = parse_coord(m) {
                p = t
            }
            if let Ok((b, status)) = board.next(p) {
                assert_eq!(status, *e);
                board = b;
            }
        }
    }

    #[test]
    fn test_lsb_idx() {
        let x = 0x0000_0000_0000_0001;
        for i in 0..64 {
            assert_eq!(lsb_idx(x << i), Some(i));
        }
        let x = 0xf820_4510_0af0_7eb1;
        for i in 0..64 {
            assert_eq!(lsb_idx(x << i), Some(i));
        }
        assert_eq!(lsb_idx(0), None);
    }

    #[test]
    fn test_lsb() {
        let x = 0x0000_0000_0000_0001;
        for i in 0..64 {
            assert_eq!(lsb(x << i), 1 << i);
        }
        let x = 0xf820_4510_0af0_7eb1;
        for i in 0..64 {
            assert_eq!(lsb(x << i), 1 << i);
        }
        assert_eq!(lsb(0), 0);
    }
}
