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

//export type Board_history = new Array(64).fill(Board)

export type Board_history = [Board, Gamestatus][];

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

/*
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
*/

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
export function put_stone(
  point: [number, number],
  black_turn: boolean,
  board: Board
) {
  const row_number = point[0];
  const column_number = point[1];

  if (
    row_number >= 0 &&
    row_number <= 7 &&
    column_number >= 0 &&
    column_number <= 7
  ) {
    if (
      !board.black[row_number]![column_number] &&
      !board.white[row_number]![column_number]
    ) {
      if (black_turn) {
        board.black[row_number]![column_number] = true;
      } else {
        board.white[row_number]![column_number] = true;
      }
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//[行番号, 列番号]を受け取って石をひっくり返す
export function flip_stone(point: [number, number], board: Board): boolean {
  const row_number = point[0];
  const column_number = point[1];

  if (
    row_number >= 0 &&
    row_number <= 7 &&
    column_number >= 0 &&
    column_number <= 7
  ) {
    if (
      board.black[row_number]![column_number] ||
      board.white[row_number]![column_number]
    ) {
      board.black[row_number]![column_number] =
        !board.black[row_number]![column_number];
      board.white[row_number]![column_number] =
        !board.white[row_number]![column_number];
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//手番を進める
export function move_turn(board: Board): Board {
  board.black_turn = !board.black_turn;
  return board;
}

//"英語小文字+数字"情報を受け取って[number, number]にする
export function parse_coord(coord_str: string): [number, number] {
  if (coord_str.length !== 2) {
    return [-1, -1];
  }

  const row_str = coord_str.split('')[1];
  const column_str = coord_str.split('')[0];
  let [row_number, column_number] = [-1, -1];

  if (row_str === '1') {
    row_number = 0;
  }
  if (row_str === '2') {
    row_number = 1;
  }
  if (row_str === '3') {
    row_number = 2;
  }
  if (row_str === '4') {
    row_number = 3;
  }
  if (row_str === '5') {
    row_number = 4;
  }
  if (row_str === '6') {
    row_number = 5;
  }
  if (row_str === '7') {
    row_number = 6;
  }
  if (row_str === '8') {
    row_number = 7;
  }

  if (column_str === 'a') {
    column_number = 0;
  }
  if (column_str === 'b') {
    column_number = 1;
  }
  if (column_str === 'c') {
    column_number = 2;
  }
  if (column_str === 'd') {
    column_number = 3;
  }
  if (column_str === 'e') {
    column_number = 4;
  }
  if (column_str === 'f') {
    column_number = 5;
  }
  if (column_str === 'g') {
    column_number = 6;
  }
  if (column_str === 'h') {
    column_number = 7;
  }

  if (row_number != -1 && column_number != -1) {
    return [row_number, column_number];
  }

  return [-1, -1];
}

//[number, number]分だけ[number, number]から移動する
export function add_vec(
  p: readonly [number, number],
  q: readonly [number, number]
): [number, number] {
  const new_p: [number, number] = [0, 0];
  new_p[0] = p[0] + q[0];
  new_p[1] = p[1] + q[1];
  return new_p;
}

export const DIRECTIONS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
  ul: [-1, -1],
  ur: [-1, 1],
  dl: [1, -1],
  dr: [1, 1],
} as const;

//一定方向にひっくり返せる石があるか判断する
export function judge_flip_1d(
  p: readonly [number, number],
  q: readonly [number, number],
  board: Board
): [number, number][] {
  let flipable_stones = [];
  let new_p: [number, number] = add_vec(p, q);
  if (board.black_turn) {
    let w_row = board.white[new_p[0]];
    if (w_row == undefined || !w_row[new_p[1]]) {
      return [];
    }
    while (w_row != undefined && w_row[new_p[1]]) {
      flipable_stones.push(new_p);
      new_p = add_vec(new_p, q);
      w_row = board.white[new_p[0]];
    }
    let b_row = board.black[new_p[0]];
    if (b_row != undefined && b_row[new_p[1]]) {
      return flipable_stones;
    }
    return [];
  } else {
    let b_row = board.black[new_p[0]];
    if (b_row == undefined || !b_row[new_p[1]]) {
      return [];
    }
    while (b_row != undefined && b_row[new_p[1]]) {
      flipable_stones.push(new_p);
      new_p = add_vec(new_p, q);
      b_row = board.black[new_p[0]];
    }
    let w_row = board.white[new_p[0]];
    if (w_row != undefined && w_row[new_p[1]]) {
      return flipable_stones;
    }
    return [];
  }
}

//[number, number]を受け取って合法かを判断する
export function is_valid_move(p: [number, number], board: Board): boolean {
  let judge_number = 0;

  const w_row = board.white[p[0]];
  const b_row = board.black[p[0]];

  if (b_row == undefined || b_row[p[1]] || w_row == undefined || w_row[p[1]]) {
    return false;
  }
  for (const property in DIRECTIONS) {
    if (judge_flip_1d(p, Reflect.get(DIRECTIONS, property), board).length > 0) {
      judge_number++;
    }
  }
  if (judge_number > 0) {
    return true;
  }
  return false;
}

//合法手を全表示する
export function all_valid_moves(board: Board): [number, number][] {
  const can_put_place: [number, number][] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (is_valid_move([i, j], board)) {
        can_put_place.push([i, j]);
      }
    }
  }
  return can_put_place;
}

//その時の盤面を表示 ※ただしおける場所を-で表示
export function stringify_board(board: Board): string {
  let can_put_place: [number, number][] = all_valid_moves(board);
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
      for (const element of can_put_place) {
        if (element[0] === i && element[1] === j) {
          c = '-';
        }
      }
      Hyouji = Hyouji + c + '|';
    });
    Hyouji = Hyouji + '\n';
  });
  Hyouji = Hyouji + '   - - - - - - - -' + '\n';
  return Hyouji;
}

//ひっくり返せるところをすべてリスト化する
export function flipable_all_places(
  p: [number, number],
  board: Board
): [number, number][] {
  let can_flip_places: [number, number][] = [];
  for (const property in DIRECTIONS) {
    const q: [number, number] = Reflect.get(DIRECTIONS, property);
    can_flip_places = can_flip_places.concat(judge_flip_1d(p, q, board));
  }
  return can_flip_places;
}

export enum Gamestatus {
  Ok,
  Pass,
  End,
  Error,
}

//現在の盤面と次の着手が与えられて次の盤面を返す
export function next_state(
  input_board: Readonly<Board>,
  p: [number, number]
): [Board, Gamestatus] {
  const board = deep_copy_board(input_board);
  if (is_valid_move(p, board) && put_stone(p, board.black_turn, board)) {
    const can_flip_places = flipable_all_places(p, board);
    for (const elements of can_flip_places) {
      flip_stone(elements, board);
    }

    move_turn(board);

    if (all_valid_moves(board).length > 0) {
      return [board, Gamestatus.Ok];
    }

    if (all_valid_moves(board).length === 0) {
      move_turn(board);
      if (all_valid_moves(board).length === 0) {
        return [board, Gamestatus.End];
      } else {
        return [board, Gamestatus.Pass];
      }
    }
  }
  return [board, Gamestatus.Error];
}

export function update_history(
  board_history: Board_history,
  turn_number: number,
  user_input: [number, number]
): number {
  const board = board_history[turn_number]![0];
  delete_later_turn(board_history, turn_number);
  const [next_board, status] = next_state(board, user_input);
  board_history.push([next_board, status]);
  return turn_number + 1;
}

//現在の盤面と次の着手が与えられて次の盤面をhistoryに保存する
/*
export function keep_next_state(
  board: Readonly<Board>,
  p: [number, number],
  board_history: Board_history,
  turn_number: number
):number{
  let temporary_board = deep_copy_board(board_history[turn_number]![0])
  if (is_valid_move(p, temporary_board) && put_stone(p, board.black_turn, temporary_board)) {
    const can_flip_places = flipable_all_places(p, board);
    for (const elements of can_flip_places) {
      flip_stone(elements, temporary_board);
    }
    temporary_board = move_turn(temporary_board);
    if (all_valid_moves(temporary_board).length > 0) {
      const put_number = add_board_history(deep_copy_board(temporary_board), board_history, Gamestatus.Ok, turn_number);
      return put_number
    }

    if (all_valid_moves(temporary_board).length === 0) {
      temporary_board = move_turn(temporary_board);
      if (all_valid_moves(temporary_board).length === 0) {
        const put_number = add_board_history(deep_copy_board(temporary_board), board_history, Gamestatus.End, turn_number);
        return put_number
      } else {
        const put_number = add_board_history(deep_copy_board(temporary_board), board_history, Gamestatus.Pass, turn_number);
        return put_number;
      }
    }
  }
  return turn_number
}
*/

export function deep_copy_board_array(
  board_array: Readonly<BoardArray>
): BoardArray {
  return board_array.map((r) => [...r]) as BoardArray;
}

export function deep_copy_board(board: Readonly<Board>): Board {
  return {
    ...board,
    black: deep_copy_board_array(board.black),
    white: deep_copy_board_array(board.white),
  };
}

export function add_board_history(
  board: Readonly<Board>,
  board_history: Board_history,
  status: Gamestatus,
  turn_number: number
): number {
  board_history.push([deep_copy_board(board), status]);
  const put_turn_number = turn_number + 1;
  return put_turn_number;
}

//historyは消さずにboaedが1ターン戻る
export function return_one_turn(
  board_history: Board_history,
  turn_number: number
): Board {
  if (turn_number >= 1) {
    const board = deep_copy_board(board_history[turn_number - 1]![0]);
    turn_number = turn_number - 1;
    return board;
  }
  return deep_copy_board(board_history[turn_number]![0]);
}

//historyは消さずにboaedが1ターン進む
export function next_one_turn(
  board_history: Board_history,
  turn_number: number
): Board {
  if (turn_number < board_history.length - 1) {
    const board = deep_copy_board(board_history[turn_number + 1]![0]);
    turn_number++;
    return board;
  }
  return deep_copy_board(board_history[turn_number]![0]);
}

//そのboard以降のhistoryを消す
export function delete_later_turn(
  board_history: Board_history,
  turn_number: number
): Board_history {
  if (board_history.length > 1) {
    const number_of_delete = board_history.length - turn_number - 1;
    for (let i = 0; i < number_of_delete; i++) {
      board_history.pop();
    }
    return board_history;
  }
  return board_history;
}

//前回のその色のターンまで戻る
export function back_to_my_turn(
  board_history: Board_history,
  turn_number: number
): number {
  if (turn_number > 1) {
    const is_black_turn = board_history[turn_number]![0].black_turn;
    turn_number--;
    let before_board = deep_copy_board(board_history[turn_number]![0]);
    while (is_black_turn !== before_board.black_turn) {
      turn_number--;
      before_board = deep_copy_board(board_history[turn_number]![0]);
    }
    return turn_number;
  }
  return turn_number;
}
