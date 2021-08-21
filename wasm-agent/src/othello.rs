use std::{fmt, ops::{Shl, Shr}};

#[derive(Debug, PartialEq, Eq)]
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
        v.iter().skip(1).enumerate().for_each(|(i, &b)| {
            b.chars().skip(3).enumerate().for_each(|(j, a)| {
                if a == 'X' {
                    black |= UPPER_LEFT >> i * 8 + j / 2;
                } else if a == 'O' {
                    white |= UPPER_LEFT >> i * 8 + j / 2;
                }
            })
        });
        board.player = black;
        board.opponent = white;
        board
    }

    pub fn legal(&self) -> u64 {
        let n_shifts_and_masks = [
            (1, 0x7e7e7e7e7e7e7e7e),  // right / left
            (7, 0x007e7e7e7e7e7e00),  // down left / up right
            (8, 0x00ffffffffffff00),  // down / up 
            (9, 0x007e7e7e7e7e7e00),  // down right / up left
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
        write!(f, "   A B C D E F G H\n{}", board)
    }
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
"#;
        let legal = Board::parse(board_string);
        assert_eq!(board.legal(), legal.player);
    }
}