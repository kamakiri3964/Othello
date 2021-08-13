import { draw_board, draw_pieces, input_convert_place } from './drawer';
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
  user_input: [number, number] | null;
};

export function register_mouse_input_listner(game: Game): void {
  game.canvas.addEventListener('click', (e: MouseEvent) => {
    const rect = game.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const [i, j] = input_convert_place([x, y], game.canvas);
    game.user_input = [j, i];
  });
}

export function create_game(canvas: HTMLCanvasElement): Game {
  const game = {
    last: performance.now(),
    interval: 1000 / 60, // ms
    board: generate_initial_board(),
    canvas: canvas,
    user_input: null,
  };
  register_mouse_input_listner(game);
  return game;
}

function update_state(game: Game): boolean {
  if (game.user_input !== null) {
    const [board, status] = next_state(game.board, game.user_input);
    if (status !== Gamestatus.Error) {
      return true;
    }
  }
  return false;
}

function update_game(game: Game): void {
  if (update_state(game)) {
    draw_board(game.board, game.canvas);
  }
}

export function start_loop(game: Game, canvas: HTMLCanvasElement): void {
  const run = (now: number) => {
    let delta = now - game.last;
    while (delta >= game.interval) {
      delta -= game.interval;
      game.last = now - delta;
      // ここで盤面の更新・描画処理を行う
      update_game(game);
    }
    requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}
