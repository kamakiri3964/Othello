import {
  Board,
  calc_score,
  generate_initial_board,
  stringify_board,
  put_stone,
  flip_stone,
  move_turn,
  parse_coord,
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

test("put_stone", () => {
  const board = generate_initial_board()
  let result = put_stone([0,0], true, board)
  expect(result.black[0][0]).toBe(true)
  expect(result.black[0][1]).toBe(false)
  result = put_stone([1,0], false, board)
  expect(result.black[1][0]).toBe(false)
  expect(result.white[1][0]).toBe(true)
  result = put_stone([4,3], true, board)
  expect(result.black[4][3]).toBe(true)
  result = put_stone([3,3], false, board)
  expect(result.white[3][3]).toBe(true)
})

test("flip_stone", () => {
  const board = generate_initial_board()
  let result = flip_stone([3,3], board)
  expect(result.black[3][3]).toBe(true)
  expect(result.white[3][3]).toBe(false)
  result = flip_stone([4,4], board)
  expect(result.black[4][4]).toBe(true)
  expect(result.white[4][4]).toBe(false)
  result = flip_stone([4,3], board)
  expect(result.black[4][3]).toBe(false)
  expect(result.white[4][3]).toBe(true)
})

test("move_turn", () => {
  const board = generate_initial_board()
  let result = move_turn(board)
  expect(result.black_turn).toBe(false)
  result = move_turn(board)
  expect(result.black_turn).toBe(true)
})

test("parse_coord", () => {
  let result = parse_coord("c4")
  expect(result[0]).toBe(3)
  expect(result[1]).toBe(2)
  result = parse_coord("a6")
  expect(result[0]).toBe(5)
  expect(result[1]).toBe(0)
})
