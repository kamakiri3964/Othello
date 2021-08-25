use std::io;

use wasm_agent::othello::{Board, lsb};

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
                let mut h = lsb(legal);
                while h != 0 {
                    let r = board.reverse(h);
                    flippable.push(r);
                    legal ^= h;
                    h = lsb(legal);
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
