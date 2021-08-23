use std::io;

use wasm_agent::othello::{lsb, Board};

fn main() {
    let mut board_json = String::new();
    io::stdin()
        .read_line(&mut board_json)
        .expect("Failed to read line");
    loop {
        match serde_json::from_str::<Board>(&board_json) {
            Ok(board) => {
                let mut flippable = Vec::<u64>::new();
                let mut legal = board.legal();
                while let Some(m) = lsb(legal) {
                    let r = board.reverse(1 << m);
                    flippable.push(r);
                    legal ^= 1 << m;
                }
                println!("{}", serde_json::to_string(&flippable).unwrap());
            }
            Err(_) => break,
        }
        board_json = String::new();
        io::stdin()
            .read_line(&mut board_json)
            .expect("Failed to read line");
    }
}
