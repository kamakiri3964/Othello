export function draw_grid(ctx: CanvasRenderingContext2D, height: number, width: number): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.height = height;
    canvas.width = width;

    let long = 0
    let short = 0

    if(height >= width){
        long = height
        short = width
    }

    else{
        long = width
        short = height
    }
  
    if (ctx != undefined) {
      // 基礎の盤面長方形に塗りつぶす 左上(100, 150) 幅: 600, 高さ: 600
      ctx.fillStyle = 'green';
      ctx.fillRect(short/8, short/8, short*3/4, short*3/4);
  
      // 縦線をひく (100, 150) から (100, 750)までを右に75ずつ
      ctx.strokeStyle = 'gray';
      ctx.lineWidth = 2;
      for (let i = 0; i < 9; i++) {
        ctx.beginPath();
        ctx.moveTo(short/8+(short*3/32*i), short/8);
        ctx.lineTo(short/8+(short*3/32*i), short*7/8);
        ctx.stroke();    
      }

      // 横線をひく (100, 150) から (700, 150)までを下に75ずつ
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