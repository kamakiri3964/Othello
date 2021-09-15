use criterion::{black_box, criterion_group, criterion_main, Criterion};
// use pprof::criterion::{PProfProfiler, Output};
use wasm_agent::agent::Agent;
use wasm_agent::alphabeta_agent::{AlphaBetaAgent, MemoAlphaBetaAgent};
use wasm_agent::evaluation::sub_legal_and_last;
use wasm_agent::minmax_agent::MinMaxAgent;
use wasm_agent::negascout_agent::NegaScoutAgent;
use wasm_agent::othello::Board;

fn criterion_benchmark(c: &mut Criterion) {
    let depth = 8;
    // let mut agent = MinMaxAgent::new(depth);
    let mut agent = AlphaBetaAgent::new(depth, sub_legal_and_last);
    // let mut agent = MemoAlphaBetaAgent::new(depth, sub_legal_and_last);
    // let mut agent = NegaScoutAgent::new(depth, sub_legal_and_last);
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
    c.bench_function("agent", |b| b.iter(|| agent.next(black_box(&board))));
}

// not working...
// criterion_group!{
//     name = benches;
//     config = Criterion::default().with_profiler(PProfProfiler::new(100, Output::Flamegraph(None)));
//     targets = criterion_benchmark
// }
criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
