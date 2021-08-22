SRCDIR= src
BINDIR= $(SRCDIR)/bin
SRCS = $(wildcard $(SRCDIR)/*.rs) 
CONF = Cargo.toml
DATADIR= data

$(DATADIR)/random_boards.jsonl: $(BINDIR)/generate_random_boards.rs $(SRCS)
	cargo run --bin generate_random_boards > $(DATADIR)/random_boards.jsonl

$(DATADIR)/legal.jsonl: $(DATADIR)/random_boards.jsonl $(BINDIR)/generate_legal.rs $(SRCS)
	cargo run --bin generate_legal < $(DATADIR)/random_boards.jsonl > $(DATADIR)/legal.jsonl

.PHONY: test
test: $(SRCS) $(CONF)
	cargo test

.PHONY: clean
clean:
	rm -rf ./target