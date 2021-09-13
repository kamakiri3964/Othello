use std::collections::HashSet;

use rand::SeedableRng;
use wasm_agent::{
    agent::{Agent, RandomAgent},
    othello::{Board, GameStatus},
    reverse::init_reverse,
};

fn board_hash(board: &Board) -> u128 {
    ((board.player as u128) << 64) ^ (board.opponent as u128)
}

fn main() {
    init_reverse();
    let mut hash_set = HashSet::<u128>::new();
    let mut board = Board::new();
    let h = board_hash(&board);
    hash_set.insert(h);
    let serialized = serde_json::to_string(&board).unwrap();
    println!("{}", serialized);
    let n = 10000;
    let mut board_count = [0; 65];
    //let mut agent = RandomAgent::new(rand::thread_rng());
    let mut agent = RandomAgent::new(rand_xoshiro::Xoshiro256StarStar::seed_from_u64(123));
    for _ in 0..n {
        let (p, _) = agent.next(&board);
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
                        let filled = board.player.count_ones() + board.opponent.count_ones();
                        board_count[filled as usize] += 1;
                    }
                }
            }
            Err(t) => {
                eprintln!("{}", t);
            }
        }
    }
    for (i, n_board) in board_count.iter().enumerate() {
        eprintln!("{}: {}", i, n_board);
    }
}
