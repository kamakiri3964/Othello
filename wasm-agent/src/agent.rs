use crate::othello::{lsb, Board};
use dyn_clone::DynClone;
use rand::Rng;

pub trait Agent: DynClone {
    fn next(&mut self, board: &Board) -> u64;
}

dyn_clone::clone_trait_object!(Agent);

#[derive(Clone)]
pub struct RandomAgent<T>
where
    T: Rng,
{
    rng: T,
}

impl<T> RandomAgent<T>
where
    T: Rng,
{
    pub fn new(rng: T) -> Self {
        RandomAgent { rng }
    }
}

impl<T> Agent for RandomAgent<T>
where
    T: Rng + Clone,
{
    fn next(&mut self, board: &Board) -> u64 {
        let mut legal = board.legal();
        let i = self.rng.gen_range(0..legal.count_ones());
        let mut h = lsb(legal);
        for _ in 0..i {
            legal ^= h;
            h = lsb(legal);
        }
        h
    }
}

#[derive(Clone)]
pub struct CombineAgent<MID, END>
where
    MID: Agent,
    END: Agent,
{
    mid: MID,
    end: END,
    endgame_turn: usize,
}

impl<MID, END> CombineAgent<MID, END>
where
    MID: Agent,
    END: Agent,
{
    pub fn new(mid: MID, end: END, endgame_turn: usize) -> Self {
        CombineAgent {
            mid,
            end,
            endgame_turn,
        }
    }
}

impl<MID, END> Agent for CombineAgent<MID, END>
where
    MID: Agent + Clone,
    END: Agent + Clone,
{
    fn next(&mut self, board: &Board) -> u64 {
        if (board.player ^ board.opponent).count_ones() >= (64 - self.endgame_turn) as u32 {
            self.end.next(board)
        } else {
            self.mid.next(board)
        }
    }
}
