import {
    draw_grid,
    convert_scal,
    convert_vec
  } from './drawer';


test('convert_vec', () => {
    document.body.innerHTML = '<canvas id="canvas"></canvas>';
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.height = 800;
    canvas.width = 800;
  
    let [orig_x, orig_y] = [0, 0];
    let [new_x, new_y] = convert_vec(orig_x, orig_y, canvas);
    expect(new_x).toBe(0);
    expect(new_y).toBe(0);

    [orig_x, orig_y] = [1, 0];
    [new_x, new_y] = convert_vec(orig_x, orig_y, canvas);
    expect(new_x).toBe(8);
    expect(new_y).toBe(0);

    [orig_x, orig_y] = [1, 100];
    [new_x, new_y] = convert_vec(orig_x, orig_y, canvas);
    expect(new_x).toBe(8);
    expect(new_y).toBe(800);
});

test("convert_scal", () =>{
    document.body.innerHTML = '<canvas id="canvas"></canvas>';
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.height = 800;
    canvas.width = 800;


})