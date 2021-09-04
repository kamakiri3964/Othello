import { AIAgent } from './ai';
import { Board } from './othello';
import JSONbig from 'json-bigint';

export function serialize_board(board: Readonly<Board>): string {
    const UPPER_LEFT = 0x8000_0000_0000_0000n;
    let black = 0x0000_0000_0000_0000n;
    let white = 0x0000_0000_0000_0000n;

    for (let i = 0; i < 64; i++) {
      const x = (i / 8) | 0;
      const y = i % 8;
      if (board.black[x]![y]) {
        black |= UPPER_LEFT >> BigInt(i);
      }
      if (board.white[x]![y]) {
        white |= UPPER_LEFT >> BigInt(i);
      }
    }

    let b;
    if (board.black_turn) {
      b = {
        player: black,
        opponent: white,
        is_player_black: true
      }
    } else {
      b = {
        player: white,
        opponent: black,
        is_player_black: false
      }
    }
    return JSONbig.stringify(b)
}

export async function new_wasm_player(): Promise<AIAgent> {
  const mod = await import("../pkg").then(mod => {
    return mod;
  });
  mod.init();
  return {
    next_move: (board: Readonly<Board>): [number, number] => {
      return JSON.parse(mod.next_move(serialize_board(board)))
    }
  }
}