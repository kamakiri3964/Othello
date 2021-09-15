use std::collections::HashMap;

use crate::{
    agent::Agent,
    othello::{lsb, Board},
    search_count::n_search,
};

#[derive(Clone)]
pub struct AlphaBetaAgent {
    depth: usize,
    eval: fn(&Board) -> i32,
}

impl AlphaBetaAgent {
    pub fn new(depth: usize, eval: fn(&Board) -> i32) -> Self {
        AlphaBetaAgent { depth, eval }
    }

    /// Returns (next hand (u64), evaluation value (i32))
    /// when depth is 0, returns (0, evaluation value (i32))
    pub fn eval_by_search(
        &self,
        board: Board,
        depth: usize,
        limit_min_v: i32,
        limit_max_v: i32,
    ) -> (u64, i32) {
        n_search();
        if depth == 0 {
            return (0, (self.eval)(&board));
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
            if limit_max_v <= -v {
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
}

impl Agent for AlphaBetaAgent {
    fn next(&mut self, board: &Board) -> u64 {
        let (hand, _) = self.eval_by_search(
            board.clone(),
            self.depth,
            i32::min_value() + 1,
            i32::max_value(),
        );
        hand
    }
}

#[derive(Clone)]
pub struct MemoAlphaBetaAgent {
    depth: usize,
    memo: HashMap<(usize, u128), (i32, i32)>,
    eval: fn(&Board) -> i32,
}

impl MemoAlphaBetaAgent {
    pub fn new(depth: usize, eval: fn(&Board) -> i32) -> Self {
        MemoAlphaBetaAgent {
            depth,
            memo: HashMap::new(),
            eval,
        }
    }

    fn hash(&self, board: &Board) -> u128 {
        ((board.player as u128) << 64) ^ (board.opponent as u128)
    }

    /// Returns (next hand (u64), evaluation value (i32))
    /// when depth is 0, returns (0, evaluation value (i32))
    fn eval_by_search(
        &mut self,
        board: Board,
        depth: usize,
        limit_min_v: i32,
        limit_max_v: i32,
    ) -> (u64, i32) {
        n_search();
        let hash = self.hash(&board);
        if let Some(&(a, b)) = self.memo.get(&(depth, hash)) {
            if a == b {
                return (0, a);
            } else if limit_max_v < a {
                return (0, a);
            } else if b < limit_min_v {
                return (0, b);
            }

            // if limit_min_v < a {
            //     limit_min_v = a;
            // }
        }
        if depth == 0 {
            let v = (self.eval)(&board);
            self.memo.insert((depth, hash), (v, v));
            return (0, v);
        }
        let mut legal = board.legal();
        if legal == 0 {
            let new_b = Board {
                player: board.opponent,
                opponent: board.player,
                is_player_black: !board.is_player_black,
            };
            let (_, v) = self.eval_by_search(new_b, depth - 1, -limit_max_v, -limit_min_v);
            if -v < limit_min_v {
                self.memo.insert((depth, hash), (i32::min_value() + 1, -v));
            } else if -v <= limit_max_v {
                self.memo.insert((depth, hash), (-v, -v));
            } else {
                self.memo.insert((depth, hash), (-v, i32::max_value()));
            }
            return (0, -v);
        }
        let mut max_v = limit_min_v;
        let mut best_hand = 0;
        let mut h = lsb(legal);
        while h != 0 {
            let new_b = board.put_uncheck(h);
            let (_, v) = self.eval_by_search(new_b, depth - 1, -limit_max_v, -max_v);
            if limit_max_v <= -v {
                self.memo.insert((depth, hash), (-v, i32::max_value()));
                return (h, -v);
            }
            if max_v < -v {
                max_v = -v;
                best_hand = h;
            }
            legal ^= h;
            h = lsb(legal);
        }
        if best_hand == 0 {
            self.memo
                .insert((depth, hash), (i32::min_value() + 1, max_v));
        } else {
            self.memo.insert((depth, hash), (max_v, max_v));
        }
        (best_hand, max_v)
    }
}

impl Agent for MemoAlphaBetaAgent {
    fn next(&mut self, board: &Board) -> u64 {
        let (hand, _) = self.eval_by_search(
            board.clone(),
            self.depth,
            i32::min_value() + 1,
            i32::max_value(),
        );
        hand
    }
}

#[cfg(test)]
mod tests {
    use std::{
        fs::File,
        io::{BufRead, BufReader},
        time::Instant,
    };

    use crate::{evaluation::count_stone, minmax_agent::MinMaxAgent, reverse::init_reverse};

    use super::*;
    #[test]
    #[ignore]
    fn test_depth() {
        init_reverse();
        let depth = 6;
        let mut agent = AlphaBetaAgent::new(depth, count_stone);
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
        let mut agent = AlphaBetaAgent::new(depth, count_stone);
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

    // cargo test alphabeta_agent::tests::compare_to_memo --release -- --ignored
    #[test]
    #[ignore]
    fn compare_to_memo() {
        init_reverse();
        let depth = 6;
        let mut agent = AlphaBetaAgent::new(depth, count_stone);
        let mut memoagent = MemoAlphaBetaAgent::new(depth, count_stone);
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
        for (idx, board) in boards.iter().take(100).enumerate() {
            let actual = agent.next(&board);
            let expected = memoagent.next(&board);
            if expected != actual {
                println!("{}", board);
                let b = Board {
                    player: actual,
                    opponent: expected,
                    is_player_black: true,
                };
                println!("{}", b);
                println!("idx: {}", idx);
                assert_eq!(actual, expected);
            }
            assert_eq!(actual, expected);
        }
    }
}
