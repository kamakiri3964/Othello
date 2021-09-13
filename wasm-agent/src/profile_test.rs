use std::{
    fs::File,
    io::{BufRead, BufReader, Write},
    rc::Rc,
    time::{Duration, Instant},
};

use pprof::protos::Message;
// use wasm_agent::{agent::Agent, minmax_agent::{MinMaxAgent, n_search}, othello::Board, reverse::init_reverse};
use crate::{
    agent::Agent,
    alphabeta_agent::{AlphaBetaAgent, MemoAlphaBetaAgent},
    endgame::EndGameAgent,
    evaluation::{count_legal, sub_legal_and_last},
    negascout_agent::NegaScoutAgent,
    othello::Board,
    reverse::init_reverse,
    search_count::n_search,
};

fn load_boards() -> Vec<Vec<Board>> {
    let mut boards = vec![Vec::new(); 65];
    if let Ok(file) = File::open("./data/random_boards.jsonl") {
        for result in BufReader::new(file).lines() {
            if let Ok(board_json) = result {
                if let Ok(board) = serde_json::from_str::<Board>(&board_json) {
                    let n_stone = board.player.count_ones() + board.opponent.count_ones();
                    boards[n_stone as usize].push(board);
                }
            }
        }
    }
    boards
}

fn prof_opening(mut agent: Box<dyn Agent>, n: usize) {
    let boards = load_boards();
    for board in boards[10].iter().take(n) {
        // 10
        agent.next(&board);
    }
}

fn prof_midgame(mut agent: Box<dyn Agent>, n: usize) {
    let boards = load_boards();
    for i in 0..n {
        let board = &boards[10 + (i * 4) % 30][(i * 4) / 30]; // 10 - 40
        agent.next(board);
    }
}

fn prof_endgame(mut agent: Box<dyn Agent>, n: usize) {
    let boards = load_boards();
    for i in 0..n {
        let board = &boards[40 + i % 20][i / 20]; // 40 - 60
        agent.next(board);
    }
}

fn get_agent() -> Box<dyn Agent> {
    let depth = 10;
    // let mut agent = MinMaxAgent::new(depth);
    // let mut agent = AlphaBetaAgent::new(depth, count_stone);
    // let mut agent = AlphaBetaAgent::new(depth, sub_legal_and_last);
    // let mut agent = MemoAlphaBetaAgent::new(depth, sub_legal_and_last);
    let agent = NegaScoutAgent::new(depth, Rc::new(sub_legal_and_last));
    Box::new(agent)
}

#[test]
#[ignore]
fn test_prof() {
    let depth = 10;
    // let mut agent = MinMaxAgent::new(depth);
    // let mut agent = AlphaBetaAgent::new(depth, count_stone);
    // let mut agent = AlphaBetaAgent::new(depth, sub_legal_and_last);
    // let mut agent = MemoAlphaBetaAgent::new(depth, sub_legal_and_last);
    let mut agent = NegaScoutAgent::new(depth, Rc::new(sub_legal_and_last));
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

#[test]
#[ignore]
fn test_prof_opening() {
    init_reverse();
    let agent = get_agent();
    let start = Instant::now();
    let guard = pprof::ProfilerGuard::new(100).unwrap();
    prof_opening(agent, 10);
    match guard.report().build() {
        Ok(report) => {
            let mut file = File::create("profile.pb").unwrap();
            let profile = report.pprof().unwrap();

            let mut content = Vec::new();
            profile.encode(&mut content).unwrap();
            file.write_all(&content).unwrap();
        }
        Err(_) => {}
    };
    let end = start.elapsed();
    println!("{}.{:03}sec", end.as_secs(), end.subsec_nanos() / 1_000_000);
    println!("{}boards", n_search());
    assert!(false)
}

#[test]
#[ignore]
fn test_prof_midgame() {
    init_reverse();
    let agent = get_agent();
    let start = Instant::now();
    let guard = pprof::ProfilerGuard::new(100).unwrap();
    prof_midgame(agent, 10);
    match guard.report().build() {
        Ok(report) => {
            let mut file = File::create("profile.pb").unwrap();
            let profile = report.pprof().unwrap();

            let mut content = Vec::new();
            profile.encode(&mut content).unwrap();
            file.write_all(&content).unwrap();
        }
        Err(_) => {}
    };
    let end = start.elapsed();
    println!("{}.{:03}sec", end.as_secs(), end.subsec_nanos() / 1_000_000);
    println!("{}boards", n_search());
    assert!(false)
}

#[test]
#[ignore]
fn test_prof_endgame() {
    init_reverse();
    let agent = get_agent();
    let start = Instant::now();
    let guard = pprof::ProfilerGuard::new(100).unwrap();
    prof_endgame(agent, 10);
    match guard.report().build() {
        Ok(report) => {
            let mut file = File::create("profile.pb").unwrap();
            let profile = report.pprof().unwrap();

            let mut content = Vec::new();
            profile.encode(&mut content).unwrap();
            file.write_all(&content).unwrap();
        }
        Err(_) => {}
    };
    let end = start.elapsed();
    println!("{}.{:03}sec", end.as_secs(), end.subsec_nanos() / 1_000_000);
    println!("{}boards", n_search());
    assert!(false)
}

// cargo test profile_test::test_prof_wholegame --release -- --ignored
#[test]
#[ignore]
fn test_prof_wholegame() {
    init_reverse();
    let agent = get_agent();
    let start = Instant::now();
    let guard = pprof::ProfilerGuard::new(100).unwrap();
    prof_opening(agent.clone(), 10);
    prof_midgame(agent.clone(), 10);
    prof_endgame(agent, 10);
    match guard.report().build() {
        Ok(report) => {
            let mut file = File::create("profile.pb").unwrap();
            let profile = report.pprof().unwrap();

            let mut content = Vec::new();
            profile.encode(&mut content).unwrap();
            file.write_all(&content).unwrap();
        }
        Err(_) => {}
    };
    let end = start.elapsed() / 30;
    println!("{}.{:03}sec", end.as_secs(), end.subsec_nanos() / 1_000_000);
    println!("{}boards", n_search() / 30);
    assert!(false)
}

// cargo test profile_test::check_endgame_time --release -- --ignored
#[test]
#[ignore]
fn check_endgame_time() {
    init_reverse();
    // let depth = 20;
    let boards = load_boards();
    // let mut agent = NegaScoutAgent::new(22, sub_legal_and_last);  // 17: 0.7sec 18: 2.9sec
    // let mut agent = get_agent();
    let mut agent = EndGameAgent::new(16); // 20: 0.326sec 21: 3.258sec
    for i in 1..30 {
        let start = Instant::now();
        for board in boards[64 - i].iter().take(3) {
            agent.next(board);
        }
        let end = start.elapsed() / 3;
        println!(
            "{}: {}.{:03}sec",
            i,
            end.as_secs(),
            end.subsec_nanos() / 1_000_000
        );
        assert!(end < Duration::new(1, 0));
    }
}
