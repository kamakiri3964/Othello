use serde::{Deserialize, Serialize};
use std::{env, fs::File, io::{BufRead, BufReader}};

use rand::SeedableRng;
use wasm_agent::{agent::{Agent, RandomAgent}, alphabeta_agent::AlphaBetaAgent, minmax_agent::MinMaxAgent, othello::{Board, GameStatus}, reverse::init_reverse};

#[derive(Debug, PartialEq, Eq, Serialize, Deserialize, Clone)]
struct GameResult {
    start: Board,
    end: Board,
    black: String,
    white: String,
    black_stone: u32,
    white_stone: u32,
    black_win: bool,
    white_win: bool
}

fn load_boards() -> Vec<Board> {
    let mut boards = Vec::new();
    if let Ok(file) = File::open("./data/opening.jsonl") {
        for result in BufReader::new(file).lines() {
            if let Ok(board_json) = result {
                if let Ok(board) = serde_json::from_str::<Board>(&board_json) {
                    boards.push(board);
                }
            }
        }
    }
    boards
}

fn main() {
    init_reverse();
    let boards = load_boards();
    let agent_list: Vec<(&str, Box<dyn Agent>)> = vec![
        ("random", Box::new(RandomAgent::new(rand_xoshiro::Xoshiro256StarStar::seed_from_u64(123)))),
        ("minmax", Box::new(MinMaxAgent::new(6))),
        ("alphabata", Box::new(AlphaBetaAgent::new(6)))
    ];

    let args: Vec<String> = env::args().collect();

    let board_idx = args[1].parse::<usize>().unwrap();
    let black_idx = args[2].parse::<usize>().unwrap();
    let white_idx = args[3].parse::<usize>().unwrap();

    let mut agents = [
        Box::new(agent_list[black_idx].1.clone()),
        Box::new(agent_list[white_idx].1.clone())
    ];
    let mut board = boards[board_idx].clone();
    let start_board = board.clone();

    // println!("{}", board);

    loop {
        let p = agents[if board.is_player_black { 0 } else { 1 }].as_mut().next(&board);
        match board.next(p) {
            Ok((b, status)) => {
                board = b;
                if status == GameStatus::End {
                    break;
                }
            }
            Err(t) => {
                eprintln!("{}", t);
            }
        }
    }

    let b = if board.is_player_black { board.player.count_ones() } else { board.opponent.count_ones() };
    let w = if !board.is_player_black { board.player.count_ones() } else { board.opponent.count_ones() };
    let result = GameResult {
        start: start_board,
        end: board,
        black: agent_list[black_idx].0.to_string(),
        white: agent_list[white_idx].0.to_string(),
        black_stone: b,
        white_stone: w,
        black_win: b > w,
        white_win: w > b,
    };

    let serialized = serde_json::to_string(&result).unwrap();
    println!("{}", serialized);
}