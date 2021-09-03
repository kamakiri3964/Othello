use crate::othello::Board;

pub fn count_stone(board: &Board) -> i32 {
    board.player.count_ones() as i32
}

pub fn count_legal(board: &Board) -> i32 {
    board.legal().count_ones() as i32
}
