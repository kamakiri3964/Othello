use wasm_agent::{
    agent::{Agent, RandomAgent},
    othello::{Board, GameStatus},
};

fn main() {
    let mut board = Board::new();
    let mut agents = [
        RandomAgent::new(rand::thread_rng()),
        RandomAgent::new(rand::thread_rng()),
    ];

    println!("{}", board);

    loop {
        let p = agents[if board.is_player_black { 0 } else { 1 }].next(&board);
        match board.next(p) {
            Ok((b, status)) => {
                board = b;
                println!("{}", board);
                if status == GameStatus::End {
                    break;
                }
            }
            Err(t) => {
                println!("{}", t);
            }
        }
    }
}
