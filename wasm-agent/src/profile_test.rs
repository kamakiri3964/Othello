use std::{fs::File, io::Write, time::Instant};

use pprof::protos::Message;
// use wasm_agent::{agent::Agent, minmax_agent::{MinMaxAgent, n_search}, othello::Board, reverse::init_reverse};
use crate::{
    agent::Agent,
    alphabeta_agent::{AlphaBetaAgent, MemoAlphaBetaAgent},
    evaluation::{count_legal, sub_legal_and_last},
    negascout_agent::NegaScoutAgent,
    othello::Board,
    reverse::init_reverse,
    search_count::n_search,
};

#[test]
#[ignore]
fn test_prof() {
    let depth = 10;
    // let mut agent = MinMaxAgent::new(depth);
    // let mut agent = AlphaBetaAgent::new(depth, count_stone);
    // let mut agent = AlphaBetaAgent::new(depth, sub_legal_and_last);
    // let mut agent = MemoAlphaBetaAgent::new(depth, sub_legal_and_last);
    let mut agent = NegaScoutAgent::new(depth, sub_legal_and_last);
    let board_string = r#"   A B C D E F G H
1 |O|O|O|O|O|O|O| |
2 |O|X| |X|O|O|O|O|
3 |O|X|X|O|O|X|O|O|
4 |O|X|O|X|X|O|O|O|
5 |O|X|X|O|O| |X|O|
6 |O|X|X|O|O|X| |X|
7 | |O|O| | |O| | |
8 | | |O| | | | | |

next: X
"#;
    // let board = Board::new();
    let board = Board::parse(board_string);
    init_reverse();

    let start = Instant::now();
    let guard = pprof::ProfilerGuard::new(100).unwrap();
    agent.next(&board);
    match guard.report().build() {
        Ok(report) => {
            let mut file = File::create("profile.pb").unwrap();
            let profile = report.pprof().unwrap();

            let mut content = Vec::new();
            profile.encode(&mut content).unwrap();
            file.write_all(&content).unwrap();

            // println!("report: {:?}", &report);
        }
        Err(_) => {}
    };
    let end = start.elapsed();
    println!("{}.{:03}sec", end.as_secs(), end.subsec_nanos() / 1_000_000);
    println!("{}boards", n_search());
    assert!(false)
}
