use crate::othello::{lsb, lsb_idx, Board};

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

const MANUAL_SCORE: [i32; 64] = [
    100, -50, 40, 5, 5, 40, -50, 100, -50, -90, -10, -5, -5, -10, -90, -50, 40, -10, -2, -2, -2,
    -2, -10, 40, 5, -5, -2, 1, 1, -2, -5, 5, 5, -5, -2, 1, 1, -2, -5, 5, 40, -10, -2, -2, -2, -2,
    -10, 40, -50, -90, -10, -5, -5, -10, -90, -50, 100, -50, 40, 5, 5, 40, -50, 100,
];

struct BoardIdxIterator {
    board: u64,
}

impl BoardIdxIterator {
    pub fn new(board: u64) -> Self {
        BoardIdxIterator { board }
    }
}

impl Iterator for BoardIdxIterator {
    type Item = usize;

    fn next(&mut self) -> Option<Self::Item> {
        let hidx = lsb_idx(self.board);
        match hidx {
            Some(idx) => {
                let h = lsb(self.board);
                self.board ^= h;
                Some(idx)
            }
            None => None,
        }
    }
}

pub fn manual_score(board: &Board) -> i32 {
    if (board.player ^ board.opponent).count_zeros() == 0 {
        board.player.count_ones() as i32
    } else {
        let mut score = 0;
        for idx in BoardIdxIterator::new(board.player) {
            unsafe {
                score += MANUAL_SCORE.get_unchecked(idx);
            }
        }
        for idx in BoardIdxIterator::new(board.opponent) {
            unsafe {
                score -= MANUAL_SCORE.get_unchecked(idx);
            }
        }
        score
    }
}

pub fn manual_score_sub_legal(board: &Board) -> i32 {
    if (board.player ^ board.opponent).count_zeros() == 0 {
        board.player.count_ones() as i32
    } else {
        let mut score = 0;
        for idx in BoardIdxIterator::new(board.player) {
            unsafe {
                score += MANUAL_SCORE.get_unchecked(idx);
            }
        }
        for idx in BoardIdxIterator::new(board.opponent) {
            unsafe {
                score -= MANUAL_SCORE.get_unchecked(idx);
            }
        }
        score + sub_legal(board) * 10
    }
}
