import { new_random_player } from './ai';
import { draw_board, draw_grid, draw_piece, draw_pieces } from './drawer';
import { create_game, put_cancel_button, start_loop } from './game';
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

const main = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const message_holder = document.getElementById('message') as HTMLSpanElement;
  const start_button = document.getElementById(
    'start_button'
  ) as HTMLButtonElement;
  const cancel_button = document.getElementById(
    'cancel_button'
  ) as HTMLButtonElement;
  const select_black = document.getElementById(
    'select_black'
  ) as HTMLButtonElement;
  const select_white = document.getElementById(
    'select_white'
  ) as HTMLButtonElement;
  const select_AIbattle = document.getElementById(
    'select_AIbattle'
  ) as HTMLButtonElement;
  const first_AIselect_form = document.getElementById(
    'first_AIselect_form'
  ) as HTMLFormElement;
  const second_AIselect_form = document.getElementById(
    'second_AIselect_form'
  ) as HTMLFormElement;
  const first_AIselect_box = document.getElementById(
    'first_AIselect_box'
  ) as HTMLSelectElement;
  const second_AIselect_box = document.getElementById(
    'second_AIselect_box'
  ) as HTMLSelectElement;
  const fix_AI = document.getElementById('fix_AI') as HTMLButtonElement;

  cancel_button.style.display = 'none';
  fix_AI.style.display = 'none';
  first_AIselect_form.style.display = 'none';
  second_AIselect_form.style.display = 'none';

  const game = create_game(
    canvas,
    message_holder,
    start_button,
    cancel_button,
    select_black,
    select_white,
    select_AIbattle,
    first_AIselect_box,
    first_AIselect_form,
    second_AIselect_box,
    second_AIselect_form,
    fix_AI
  );
  put_cancel_button(game, game.cancel_button);
  draw_board(game.board, canvas);
  start_loop(game, canvas);
};

main();
