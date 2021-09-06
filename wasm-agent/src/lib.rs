pub mod agent;
pub mod alphabeta_agent;
pub mod evaluation;
pub mod minmax_agent;
pub mod negascout_agent;
pub mod othello;
pub mod reverse;
mod search_count;

use evaluation::sub_legal_and_last;
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
    let mut agent = NegaScoutAgent::new(12, sub_legal_and_last);
    if let Ok(board) = serde_json::from_str::<Board>(s) {
        let m = agent.next(&board);
        let x = m.leading_zeros() / 8;
        let y = m.leading_zeros() % 8;
        format!("[{},{}]", x, y)
    } else {
        "".to_string()
    }
}

#[cfg(test)]
mod profile_test;
