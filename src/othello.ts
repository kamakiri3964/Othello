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

//盤面初期化
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
    black: black as BoardArray,
    white: white as BoardArray,
    black_turn: black_turn,
  };

  return board;
}

//その時の盤面を表示
export function stringify_board(board: Board): string {
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

//[行番号, 列番号]、順番を受け取ってその場所に石を置く
export function put_stone(point: [number, number], black_turn: boolean, board: Board) {
  const raw_number = point[0]
  const column_number = point[1]
  if (black_turn){
    if (!board.black[raw_number]![column_number]){
      board.black[raw_number]![column_number] = !board.black[raw_number]![column_number]
    }
  }
  if (!black_turn){
    if(!board.white[raw_number]![column_number]){
      board.white[raw_number]![column_number] = !board.white[raw_number]![column_number]
    }
  }
  return board
}

//[行番号, 列番号]を受け取って石をひっくり返す
export function flip_stone(point: [number, number], board: Board) {
  const raw_number = point[0]
  const column_number = point[1]
  if (board.black[raw_number]![column_number]){
    if (!board.white[raw_number]![column_number]){
      board.black[raw_number]![column_number] = !board.black[raw_number]![column_number]
      board.white[raw_number]![column_number] = !board.white[raw_number]![column_number]
    }
  }
  else if (!board.black[raw_number]![column_number]){
    if (board.white[raw_number]![column_number]){
      board.black[raw_number]![column_number] = !board.black[raw_number]![column_number]
      board.white[raw_number]![column_number] = !board.white[raw_number]![column_number]
    }
  }
  return board
}

//手番を進める
export function move_turn(board: Board) {
  board.black_turn = !board.black_turn
  return board
}

//"英語小文字+数字"情報を受け取って[number, number]にする
export function parse_coord(coord_str: string): [number, number] {
  const raw_str = coord_str.split("")[1]
  const column_str = coord_str.split("")[0]
  let [raw_number, column_number] = [-1, -1]
  
  if (raw_str === "1"){
    raw_number = 0
  }
  if (raw_str === "2"){
    raw_number = 1
  }
  if (raw_str === "3"){
    raw_number = 2
  }
  if (raw_str === "4"){
    raw_number = 3
  }
  if (raw_str === "5"){
    raw_number = 4
  }
  if (raw_str === "6"){
    raw_number = 5
  }
  if (raw_str === "7"){
    raw_number = 6
  }
  if (raw_str === "8"){
    raw_number = 7
  }

  if (column_str === "a"){
    column_number = 0
  }
  if (column_str === "b"){
    column_number = 1
  }
  if (column_str === "c"){
    column_number = 2
  }
  if (column_str === "d"){
    column_number = 3
  }
  if (column_str === "e"){
    column_number = 4
  }
  if (column_str === "f"){
    column_number = 5
  }
  if (column_str === "g"){
    column_number = 6
  }
  if (column_str === "h"){
    column_number = 7
  }
  return [raw_number, column_number]
}