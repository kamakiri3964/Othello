import { Board, generate_initial_board } from './othello';

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
