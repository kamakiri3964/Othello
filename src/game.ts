import { basename } from 'path/posix';
import { AIAgent, new_random_player } from './ai';
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
  message_holder: HTMLSpanElement;
  start_button: HTMLButtonElement;
  now_gaming: boolean;
  black_player: AIAgent | 'user';
  white_player: AIAgent | 'user';
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

export function put_start_button(
  game: Game,
  start_button: HTMLButtonElement
): void {
  start_button.addEventListener('click', (e: MouseEvent) => {
    game.now_gaming = true;
    game.start_button.style.display = 'none';
    game.board = generate_initial_board();
    draw_board(game.board, game.canvas);
    game.message_holder.innerText =
      'さあゲームを始めましょう。' + '\n' + '黒の手番です。';
  });
}

export function create_game(
  canvas: HTMLCanvasElement,
  message_holder: HTMLSpanElement,
  start_button: HTMLButtonElement
): Game {
  const game: Game = {
    last: performance.now(),
    interval: 1000 / 60, // ms
    board: generate_initial_board(),
    canvas: canvas,
    user_input: null,
    message_holder: message_holder,
    start_button: start_button,
    now_gaming: false,
    black_player: 'user',
    white_player: new_random_player(),
  };
  message_holder.innerText = '「開始」ボタンを押してください';
  game.start_button.style.display = 'inline';
  register_mouse_input_listner(game);
  put_start_button(game, game.start_button);
  return game;
}

function update_state(game: Game): boolean {
  if (game.board.black_turn) {
    if (game.black_player === 'user') {
      return input_state(game);
    } else {
      game.user_input = game.black_player.next_move(game.board);
      return input_state(game);
    }
  }

  if (!game.board.black_turn) {
    if (game.white_player === 'user') {
      return input_state(game);
    } else {
      game.user_input = game.white_player.next_move(game.board);
      return input_state(game);
    }
  }
  return false;
}

function input_state(game: Game): boolean {
  if (!game.now_gaming && game.user_input !== null) {
    game.user_input = null;
  }
  if (game.now_gaming && game.user_input !== null) {
    const [board, status] = next_state(game.board, game.user_input);
    if (status === Gamestatus.Error) {
      return false;
    }
    if (status === Gamestatus.End) {
      game.message_holder.innerText = create_message(game, status);
      game.now_gaming = false;
      game.start_button.style.display = 'inline';
      return true;
    } else {
      game.message_holder.innerText = create_message(game, status);
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
      update_game(game);
    }
    requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}

export function create_message(game: Game, status: Gamestatus): string {
  const board = game.board;
  const b_score = '黒： ' + calc_score(board)[0];
  const w_score = '白： ' + calc_score(board)[1];
  const score = b_score + '\n' + w_score + '\n';

  if (status === Gamestatus.Ok) {
    if (board.black_turn) {
      return score + '黒の手番です';
    } else {
      return score + '白の手番です';
    }
  } else if (status === Gamestatus.Error) {
    if (board.black_turn) {
      return score + 'そこには置くことができません。黒の手番です。';
    } else {
      return score + 'そこには置くことができません。白の手番です。';
    }
  } else if (status === Gamestatus.Pass) {
    if (board.black_turn) {
      return score + '白は置くところがないのでパスです。再度黒の手番です。';
    } else {
      return score + '黒は置くところがないのでパスです。再度白の手番です。';
    }
  } else if (status === Gamestatus.End) {
    if (calc_score(board)[0] > calc_score(board)[1]) {
      return (
        score +
        'ゲーム終了です。' +
        '\n' +
        '黒の勝ちです。' +
        '\n' +
        '再度ゲームを開始するには「開始」ボタンを押してください。'
      );
    } else if (calc_score(board)[0] < calc_score(board)[1]) {
      return (
        score +
        'ゲーム終了です。' +
        '\n' +
        '白の勝ちです。' +
        '\n' +
        '再度ゲームを開始するには「開始」ボタンを押してください。'
      );
    } else if ((calc_score(board)[0] = calc_score(board)[1])) {
      return (
        score +
        'ゲーム終了です。' +
        '\n' +
        '引き分けです。' +
        '\n' +
        '再度ゲームを開始するには「開始」ボタンを押してください。'
      );
    }
  }
  return 'バグ';
}
