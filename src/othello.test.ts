import {
  Board,
  calc_score,
  generate_initial_board,
  stringify_board,
} from './othello';

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
3 | | | | | | | | |
4 | | | |o|x| | | |
5 | | | |x|o| | | |
6 | | | | | | | | |
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
