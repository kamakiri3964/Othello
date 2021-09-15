use std::io;

use wasm_agent::othello::Board;

fn main() {
    let mut board_json = String::new();
    io::stdin()
        .read_line(&mut board_json)
        .expect("Failed to read line");
    loop {
        match serde_json::from_str::<Board>(&board_json) {
            Ok(board) => {
                println!("{}", board.legal());
            }
            Err(_) => break,
        }
        board_json = String::new();
        io::stdin()
            .read_line(&mut board_json)
            .expect("Failed to read line");
    }
}
