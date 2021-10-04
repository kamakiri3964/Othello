use std::{convert::TryInto, env, fs::File, io::{BufRead, BufReader, Read, Stderr, stderr}, sync::mpsc::{self, Sender}, thread};

use pbr::ProgressBar;
use rand::{Rng, prelude::SliceRandom};
use serde::Serialize;
use wasm_agent::{agent::Agent, ml_agent::{MLAgent, load_weight}, othello::{Board, GameStatus, lsb}, reverse::init_reverse};

#[derive(Serialize)]
struct RootStrapBoard {
    board: Board,
    v: i32,
    win: bool,
}

fn load_boards() -> Vec<Board> {
    let mut boards = Vec::new();
    if let Ok(file) = File::open("./data/opening.jsonl") {
        for result in BufReader::new(file).lines() {
            if let Ok(board_json) = result {
                if let Ok(board) = serde_json::from_str::<Board>(&board_json) {
                    // let n_stone = board.player.count_ones() + board.opponent.count_ones();
                    boards.push(board);
                }
            }
        }
    }
    boards
}

fn play_game<T>(mut board: Board, mut agent: T) -> Vec<RootStrapBoard>
where
    T: Agent
{
    let rand_limit = 30;
    let rand_count = 5;
    let mut rng = rand::thread_rng();
    let mut t = (0..rand_limit).collect::<Vec<usize>>();
    t.shuffle(&mut rng);
    let rand_idx = &t[0..rand_count];
    let mut turn = 0;
    let mut result = Vec::new();
    loop {
        if rand_idx.contains(&turn) {
            let mut legal = board.legal();
            let i = rng.gen_range(0..legal.count_ones());
            let mut p = lsb(legal);
            for _ in 0..i {
                legal ^= p;
                p = lsb(legal);
            }
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
        } else {
            let (p, v) = agent.next(&board);
            match board.next(p) {
                Ok((b, status)) => {
                    result.push(RootStrapBoard{board: board.clone(), v, win: true});
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
        turn += 1;
    }
    let player_win = board.player.count_ones() > board.opponent.count_ones();
    let black_win = if board.is_player_black { player_win } else { !player_win };

    for i in 0..result.len() {
        if result[i].board.is_player_black {
            result[i].win = black_win;
        } else {
            result[i].win = !black_win;
        }
    }
    result
}

fn play(tx: Sender<RootStrapBoard>, n: usize, nt: usize, m: usize, weight: &str) {
    let depth = 6;
    let agent = MLAgent::new(depth, load_weight(&weight).unwrap());
    let boards = load_boards();
    let mut c = 0;
    let mut idx = 0;
    while c < n {
        if boards.len() <= idx * nt + m {
            idx = 0;
        }
        let board = boards[idx * nt + m].clone();
        let result = play_game(board, agent.clone());
        c += result.len();
        for r in result {
            tx.send(r).unwrap();
        }
        idx += 1;
    }
}

fn main() {
    let (tx, rx) = mpsc::channel();
    init_reverse();

    let args: Vec<String> = env::args().collect();
    let weight_file = args[1].to_string();
    let n_boards = args[2].parse::<usize>().unwrap();
    let n_threads = args[3].parse::<usize>().unwrap();
    let mut weight = String::new();

    if let Ok(mut file) = File::open(weight_file) {
        file.read_to_string(&mut weight).unwrap();
    }

    for i in 0..n_threads {
        let t = tx.clone();
        let n = n_boards / n_threads;
        let nt = n_threads;
        let m = i;
        let w = weight.clone();
        thread::spawn(move || {
            play(t, n, nt, m, &w);
        });
    }
    drop(tx);

    let mut pb = ProgressBar::on(stderr(), n_boards.try_into().unwrap());
    pb.format("╢▌▌░╟");
    for r in rx {
        let serialized = serde_json::to_string(&r).unwrap();
        println!("{}", serialized);
        pb.inc();
    }
    pb.finish_print("done");
}
