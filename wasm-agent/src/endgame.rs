use std::ops::Neg;

use crate::{
    agent::Agent,
    othello::{lsb, Board},
};

#[derive(Clone)]
pub struct EndGameAgent {
    ordering_depth: usize,
}

pub enum Result {
    Win,
    Lose,
    Draw,
}

impl Neg for Result {
    type Output = Result;
    fn neg(self) -> Self::Output {
        match self {
            Result::Win => Result::Lose,
            Result::Lose => Result::Win,
            Result::Draw => Result::Draw,
        }
    }
}

struct BoardIterator {
    board: u64,
}

impl BoardIterator {
    pub fn new(board: u64) -> Self {
        BoardIterator { board }
    }
}

impl Iterator for BoardIterator {
    type Item = u64;

    fn next(&mut self) -> Option<Self::Item> {
        let h = lsb(self.board);
        self.board ^= h;
        if h == 0 {
            None
        } else {
            Some(h)
        }
    }
}

struct NextBoard {
    board: Board,
    legal: BoardIterator,
}

impl NextBoard {
    pub fn new(board: Board, legal: u64) -> Self {
        NextBoard {
            board,
            legal: BoardIterator::new(legal),
        }
    }
}

impl Iterator for NextBoard {
    type Item = (u64, Board);

    fn next(&mut self) -> Option<Self::Item> {
        if let Some(h) = self.legal.next() {
            Some((h, self.board.put_uncheck(h)))
        } else {
            None
        }
    }
}

impl EndGameAgent {
    pub fn new(ordering_depth: usize) -> Self {
        EndGameAgent { ordering_depth }
    }

    pub fn eval(&self, board: Board) -> Result {
        let p = board.player.count_ones();
        let o = board.opponent.count_ones();
        if p > o {
            Result::Win
        } else if p < o {
            Result::Lose
        } else {
            Result::Draw
        }
    }

    pub fn win(&self, board: Board, passed: bool, depth: usize) -> (u64, Result) {
        if (board.player ^ board.opponent).count_ones() == 64 {
            return (0, self.eval(board));
        }
        let legal = board.legal();
        if legal == 0 {
            let new_b = Board {
                player: board.opponent,
                opponent: board.player,
                is_player_black: !board.is_player_black,
            };
            if passed {
                return (0, -self.eval(new_b));
            }
            let (_, r) = self.win(new_b, true, depth + 1);
            return (0, -r);
        }

        if depth < self.ordering_depth {
            // move ordering
            let mut children = NextBoard::new(board, legal)
                .map(|(h, board)| (board.legal().count_ones(), h, board))
                .collect::<Vec<_>>(); // (evaluation, hand, board)
            children.sort_by(|a, b| a.0.cmp(&b.0));

            let mut draw_hand = 0;
            let mut lose_hand = 0;
            for (_, h, new_b) in children {
                let (_, r) = self.win(new_b, false, depth + 1);
                match -r {
                    Result::Win => {
                        return (h, Result::Win);
                    }
                    Result::Lose => {
                        lose_hand = h;
                    }
                    Result::Draw => {
                        draw_hand = h;
                    }
                }
            }
            if draw_hand != 0 {
                return (draw_hand, Result::Draw);
            } else {
                return (lose_hand, Result::Lose);
            }
        } else {
            let mut draw_hand = 0;
            let mut lose_hand = 0;
            for (h, new_b) in NextBoard::new(board, legal) {
                let (_, r) = self.win(new_b, false, depth + 1);
                match -r {
                    Result::Win => {
                        return (h, Result::Win);
                    }
                    Result::Lose => {
                        lose_hand = h;
                    }
                    Result::Draw => {
                        draw_hand = h;
                    }
                }
            }
            if draw_hand != 0 {
                return (draw_hand, Result::Draw);
            } else {
                return (lose_hand, Result::Lose);
            }
        }
    }
}

impl Agent for EndGameAgent {
    fn next(&mut self, board: &Board) -> u64 {
        let (hand, _) = self.win(board.clone(), false, 0);
        hand
    }
}
