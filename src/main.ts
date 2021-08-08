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
} from './othello';

const main = () => {
  console.log('さあゲームを始めましょう');
  let board = generate_initial_board();
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
    const put_place = parse_coord(line);
    if (put_stone(put_place, board.black_turn, board)) {
      turn = move_turn(board).black_turn;
      console.log(stringify_board(board));
      if (turn) {
        console.log('黒(x)の手番です。座標を入力してください。');
      } else {
        console.log('白(o)の手番です。座標を入力してください。');
      }
    } else {
      console.log('そこには置くことができません。');
      if (turn) {
        console.log('黒(x)の手番です。座標を再度入力してください。');
      } else {
        console.log('白(o)の手番です。座標を再度入力してください。');
      }
    }

    process.stdout.write('> ');
  });
};

main();
