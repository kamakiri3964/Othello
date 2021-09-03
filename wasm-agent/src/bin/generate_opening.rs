use wasm_agent::{othello::{Board, lsb}, reverse::init_reverse};

fn gen_board(board: Board, depth: usize) -> Vec<Board> {
  if depth == 0 {
    return vec![board];
  }

  let mut boards = Vec::new();
  let mut legal = board.legal();
  let mut h = lsb(legal);
  while h != 0 {
      let mut bs = gen_board(board.put_uncheck(h), depth-1);
      boards.append(&mut bs);
      legal ^= h;
      h = lsb(legal);
  }

  boards
}

fn main() {
  init_reverse();
  let board = Board::new();
  let boards = gen_board(board, 6);
  eprintln!("{}", boards.len());
  for board in boards {
    let serialized = serde_json::to_string(&board).unwrap();
    println!("{}", serialized);
  }
}