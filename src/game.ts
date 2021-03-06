import { basename } from 'path/posix';
import { getSystemErrorMap } from 'util';
import {
  AIAgent,
  alphabeta_agent_enemy_CPP,
  alphabeta_agent_score_count_1,
  alphabeta_agent_stone_count,
  minimax_agent,
  new_random_player,
  new_weak_agent,
} from './ai';
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
  Board_history,
  add_board_history,
  deep_copy_board,
  delete_later_turn,
  deep_copy_board_array,
  back_to_my_turn,
  update_history,
} from './othello';
import { new_wasm_player } from './wasm_agent';

export type Game = {
  last: number; // 最後に盤面の更新をした時刻 (ms)
  interval: number; // (interval)ms 毎に盤面の更新を行う
  board: Board;
  canvas: HTMLCanvasElement;
  user_input: [number, number] | null;
  message_holder: HTMLSpanElement;
  start_button: HTMLButtonElement;
  select_black: HTMLButtonElement;
  select_white: HTMLButtonElement;
  select_AIbattle: HTMLButtonElement;
  cancel_button: HTMLButtonElement;
  first_AIselect_box: HTMLSelectElement;
  first_AIselect_form: HTMLFormElement;
  second_AIselect_box: HTMLSelectElement;
  second_AIselect_form: HTMLFormElement;
  fix_AI: HTMLButtonElement;
  now_gaming: boolean;
  black_player: AIAgent | 'user';
  white_player: AIAgent | 'user';
  board_history: Board_history;
  turn_number: number;
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

export async function choice_AI(computer: string): Promise<AIAgent> {
  if (computer === 'CP1') {
    return new_random_player();
  }
  if (computer === 'CP2') {
    return alphabeta_agent_stone_count();
  }
  if (computer === 'CP3') {
    return alphabeta_agent_enemy_CPP();
  }
  if (computer === 'CP4') {
    return alphabeta_agent_score_count_1();
  }
  if (computer === 'CP5') {
    let p = await new_wasm_player();
    return p;
  }
  return new_random_player();
}

export function put_start_button(
  game: Game,
  start_button: HTMLButtonElement,
  cancel_button: HTMLButtonElement,
  select_black: HTMLButtonElement,
  select_white: HTMLButtonElement,
  select_AIbattle: HTMLButtonElement,
  first_AIselect_box: HTMLSelectElement,
  first_AIselect_form: HTMLFormElement,
  second_AIselect_box: HTMLSelectElement,
  second_AIselect_form: HTMLFormElement,
  fix_AI: HTMLButtonElement
): void {
  start_button.addEventListener('click', (e: MouseEvent) => {
    game.now_gaming = true;
    game.start_button.style.display = 'none';
    game.select_black.style.display = 'none';
    game.select_white.style.display = 'none';
    game.select_AIbattle.style.display = 'none';
    game.cancel_button.style.display = 'inline';
    game.board = generate_initial_board();
    draw_board(game.board, game.canvas);
    game.black_player = 'user';
    game.white_player = 'user';
    game.message_holder.innerText =
      'お互い頑張ってください。' + '\n' + '黒の手番です。';
  });
  select_black.addEventListener('click', (e: MouseEvent) => {
    game.start_button.style.display = 'none';
    game.select_black.style.display = 'none';
    game.select_white.style.display = 'none';
    game.select_AIbattle.style.display = 'none';
    game.cancel_button.style.display = 'none';
    game.fix_AI.style.display = 'inline';
    game.second_AIselect_form.style.display = 'inline';
    fix_AI.addEventListener('click', async (e: MouseEvent) => {
      game.now_gaming = true;
      game.cancel_button.style.display = 'inline';
      game.second_AIselect_form.style.display = 'none';
      game.fix_AI.style.display = 'none';
      game.board = generate_initial_board();
      draw_board(game.board, game.canvas);
      game.black_player = 'user';
      game.white_player = await choice_AI(second_AIselect_box.value);
      game.message_holder.innerText =
        'さあゲームを始めましょう。' + '\n' + 'あなた(黒)の手番です。';
    });
  });
  select_white.addEventListener('click', (e: MouseEvent) => {
    game.start_button.style.display = 'none';
    game.select_black.style.display = 'none';
    game.select_white.style.display = 'none';
    game.select_AIbattle.style.display = 'none';
    game.cancel_button.style.display = 'none';
    game.fix_AI.style.display = 'inline';
    game.first_AIselect_form.style.display = 'inline';
    fix_AI.addEventListener('click', async (e: MouseEvent) => {
      game.now_gaming = true;
      game.cancel_button.style.display = 'inline';
      game.first_AIselect_form.style.display = 'none';
      game.fix_AI.style.display = 'none';
      game.board = generate_initial_board();
      draw_board(game.board, game.canvas);
      game.black_player = await choice_AI(first_AIselect_box.value);
      game.white_player = 'user';
      game.message_holder.innerText = '黒の手番です。';
    });
  });
  select_AIbattle.addEventListener('click', (e: MouseEvent) => {
    game.start_button.style.display = 'none';
    game.select_black.style.display = 'none';
    game.select_white.style.display = 'none';
    game.select_AIbattle.style.display = 'none';
    game.cancel_button.style.display = 'none';
    game.fix_AI.style.display = 'inline';
    game.first_AIselect_form.style.display = 'inline';
    game.second_AIselect_form.style.display = 'inline';
    fix_AI.addEventListener('click', async (e: MouseEvent) => {
      game.now_gaming = true;
      game.cancel_button.style.display = 'inline';
      game.first_AIselect_form.style.display = 'none';
      game.second_AIselect_form.style.display = 'none';
      game.fix_AI.style.display = 'none';
      game.board = generate_initial_board();
      draw_board(game.board, game.canvas);
      game.black_player = await choice_AI(first_AIselect_box.value);
      game.white_player = await choice_AI(second_AIselect_box.value);
      game.message_holder.innerText = '黒の手番です。';
    });
  });
}

export function put_cancel_button(
  game: Game,
  cancel_button: HTMLButtonElement
): void {
  cancel_button.addEventListener('click', (e: MouseEvent) => {
    game.turn_number = back_to_my_turn(game.board_history, game.turn_number);
    const board = game.board_history[game.turn_number]![0];
    game.board = board;
    game.now_gaming = true;
    game.start_button.style.display = 'none';
    game.select_black.style.display = 'none';
    game.select_white.style.display = 'none';
    game.select_AIbattle.style.display = 'none';
    game.message_holder.innerText = create_message(game, Gamestatus.Ok);
    draw_board(game.board, game.canvas);
  });
}

export function create_game(
  canvas: HTMLCanvasElement,
  message_holder: HTMLSpanElement,
  start_button: HTMLButtonElement,
  cancel_button: HTMLButtonElement,
  select_black: HTMLButtonElement,
  select_white: HTMLButtonElement,
  select_AIbattle: HTMLButtonElement,
  first_AIselect_box: HTMLSelectElement,
  first_AIselect_form: HTMLFormElement,
  second_AIselect_box: HTMLSelectElement,
  second_AIselect_form: HTMLFormElement,
  fix_AI: HTMLButtonElement
): Game {
  const game: Game = {
    last: performance.now(),
    interval: 1000 / 60, // ms
    board: generate_initial_board(),
    canvas: canvas,
    user_input: null,
    message_holder: message_holder,
    start_button: start_button,
    cancel_button: cancel_button,
    select_black: select_black,
    select_white: select_white,
    select_AIbattle: select_AIbattle,
    first_AIselect_box: first_AIselect_box,
    first_AIselect_form: first_AIselect_form,
    second_AIselect_box: second_AIselect_box,
    second_AIselect_form: second_AIselect_form,
    fix_AI: fix_AI,
    now_gaming: false,
    black_player: 'user',
    white_player: 'user',
    board_history: [[generate_initial_board(), Gamestatus.Ok]],
    turn_number: 0,
  };
  message_holder.innerText = '対戦相手、先攻後攻を選んでください。';
  game.start_button.style.display = 'inline';
  game.select_black.style.display = 'inline';
  game.select_white.style.display = 'inline';
  game.select_AIbattle.style.display = 'inline';
  register_mouse_input_listner(game);
  put_start_button(
    game,
    game.start_button,
    game.cancel_button,
    game.select_black,
    game.select_white,
    game.select_AIbattle,
    game.first_AIselect_box,
    game.first_AIselect_form,
    game.second_AIselect_box,
    game.second_AIselect_form,
    game.fix_AI
  );
  return game;
}

function wait(sec: number) {
  let start_time = performance.now();
  while (performance.now() - start_time < sec) {}
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
    return false;
  }
  if (game.now_gaming && game.user_input !== null) {
    game.turn_number = update_history(
      game.board_history,
      game.turn_number,
      game.user_input
    );
    const [board, status] = next_state(game.board, game.user_input);
    game.user_input = null;
    game.board = board;
    if (status === Gamestatus.Error) {
      return false;
    }
    if (status === Gamestatus.End) {
      game.message_holder.innerText = create_message(game, status);
      game.now_gaming = false;
      game.start_button.style.display = 'inline';
      game.select_black.style.display = 'inline';
      game.select_white.style.display = 'inline';
      game.select_AIbattle.style.display = 'inline';
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
        '再度ゲームを開始するにはボタンを押してください。'
      );
    } else if (calc_score(board)[0] < calc_score(board)[1]) {
      return (
        score +
        'ゲーム終了です。' +
        '\n' +
        '白の勝ちです。' +
        '\n' +
        '再度ゲームを開始するにはボタンを押してください。'
      );
    } else if ((calc_score(board)[0] = calc_score(board)[1])) {
      return (
        score +
        'ゲーム終了です。' +
        '\n' +
        '引き分けです。' +
        '\n' +
        '再度ゲームを開始するにはボタンを押してください。'
      );
    }
  }
  return 'バグ';
}
function weak_agent_move(): AIAgent | 'user' {
  throw new Error('Function not implemented.');
}
