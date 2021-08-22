use std::collections::HashSet;

use wasm_agent::{agent::{Agent, RandomAgent}, othello::{Board, GameStatus}};

fn board_hash(board: &Board) -> u128 {
    ((board.player as u128) << 64) ^ (board.opponent as u128)
}

fn main() {
    let mut hash_set = HashSet::<u128>::new();
    let mut board = Board::new();
    let h = board_hash(&board);
    hash_set.insert(h);
    let serialized = serde_json::to_string(&board).unwrap();
    println!("{}", serialized);
    let n = 1000;
    let mut agent = RandomAgent::new();
    for _ in 0..n {
        let p = agent.next(&board);
        match board.next(p) {
            Ok((b, status)) => {
                board = b;
                // println!("{}", board);
                if status == GameStatus::End {
                    board = Board::new();
                } else {
                    let h = board_hash(&board);
                    if !hash_set.contains(&h) {
                        hash_set.insert(h);
                        let serialized = serde_json::to_string(&board).unwrap();
                        println!("{}", serialized);
                    }
                }
            }
            Err(t) => { eprintln!("{}", t); }
        }
    }
}