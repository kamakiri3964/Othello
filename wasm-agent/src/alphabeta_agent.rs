use std::convert::TryInto;

use crate::{
    agent::Agent,
    othello::{lsb, Board},
};

pub fn n_search() -> u128 {
    static mut N_SEARCH: u128 = 0;
    unsafe {
        N_SEARCH += 1;
        N_SEARCH
    }
}

#[derive(Clone)]
pub struct AlphaBetaAgent {
    depth: usize,
}

impl AlphaBetaAgent {
    pub fn new(depth: usize) -> Self {
        AlphaBetaAgent { depth }
    }

    /// Returns (next hand (u64), evaluation value (i32))
    /// when depth is 0, returns (0, evaluation value (i32))
    fn eval_by_search(&self, board: Board, depth: usize, limit_min_v: i32, limit_max_v: i32) -> (u64, i32) {
        n_search();
        if depth == 0 {
            return (0, self.eval(board));
        }
        let mut legal = board.legal();
        if legal == 0 {
            let new_b = Board {
                player: board.opponent,
                opponent: board.player,
                is_player_black: !board.is_player_black,
            };
            let (_, v) = self.eval_by_search(new_b, depth - 1, -limit_max_v, -limit_min_v);
            return (0, -v);
        }
        let mut max_v = limit_min_v;
        let mut best_hand = 0;
        let mut h = lsb(legal);
        while h != 0 {
            let new_b = board.put_uncheck(h);
            let (_, v) = self.eval_by_search(new_b, depth - 1, -limit_max_v, -max_v);
            if limit_max_v < -v {
                return (h, -v);
            }
            if max_v < -v {
                max_v = -v;
                best_hand = h;
            }
            legal ^= h;
            h = lsb(legal);
        }
        (best_hand, max_v)
    }

    fn eval(&self, board: Board) -> i32 {
        board.player.count_ones().try_into().unwrap()
    }
}

impl Agent for AlphaBetaAgent {
    fn next(&mut self, board: &Board) -> u64 {
        let (hand, _) = self.eval_by_search(board.clone(), self.depth, i32::min_value()+1, i32::max_value());
        hand
    }
}

#[cfg(test)]
mod tests {
    use std::{fs::File, io::{BufRead, BufReader}, time::Instant};

    use crate::{minmax_agent::MinMaxAgent, reverse::init_reverse};

    use super::*;
    #[test]
    #[ignore]
    fn test_depth() {
        init_reverse();
        let depth = 6;
        let mut agent = AlphaBetaAgent::new(depth);
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

    // cargo test alphabeta_agent::tests::compare_to_minmax --release -- --ignored
    #[test]
    #[ignore]
    fn compare_to_minmax() {
        init_reverse();
        let depth = 6;
        let mut agent = AlphaBetaAgent::new(depth);
        let mut minmax_agent = MinMaxAgent::new(depth);
        let mut boards = Vec::new();
        if let Ok(file) = File::open("./data/random_boards.jsonl") {
            for result in BufReader::new(file).lines() {
                if let Ok(board_json) = result {
                    if let Ok(board) = serde_json::from_str::<Board>(&board_json) {
                        boards.push(board);
                    }
                }
            }
        }
        for board in boards.iter().take(100) {
            let actual = agent.next(&board);
            let expected = minmax_agent.next(&board);
            assert_eq!(actual, expected);
        }
    }
}
