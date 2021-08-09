import {
    draw_grid,
  } from './drawer';

const main = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext('2d');

    if (ctx != undefined){
        draw_grid(canvas)
    }
};
  
main();
