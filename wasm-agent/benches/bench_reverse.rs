use std::{
    fs::File,
    io::{BufRead, BufReader},
};

use criterion::{criterion_group, criterion_main, Criterion};
use wasm_agent::othello::{lsb, Board};

fn criterion_benchmark(c: &mut Criterion) {
    let mut boards = Vec::new();
    if let Ok(file) = File::open("./data/random_boards.jsonl") {
        for result in BufReader::new(file).lines() {
            if let Ok(board_json) = result {
                if let Ok(board) = serde_json::from_str::<Board>(&board_json) {
                    boards.push(board);
                }
            }
        }
    }
    let mut legals = Vec::new();
    if let Ok(file) = File::open("./data/legal.jsonl") {
        for result in BufReader::new(file).lines() {
            if let Ok(legal_json) = result {
                if let Ok(legal) = serde_json::from_str::<u64>(&legal_json) {
                    legals.push(legal);
                }
            }
        }
    }
    let mut expected = Vec::new();
    if let Ok(file) = File::open("./data/flippable.jsonl") {
        for result in BufReader::new(file).lines() {
            if let Ok(flippable_json) = result {
                if let Ok(flippable) = serde_json::from_str::<Vec<u64>>(&flippable_json) {
                    expected.push(flippable);
                }
            }
        }
    }
    let mut flippable = Vec::new();
    for (board, l) in boards.iter().zip(legals.iter()) {
        let mut f = Vec::new();
        let mut legal = *l;
        let mut h = lsb(legal);
        while h != 0 {
            let r = board.reverse(h);
            f.push(r);
            legal ^= h;
            h = lsb(legal);
        }
        flippable.push(f);
    }
    for (exp, act) in expected.iter().zip(flippable.iter()) {
        for (&e, &a) in exp.iter().zip(act.iter()) {
            assert_eq!(e, a);
        }
    }
    c.bench_function("reverse", |b| {
        b.iter(|| {
            for (board, l) in boards.iter().zip(legals.iter()) {
                let mut legal = *l;
                let mut h = lsb(legal);
                while h != 0 {
                    let _ = board.reverse(h);
                    // flippable.push(r);
                    legal ^= h;
                    h = lsb(legal);
                }
            }
        })
    });
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
