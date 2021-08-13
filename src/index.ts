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
  canvas.height = 400;
  canvas.width = 400;

  const game = create_game(canvas);
  draw_board(game.board, canvas);
  start_loop(game, canvas);
};

main();
