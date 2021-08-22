use crate::othello::Board;
use rand::{Rng, prelude::ThreadRng};

pub trait Agent {
    fn next(&mut self, board: &Board) -> u64;
}
pub struct RandomAgent {
  rng: ThreadRng
}

impl RandomAgent {
  pub fn new() -> Self {
    RandomAgent {
      rng: rand::thread_rng()
    }
  }
}

impl Agent for RandomAgent {
  fn next(&mut self, board: &Board) -> u64 {
      let legal = board.legal();
      let mut legal_vec = Vec::<usize>::new();
      const UPPER_LEFT: u64 = 0x8000_0000_0000_0000;
      for i in 0..64 {
          if (legal << i) & UPPER_LEFT != 0 {
            legal_vec.push(i);
          }
      }
      let i = self.rng.gen_range(0..legal_vec.len());
      UPPER_LEFT >> legal_vec[i]
  }
}