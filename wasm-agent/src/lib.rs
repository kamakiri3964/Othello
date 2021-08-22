pub mod othello;
pub mod agent;

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
