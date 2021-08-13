import { draw_board, draw_grid, draw_piece, draw_pieces } from './drawer';
import { create_game, start_loop } from './game';
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
  canvas.height = 400;
  canvas.width = 400;
  message_holder.innerText = 'さあゲームを始めましょう';
  start_button.style.display = 'none';

  const game = create_game(canvas, message_holder, start_button);
  draw_board(game.board, canvas);
  start_loop(game, canvas);
};

main();
