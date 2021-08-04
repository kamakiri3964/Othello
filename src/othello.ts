export type Row = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
];

export type BoardArray = [Row, Row, Row, Row, Row, Row, Row, Row];

export type Board = {
  black: BoardArray;
  white: BoardArray;
  black_turn: boolean;
};

export function generate_initial_board(): Board {
  //盤面初期化
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
    black: black as BoardArray,
    white: white as BoardArray,
    black_turn: black_turn,
  };

  return board;
}

export function stringify_board(board: Board): string {
  //その時の盤面を表示
  const L = board.black.length;
  const G = board.black[0].length;
  let Hyouji = `   a b c d e f g h
   - - - - - - - -
`;
  board.black.forEach((r, i) => {
    Hyouji = Hyouji + String(i + 1) + ' |';
    r.forEach((b, j) => {
      let c = ' ';
      if (board.white[i]![j]) {
        c = 'o';
      }
      if (b) {
        c = 'x';
      }
      Hyouji = Hyouji + c + '|';
    });
    Hyouji = Hyouji + '\n';
  });
  Hyouji = Hyouji + '   - - - - - - - -' + '\n';
  return Hyouji;
}

// [黒の石数, 白の石数]を返す
export function calc_score(board: Board): [number, number] {
  let b_score = 0;
  let w_score = 0;

  board.black.forEach((r, i) => {
    r.forEach((b, j) => {
      if (b) {
        b_score++;
      }
    });
  });
  board.white.forEach((r, i) => {
    r.forEach((b, j) => {
      if (b) {
        w_score++;
      }
    });
  });
  return [b_score, w_score];
}
