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
                let mut flippable = Vec::<u64>::new();
                let legal = board.legal();
                const UPPER_LEFT: u64 = 0x8000_0000_0000_0000;
                for i in 0..64 {
                    if (legal << i) & UPPER_LEFT != 0 {
                        let r = board.reverse(UPPER_LEFT >> i);
                        flippable.push(r)
                    }
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
