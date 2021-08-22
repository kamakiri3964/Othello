use std::io;

use wasm_agent::othello::{parse_coord, Board, GameStatus};

fn main() {
    let mut board = Board::new();

    println!("{}", board);

    loop {
        let mut coord = String::new();
        io::stdin()
            .read_line(&mut coord)
            .expect("Failed to read line");
        match parse_coord(coord.trim()) {
            Ok(p) => match board.next(p) {
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
            },
            Err(t) => {
                println!("{}", t);
            }
        }
    }
}
