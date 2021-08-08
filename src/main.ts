import { createInterface } from 'readline';
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
  Gamestatus,
} from './othello';

const main = () => {
  console.log('さあゲームを始めましょう');
  let board = generate_initial_board();
  let status;
  process.stdout.write(stringify_board(board));
  const [b_score, w_score] = calc_score(board);
  console.log('   黒(x)：' + b_score);
  console.log('   白(o)：' + w_score);
  console.log('');
  let turn = board.black_turn;
  if (turn) {
    console.log('黒(x)の手番です。座標を入力してください。');
  } else {
    console.log('白(o)の手番です。座標を入力してください。');
  }

  process.stdout.write('> ');

  const reader = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  reader.on('line', function (line) {
    console.log('あなたが入力したのは"' + line + '"です');
    console.log('');
    const put_place: [number, number] = parse_coord(line);
    [board, status] = next_state(board, put_place);
    if (status === Gamestatus.Ok) {
      console.log(stringify_board(board));
      console.log('黒(x)： ' + calc_score(board)[0]);
      console.log('白(o)： ' + calc_score(board)[1]);
      if (board.black_turn) {
        console.log('黒(x)の手番です。座標を入力してください。');
      } else {
        console.log('白(o)の手番です。座標を入力してください。');
      }
      process.stdout.write('> ');
    } else if (status === Gamestatus.Error) {
      console.log(
        'そこには置くことができません。[ - ]で表示されているところに置いてください。'
      );
      if (board.black_turn) {
        console.log('黒(x)の手番です。座標を再度入力してください。');
      } else {
        console.log('白(o)の手番です。座標を再度入力してください。');
      }
      process.stdout.write('> ');
    } else if (status === Gamestatus.Pass) {
      console.log(stringify_board(board));
      console.log('黒(x)： ' + calc_score(board)[0]);
      console.log('白(o)： ' + calc_score(board)[1]);
      if (board.black_turn) {
        console.log(
          '白(o)は置くところがないのでパスです。再度黒(x)の手番です。'
        );
      } else {
        console.log(
          '黒(x)は置くところがないのでパスです。再度白(o)の手番です。'
        );
      }
      process.stdout.write('> ');
    } else if (status === Gamestatus.End) {
      console.log(stringify_board(board));
      console.log('ゲーム終了です。');
    }
  });
};

main();
