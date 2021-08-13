import { draw_board, draw_pieces } from './drawer';
import {
  Board,
  calc_score,
  generate_initial_board,
  stringify_board,
  put_stone,
  flip_stone,
  move_turn,
  parse_coord,
  is_valid_move,
  add_vec,
  judge_flip_1d,
  DIRECTIONS,
  all_valid_moves,
  next_state,
  Gamestatus,
  flipable_all_places,
} from './othello';

export type Game = {
  last: number; // 最後に盤面の更新をした時刻 (ms)
  interval: number; // (interval)ms 毎に盤面の更新を行う
  board: Board;
  canvas: HTMLCanvasElement;
};

export function create_game(canvas: HTMLCanvasElement): Game {
  return {
    last: performance.now(),
    interval: 1000, // ms
    board: generate_initial_board(),
    canvas: canvas,
  };
}

function update_game(game: Game, canvas: HTMLCanvasElement): void {
  const can_put_place = all_valid_moves(game.board);
  const put_place: [number, number] =
    can_put_place[Math.floor(Math.random() * can_put_place.length)]!;
  game.board = next_state(game.board, put_place)[0];
  draw_board(game.board, canvas);
}

export function start_loop(game: Game, canvas: HTMLCanvasElement): void {
  const run = (now: number) => {
    let delta = now - game.last;
    while (delta >= game.interval) {
      delta -= game.interval;
      game.last = now - delta;
      // ここで盤面の更新・描画処理を行う
      update_game(game, canvas);
    }
    requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}
