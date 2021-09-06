use crate::{
    agent::Agent,
    othello::{lsb, Board},
    search_count::n_search,
};

#[derive(Clone)]
pub struct NegaScoutAgent {
    depth: usize,
    eval: fn(&Board) -> i32,
    // order: fn(&Board) -> i32,
}

impl NegaScoutAgent {
    pub fn new(depth: usize, eval: fn(&Board) -> i32) -> Self {
        NegaScoutAgent { depth, eval }
    }

    /// Returns (next hand (u64), evaluation value (i32))
    /// when depth is 0, returns (0, evaluation value (i32))
    fn eval_by_search(
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

        // move ordering
        let mut children = Vec::<(i32, u64, Board)>::new(); // (evaluation, hand, board)
        let mut max_v = limit_min_v;
        let mut h = lsb(legal);
        while h != 0 {
            let new_b = board.put_uncheck(h);
            let (_, v) = self.eval_by_search(new_b.clone(), 0, -limit_max_v, -max_v);
            if max_v < -v {
                max_v = -v;
            }
            children.push((-v, h, new_b));
            legal ^= h;
            h = lsb(legal);
        }
        children.sort_by(|a, b| b.0.cmp(&a.0));

        // search
        let mut best_hand = 0;
        let mut max_v = limit_min_v;
        let (_, h, new_b) = &children[0];
        let (_, v) = self.eval_by_search(new_b.clone(), depth - 1, -limit_max_v, -limit_min_v);
        if limit_max_v <= -v {
            return (*h, -v);
        }
        if max_v < -v {
            max_v = -v;
            best_hand = *h;
        }

        for (_, h, new_b) in children.iter().skip(1) {
            // null window search
            let (_, v) = self.eval_by_search(new_b.clone(), depth - 1, -max_v - 1, -max_v);
            // let (_, v) = self.eval_by_search(new_b.clone(), depth - 1, -limit_max_v, -max_v);
            if limit_max_v <= -v {
                return (*h, -v);
            }
            if max_v < -v {
                max_v = -v;
                best_hand = *h;
                let (_, v) = self.eval_by_search(new_b.clone(), depth - 1, -limit_max_v, -max_v);
                if limit_max_v <= -v {
                    return (*h, -v);
                }
                if max_v < -v {
                    max_v = -v;
                }
            }
        }
        (best_hand, max_v)
    }
}

impl Agent for NegaScoutAgent {
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
    };

    use crate::{
        alphabeta_agent::AlphaBetaAgent, evaluation::count_stone, othello::Board,
        reverse::init_reverse,
    };

    use super::NegaScoutAgent;

    // cargo test negascout_agent::tests::compare_to_alph_beta --release -- --ignored
    #[test]
    #[ignore]
    fn compare_to_alph_beta() {
        init_reverse();
        let depth = 6;
        let negascoutagent = NegaScoutAgent::new(depth, count_stone);
        let agent = AlphaBetaAgent::new(depth, count_stone);
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
            let (actual_hand, actual) = negascoutagent.eval_by_search(
                board.clone(),
                depth,
                i32::min_value() + 1,
                i32::max_value(),
            );
            let (expected_hand, expected) =
                agent.eval_by_search(board.clone(), depth, i32::min_value() + 1, i32::max_value());
            if expected != actual {
                println!("{}", board);
                let b = Board {
                    player: actual_hand,
                    opponent: expected_hand,
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
