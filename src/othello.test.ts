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
  flipable_all_places,
  next_state,
  deep_copy_board_array,
  deep_copy_board,
} from './othello';

/*

test('generate_initial_board', () => {
  const board = generate_initial_board();
  expect(board.black.length).toBe(8);
  expect(board.black[0].length).toBe(8);
  expect(board.black[0][0]).toBe(false);
  expect(board.black[4][3]).toBe(true);
  expect(board.black[3][3]).toBe(false);
  expect(board.white.length).toBe(8);
  expect(board.white[0].length).toBe(8);
  expect(board.white[0][0]).toBe(false);
  expect(board.white[4][3]).toBe(false);
  expect(board.white[3][3]).toBe(true);
  expect(board.black_turn).toBe(true);
});

test('stringify_board', () => {
  const board = generate_initial_board();
  const string_board = stringify_board(board);
  expect(string_board).toBe(
    `   a b c d e f g h
   - - - - - - - -
1 | | | | | | | | |
2 | | | | | | | | |
3 | | | |-| | | | |
4 | | |-|o|x| | | |
5 | | | |x|o|-| | |
6 | | | | |-| | | |
7 | | | | | | | | |
8 | | | | | | | | |
   - - - - - - - -
`
  );
});

test('calc_score', () => {
  const board = generate_initial_board();
  let score = calc_score(board);
  expect(score[0]).toBe(2);
  expect(score[1]).toBe(2);
  board.black[0][0] = true;
  score = calc_score(board);
  expect(score[0]).toBe(3);
  expect(score[1]).toBe(2);
});

test('put_stone', () => {
  const board = generate_initial_board();
  let result = put_stone([0, 0], true, board);
  expect(result).toBe(true);
  expect(board.black[0][0]).toBe(true);
  result = put_stone([1, 0], false, board);
  expect(board.white[1][0]).toBe(true);
  expect(result).toBe(true);
  result = put_stone([4, 3], true, board);
  expect(board.black[4][3]).toBe(true);
  expect(result).toBe(false);
  result = put_stone([3, 3], false, board);
  expect(result).toBe(false);
  result = put_stone([-1, 3], false, board);
  expect(result).toBe(false);
  result = put_stone([3, -1], false, board);
  expect(result).toBe(false);
  result = put_stone([-1, -1], false, board);
  expect(result).toBe(false);
  result = put_stone([3, 3], false, board);
  expect(result).toBe(false);
  result = put_stone([3, 3], true, board);
  expect(result).toBe(false);
  result = put_stone([3, 4], true, board);
  expect(result).toBe(false);
});

test('flip_stone', () => {
  const board = generate_initial_board();
  let result = flip_stone([3, 3], board);
  expect(board.black[3][3]).toBe(true);
  expect(board.white[3][3]).toBe(false);
  expect(result).toBe(true);
  result = flip_stone([4, 4], board);
  expect(board.black[4][4]).toBe(true);
  expect(board.white[4][4]).toBe(false);
  expect(result).toBe(true);
  result = flip_stone([4, 3], board);
  expect(board.black[4][3]).toBe(false);
  expect(board.white[4][3]).toBe(true);
  expect(result).toBe(true);
  result = flip_stone([2, 3], board);
  expect(board.black[2][3]).toBe(false);
  expect(result).toBe(false);
});

test('move_turn', () => {
  const board = generate_initial_board();
  let result = move_turn(board);
  expect(result.black_turn).toBe(false);
  result = move_turn(board);
  expect(result.black_turn).toBe(true);
});

test('parse_coord', () => {
  let result = parse_coord('c4');
  expect(result[0]).toBe(3);
  expect(result[1]).toBe(2);
  result = parse_coord('a6');
  expect(result[0]).toBe(5);
  expect(result[1]).toBe(0);
  result = parse_coord('a12');
  expect(result[0]).toBe(-1);
  expect(result[1]).toBe(-1);
  result = parse_coord('5a');
  expect(result[0]).toBe(-1);
  expect(result[1]).toBe(-1);
  result = parse_coord('fsdjgbfl');
  expect(result[0]).toBe(-1);
  expect(result[1]).toBe(-1);
  result = parse_coord('2');
  expect(result[0]).toBe(-1);
  expect(result[1]).toBe(-1);
  result = parse_coord('b');
  expect(result[0]).toBe(-1);
  expect(result[1]).toBe(-1);
  result = parse_coord('あい');
  expect(result[0]).toBe(-1);
  expect(result[1]).toBe(-1);
  result = parse_coord('☺');
  expect(result[0]).toBe(-1);
  expect(result[1]).toBe(-1);
});

test('add_vec', () => {
  let result = add_vec([0, 0], [1, 1]);
  expect(result[0]).toBe(1);
  expect(result[1]).toBe(1);
  result = add_vec([0, 0], [1, -3]);
  expect(result[0]).toBe(1);
  expect(result[1]).toBe(-3);
  result = add_vec([0, 0], [-1, -3]);
  expect(result[0]).toBe(-1);
  expect(result[1]).toBe(-3);
  result = add_vec([0, 0], [0, 0]);
  expect(result[0]).toBe(0);
  expect(result[1]).toBe(0);
});

test('judge_flip_1d', () => {
  const board = generate_initial_board();
  let result = judge_flip_1d([2, 3], DIRECTIONS.down, board);
  expect(result).toEqual([[3, 3]]);
  result = judge_flip_1d([2, 3], DIRECTIONS.up, board);
  expect(result).toEqual([]);
  result = judge_flip_1d([2, 3], DIRECTIONS.dl, board);
  expect(result).toEqual([]);
  result = judge_flip_1d([4, 5], DIRECTIONS.left, board);
  expect(result).toEqual([[4, 4]]);
  result = judge_flip_1d([4, 5], DIRECTIONS.right, board);
  expect(result).toEqual([]);
  result = judge_flip_1d([1, 3], DIRECTIONS.down, board);
  expect(result).toEqual([]);
  result = judge_flip_1d([2, 4], DIRECTIONS.down, board);
  expect(result).toEqual([]);
  result = judge_flip_1d([3, 3], DIRECTIONS.down, board);
  expect(result).toEqual([]);
  result = judge_flip_1d([0, 0], DIRECTIONS.up, board);
  expect(result).toEqual([]);
});

test('is_valid_move', () => {
  const board = generate_initial_board();
  let result = is_valid_move([2, 3], board);
  expect(result).toBe(true);
  result = is_valid_move([4, 5], board);
  expect(result).toBe(true);
  result = is_valid_move([1, 3], board);
  expect(result).toBe(false);
  result = is_valid_move([3, 3], board);
  expect(result).toBe(false);
});

test('all_valid_moves', () => {
  const board = generate_initial_board();
  let result = all_valid_moves(board);
  expect(result).toEqual(
    expect.arrayContaining([
      [2, 3],
      [3, 2],
      [4, 5],
      [5, 4],
    ])
  );
});

test('flipable_all_places', () => {
  const board = generate_initial_board();
  let result = flipable_all_places([2, 3], board);
  expect(result).toEqual([[3, 3]]);
  result = flipable_all_places([5, 4], board);
  expect(result).toEqual([[4, 4]]);
});

test('next_state', () => {
  const board = generate_initial_board();
  let result = next_state(board, [2, 3]);
  expect(result[0].black[3][3]).toBe(true);
  expect(result[0].white[3][3]).toBe(false);
  expect(result[0].black[2][3]).toBe(true);
  expect(result[0].black[4][4]).toBe(false);
  expect(result[0].white[4][4]).toBe(true);
});

test('deep_copy_board_array', () => {
  let board = generate_initial_board();
  const copied_board_black = deep_copy_board_array(board.black);
  put_stone([0, 0], true, board);
  expect(!board.black[0][0]).toBe(copied_board_black[0][0]);
});

test('deep_copy_board', () => {
  let board = generate_initial_board();
  const copied_board = deep_copy_board(board);
  put_stone([0, 0], true, board);
  board = move_turn(board);
  expect(!board.black_turn).toBe(copied_board.black_turn);
  expect(!board.black[0][0]).toBe(copied_board.black[0][0]);
});
*/
