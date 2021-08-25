SRCDIR= src
BINDIR= $(SRCDIR)/bin
SRCS = $(wildcard $(SRCDIR)/*.rs) 
CONF = Cargo.toml
DATADIR= data

$(DATADIR)/random_boards.jsonl: $(BINDIR)/generate_random_boards.rs $(SRCS)
	cargo run --bin generate_random_boards > $(DATADIR)/random_boards.jsonl

$(DATADIR)/legal.jsonl: $(DATADIR)/random_boards.jsonl $(BINDIR)/generate_legal.rs $(SRCS)
	cargo run --bin generate_legal < $(DATADIR)/random_boards.jsonl > $(DATADIR)/legal.jsonl

$(DATADIR)/flippable.jsonl: $(DATADIR)/random_boards.jsonl $(BINDIR)/generate_flippable.rs $(SRCS)
	cargo run --bin generate_flippable < $(DATADIR)/random_boards.jsonl > $(DATADIR)/flippable.jsonl

profile.pb: $(SRCS)
	cargo run --bin prof_agent --release

profile: profile.pb
	go tool pprof -http localhost:8080 profile.pb

.PHONY: test
test: $(SRCS) $(CONF)
	cargo test

.PHONY: clean
clean:
	rm -rf ./target