use std::rc::Rc;

use crate::{
    agent::Agent,
    evaluation::{count_stone, BoardIdxIterator},
    negascout_agent::NegaScoutAgent,
    othello::Board,
};

fn read_float_vec_from_byte_vec(v: Vec<u8>) -> Result<Vec<f32>, String> {
    #[inline(always)]
    fn float_from_u8_slice(s: &[u8]) -> f32 {
        let array = [s[0], s[1], s[2], s[3]];
        unsafe { std::mem::transmute(array) }
    }

    match v.len() % 4 {
        0 => Ok(v.chunks(4).map(float_from_u8_slice).collect()),
        _ => Err("Number not divisible by 4".to_string()),
    }
}

pub fn load_weight(weight_str: &str) -> Result<[f32; 10], String> {
    base64::decode(weight_str)
        .map_err(|e| format!("{}", e))
        .and_then(read_float_vec_from_byte_vec)
        .map(|float_vec| {
            let mut result = [0.0; 10];
            result.copy_from_slice(&float_vec[..]);
            result
        })
}

#[derive(Clone)]
pub struct MLAgent {
    searcher: NegaScoutAgent,
}

impl MLAgent {
    pub fn new(depth: usize, weight: [f32; 10]) -> Self {
        MLAgent {
            searcher: NegaScoutAgent::new(depth, MLAgent::get_eval(weight)),
        }
    }

    fn get_eval(weight: [f32; 10]) -> Rc<dyn Fn(&Board) -> i32> {
        let mut w = [[0.; 4]; 4];
        w[0][0] = weight[0];
        w[0][1] = weight[1];
        w[1][0] = weight[1];
        w[0][2] = weight[2];
        w[2][0] = weight[2];
        w[0][3] = weight[3];
        w[3][0] = weight[3];
        w[1][1] = weight[4];
        w[1][2] = weight[5];
        w[2][1] = weight[5];
        w[1][3] = weight[6];
        w[3][1] = weight[6];
        w[2][2] = weight[7];
        w[2][3] = weight[8];
        w[3][2] = weight[8];
        w[3][3] = weight[9];
        let mut weight = [0.; 64];
        let mut idx = 0;
        for i in 0..4 {
            for j in 0..4 {
                weight[idx] = w[i][j];
                idx += 1;
            }
            for j in 0..4 {
                weight[idx] = w[i][3 - j];
                idx += 1;
            }
        }
        for i in 0..4 {
            for j in 0..4 {
                weight[idx] = w[3 - i][j];
                idx += 1;
            }
            for j in 0..4 {
                weight[idx] = w[3 - i][3 - j];
                idx += 1;
            }
        }
        Rc::new(move |board| {
            if (board.player ^ board.opponent).count_zeros() == 0 {
                board.player.count_ones() as i32
            } else {
                let mut score = 0.;
                for idx in BoardIdxIterator::new(board.player) {
                    unsafe {
                        score += weight.get_unchecked(idx);
                    }
                }
                for idx in BoardIdxIterator::new(board.opponent) {
                    unsafe {
                        score -= weight.get_unchecked(idx);
                    }
                }
                score.round() as i32
            }
        })
    }
}

impl Agent for MLAgent {
    fn next(&mut self, board: &Board) -> (u64, i32) {
        self.searcher.next(board)
    }
}

#[cfg(test)]
mod test {
    use crate::ml_agent::load_weight;

    #[test]
    fn test_load_weight() {
        let expected: Result<[f32; 10], String> =
            Ok([100.0, -50.0, 40.0, 5.0, -90.0, -10.0, -5.0, -2.0, -2.0, 1.0]);
        let actual = load_weight("AADIQgAASMIAACBCAACgQAAAtMIAACDBAACgwAAAAMAAAADAAACAPw==");
        assert_eq!(expected, actual);
    }
}
