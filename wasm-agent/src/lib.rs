pub mod agent;
pub mod alphabeta_agent;
pub mod evaluation;
pub mod minmax_agent;
pub mod othello;
pub mod reverse;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greeting() -> String {
    "hello".to_string()
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn it_works() {
        assert_eq!(greeting(), "hello".to_string());
    }
}

#[cfg(test)]
mod profile_test;