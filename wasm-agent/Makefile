SRCDIR= ./src
BINDIR= $(SRCDIR)/bin
SRCS = $(wildcard $(SRCDIR)/*.rs) 
CONF = ./Cargo.toml

data/random_boards.jsonl: $(BINDIR)/generate_random_boards.rs $(SRCS)
	cargo run --bin generate_random_boards > data/random_boards.jsonl

.PHONY: test
test: $(SRCS) $(CONF)
	cargo test

.PHONY: clean
clean:
	rm -rf ./target