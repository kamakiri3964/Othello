pub mod agent;
pub mod alphabeta_agent;
pub mod endgame;
pub mod evaluation;
pub mod minmax_agent;
pub mod ml_agent;
pub mod negascout_agent;
pub mod othello;
pub mod reverse;
mod search_count;

use std::rc::Rc;

use agent::CombineAgent;
use endgame::EndGameAgent;
use evaluation::{manual_score_sub_legal, sub_legal_and_last};
use negascout_agent::NegaScoutAgent;
use othello::Board;
use reverse::init_reverse;
use wasm_bindgen::prelude::*;

use crate::agent::Agent;

#[wasm_bindgen]
pub fn init() {
    init_reverse();
}

#[wasm_bindgen]
pub fn next_move(s: &str) -> String {
    // let mut agent = NegaScoutAgent::new(12, sub_legal_and_last);
    // let mut agent = CombineAgent::new(
    //     NegaScoutAgent::new(10, sub_legal_and_last),
    //     EndGameAgent::new(15),
    //     19
    // );
    let mut agent = CombineAgent::new(
        NegaScoutAgent::new(10, Rc::new(manual_score_sub_legal)),
        EndGameAgent::new(15),
        19,
    );
    if let Ok(board) = serde_json::from_str::<Board>(s) {
        let (m, _) = agent.next(&board);
        let x = m.leading_zeros() / 8;
        let y = m.leading_zeros() % 8;
        format!("[{},{}]", x, y)
    } else {
        "".to_string()
    }
}

#[cfg(test)]
mod profile_test;
