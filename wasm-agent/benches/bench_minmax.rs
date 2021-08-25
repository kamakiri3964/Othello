use criterion::{black_box, criterion_group, criterion_main, Criterion};
use wasm_agent::othello::Board;
use wasm_agent::minmax_agent::MinMaxAgent;
use wasm_agent::agent::Agent;

fn criterion_benchmark(c: &mut Criterion) {
    let depth = 8;
    let mut agent = MinMaxAgent::new(depth);
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
    c.bench_function("min max", |b| b.iter(|| agent.next(black_box(&board))));
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);