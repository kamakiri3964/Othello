use crate::othello::{Board, lsb};
use rand::Rng;

pub trait Agent {
    fn next(&mut self, board: &Board) -> u64;
}
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
    T: Rng,
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
