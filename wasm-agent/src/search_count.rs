pub fn n_search() -> u128 {
    static mut N_SEARCH: u128 = 0;
    unsafe {
        N_SEARCH += 1;
        N_SEARCH
    }
}
