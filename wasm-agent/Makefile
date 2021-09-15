SRCDIR= src
BINDIR= $(SRCDIR)/bin
SRCS = $(wildcard $(SRCDIR)/*.rs) 
CONF = Cargo.toml
DATADIR= data
ARGS =

$(DATADIR)/random_boards.jsonl: $(BINDIR)/generate_random_boards.rs $(SRCS)
	cargo run --bin generate_random_boards > $(DATADIR)/random_boards.jsonl

$(DATADIR)/legal.jsonl: $(DATADIR)/random_boards.jsonl $(BINDIR)/generate_legal.rs $(SRCS)
	cargo run --bin generate_legal < $(DATADIR)/random_boards.jsonl > $(DATADIR)/legal.jsonl

$(DATADIR)/flippable.jsonl: $(DATADIR)/random_boards.jsonl $(BINDIR)/generate_flippable.rs $(SRCS)
	cargo run --bin generate_flippable < $(DATADIR)/random_boards.jsonl > $(DATADIR)/flippable.jsonl

$(DATADIR)/opening.jsonl: $(SRCS)
	cargo run --bin generate_opening > $(DATADIR)/opening.jsonl

profile.pb: $(SRCS)
	cargo test profile_test::test_prof --release -- --ignored

profile: profile.pb
	go tool pprof -http localhost:8080 profile.pb

.PHONY: compare
compare:
	cd scripts && poetry run python scripts/parallel_play.py ${ARGS}

.PHONY: test
test: $(SRCS) $(CONF)
	cargo test

.PHONY: clean
clean:
	rm -rf ./target