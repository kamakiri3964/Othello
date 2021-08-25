use std::convert::TryInto;

use crate::{agent::Agent, othello::{Board, lsb}};


pub struct MinMaxAgent {
    depth: usize,
}

impl MinMaxAgent {
    pub fn new(depth: usize) -> Self {
        MinMaxAgent { depth }
    }

    fn eval_by_search(&self, board: Board, depth: usize) -> (u64, i32) {
        if depth == 0 {
            return (0, self.eval(board))
        }
        let mut legal = board.legal();
        if legal == 0 {
            let new_b = Board {
                player: board.opponent,
                opponent: board.player,
                is_player_black: !board.is_player_black,
            };
            let (_, v) = self.eval_by_search(new_b, depth-1);
            return (0, -v);
        }
        let mut max_v = i32::min_value();
        let mut first_hand = 0;
        while let Some(m) = lsb(legal) {
            let h = 1 << m;
            let new_b = board.put_uncheck(h);
            let (_, v) = self.eval_by_search(new_b, depth-1);
            if max_v < -v {
                max_v = -v;
                first_hand = h;
            }
            legal ^= h;
        }
        (first_hand, max_v)
    }

    fn eval(&self, board: Board) -> i32 {
        board.player.count_ones().try_into().unwrap()
    }
}

impl Agent for MinMaxAgent {
    fn next(&mut self, board: &Board) -> u64 {
        let (hand, _) = self.eval_by_search(board.clone(), self.depth);
        hand
    }
}

#[cfg(test)]
mod tests {
    use std::time::Instant;

    use super::*;
    #[test]
    #[ignore]
    fn test_depth() {
        let depth = 6;
        let mut agent = MinMaxAgent::new(depth);
        let board_string = r#"   A B C D E F G H
1 |O|O|O|O|O|O|O| |
2 |O|X| |X|O|O|O|O|
3 |O|X|X|O|O|X|O|O|
4 |O|X|O|X|X|O|O|O|
5 |O|X|X|O|O| |X|O|
6 |O|X|X|O|O|X| |X|
7 | |O|O| | |O| | |
8 | | |O| | | | | |

next: X
"#;
        // let board = Board::new();
        let board = Board::parse(board_string);
        let start = Instant::now();
        agent.next(&board);
        let end = start.elapsed();
        eprintln!("{}.{:03}sec", end.as_secs(), end.subsec_nanos() / 1_000_000);
    }
}