use crate::othello::Board;

pub fn count_stone(board: &Board) -> i32 {
    board.player.count_ones() as i32
}

pub fn count_legal(board: &Board) -> i32 {
    board.legal().count_ones() as i32
}

pub fn sub_legal(board: &Board) -> i32 {
    let t = Board {
        player: board.opponent,
        opponent: board.player,
        is_player_black: true,
    };
    board.legal().count_ones() as i32 - t.legal().count_ones() as i32
}

pub fn sub_legal_and_last(board: &Board) -> i32 {
    if (board.player ^ board.opponent).count_zeros() == 0 {
        board.player.count_ones() as i32
    } else {
        sub_legal(board)
    }
}
