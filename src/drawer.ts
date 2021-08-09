export function draw_grid(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d')
//    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  let long = 0
  let short = 0

  if(canvas.height >= canvas.width){
      long = canvas.height
      short = canvas.width
  }

  else{
      long = canvas.width
      short = canvas.height
  }

  if (ctx != undefined) {
    // 基礎の盤面長方形に塗りつぶす 左上(短辺1/8, 短辺1/8) 幅: 短辺3/4, 高さ: 短辺3/4
    ctx.fillStyle = 'green';
    ctx.fillRect(short/8, short/8, short*3/4, short*3/4);

    // 縦線をひく (短辺1/8, 短辺1/8) から (短辺1/8, 短辺7/8)までを右に短辺3/32ずつ
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    for (let i = 0; i < 9; i++) {
      ctx.beginPath();
      ctx.moveTo(short/8+(short*3/32*i), short/8);
      ctx.lineTo(short/8+(short*3/32*i), short*7/8);
      ctx.stroke();    
    }

    // 横線をひく (短辺1/8, 短辺1/8) から (短辺7/8, 短辺1/8)までを下に短辺3/32ずつ
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    for (let i = 0; i < 9; i++) {
      ctx.beginPath();
      ctx.moveTo(short/8, short/8+(short*3/32*i));
      ctx.lineTo(short*7/8, short/8+(short*3/32*i));
      ctx.stroke();    
    }
  }
}

export function convert_vec(x: number, y: number, canvas: HTMLCanvasElement): [number, number] {
  let hight_mag = canvas.height / 100
  let width_mag = canvas.width / 100
  return [x * hight_mag, y * width_mag]
}

export function convert_scal(a: number, canvas: HTMLCanvasElement): number {
  return 1
}