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

/*
export function draw_grid(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  //    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  let long = 0;
  let short = 0;

  if (canvas.height >= canvas.width) {
    long = canvas.height;
    short = canvas.width;
  } else {
    long = canvas.width;
    short = canvas.height;
  }

  let [field_sp_x, field_sp_y] = [short / 8, short / 8];
  let field_size_length = (short * 3) / 4;

  if (ctx != undefined) {
    // 基礎の盤面長方形に塗りつぶす 左上(短辺1/8, 短辺1/8) 幅: 短辺3/4, 高さ: 短辺3/4
    ctx.fillStyle = 'green';
    ctx.fillRect(field_sp_x, field_sp_y, field_size_length, field_size_length);

    // 縦線をひく (短辺1/8, 短辺1/8) から (短辺1/8, 短辺7/8)までを右に短辺3/32ずつ
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    for (let i = 0; i < 9; i++) {
      ctx.beginPath();
      ctx.moveTo(field_sp_x + (field_size_length / 8) * i, field_sp_y);
      ctx.lineTo(
        field_sp_x + (field_size_length / 8) * i,
        field_sp_y + field_size_length
      );
      ctx.stroke();
    }

    // 横線をひく (短辺1/8, 短辺1/8) から (短辺7/8, 短辺1/8)までを下に短辺3/32ずつ
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    for (let i = 0; i < 9; i++) {
      ctx.beginPath();
      ctx.moveTo(field_sp_x, field_sp_y + (field_size_length / 8) * i);
      ctx.lineTo(
        field_sp_x + field_size_length,
        field_sp_y + (field_size_length / 8) * i
      );
      ctx.stroke();
    }
  }
}
*/

export function convert_vec(
  x: number,
  y: number,
  canvas: HTMLCanvasElement
): [number, number] {
  let hight_mag = canvas.height / 100;
  let width_mag = canvas.width / 100;
  return [x * hight_mag, y * width_mag];
}

export function convert_scal(a: number, canvas: HTMLCanvasElement): number {
  let scal_mag = canvas.height / 100;
  return a * scal_mag;
}

export function draw_grid(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  //    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

  let [field_sp_x, field_sp_y] = convert_vec(0, 0, canvas);
  let field_size_length = convert_scal(100, canvas);

  if (ctx != undefined) {
    // 基礎の盤面長方形に塗りつぶす
    ctx.fillStyle = 'green';
    ctx.fillRect(field_sp_x, field_sp_y, field_size_length, field_size_length);

    // 縦線をひく
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    for (let i = 0; i < 9; i++) {
      ctx.beginPath();
      ctx.moveTo(field_sp_x + (field_size_length / 8) * i, field_sp_y);
      ctx.lineTo(
        field_sp_x + (field_size_length / 8) * i,
        field_sp_y + field_size_length
      );
      ctx.stroke();
    }

    // 横線をひく
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    for (let i = 0; i < 9; i++) {
      ctx.beginPath();
      ctx.moveTo(field_sp_x, field_sp_y + (field_size_length / 8) * i);
      ctx.lineTo(
        field_sp_x + field_size_length,
        field_sp_y + (field_size_length / 8) * i
      );
      ctx.stroke();
    }
  }
}

export function draw_piece(
  i: number,
  j: number,
  canvas: HTMLCanvasElement,
  color: boolean
): void {
  const ctx = canvas.getContext('2d');
  //    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

  const [center_x, center_y] = convert_vec(
    100 / 16 + (j * 100) / 8,
    100 / 16 + (i * 100) / 8,
    canvas
  );
  const r = convert_scal(5, canvas);

  if (ctx != undefined) {
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    if (color === true) {
      ctx.fillStyle = 'black';
    } else {
      ctx.fillStyle = 'white';
    }
    ctx.beginPath();
    ctx.arc(center_x, center_y, r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
  }
}

export function draw_pieces(board: Board, canvas: HTMLCanvasElement): void {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board.black[i]![j]) {
        draw_piece(i, j, canvas, true);
      } else if (board.white[i]![j]) {
        draw_piece(i, j, canvas, false);
      }
    }
  }
}

export function draw_board(board: Board, canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (ctx != undefined) {
    ctx.clearRect(
      ...convert_vec(0, 0, canvas),
      ...convert_vec(100, 100, canvas)
    );
  }

  draw_grid(canvas);
  draw_pieces(board, canvas);
}
