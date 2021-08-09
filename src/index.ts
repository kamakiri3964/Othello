import {
    draw_grid,
  } from './drawer';

const main = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.height = 800;
    canvas.width = 800;
    const ctx = canvas.getContext('2d');

    if (ctx != undefined){
        draw_grid(ctx, canvas.height, canvas.width = 800)
    }
};
  
  main();
