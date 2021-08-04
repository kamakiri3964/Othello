export type Board = {
  black: boolean[][];
  white: boolean[][];
  black_turn: boolean;
};

export function generate_initial_board(): Board {
  const black = new Array(8);
  for (let i = 0; i < 8; i++) {
    black[i] = new Array(8).fill(false);
  }
  black[4][3] = true;
  black[3][4] = true;

  const white = new Array(8);
  for (let j = 0; j < 8; j++) {
    white[j] = new Array(8).fill(false);
  }
  white[3][3] = true;
  white[4][4] = true;

  const black_turn = true;

  const board = {
    black: black,
    white: white,
    black_turn: black_turn,
  };

  return board;
}
