/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ai.ts":
/*!*******************!*\
  !*** ./src/ai.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "new_random_player": () => (/* binding */ new_random_player)
/* harmony export */ });
/* harmony import */ var _othello__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./othello */ "./src/othello.ts");

function new_random_player() {
    return {
        next_move: (board) => {
            const can_put_place = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.all_valid_moves)(board);
            const put_place = can_put_place[Math.floor(Math.random() * can_put_place.length)];
            if (put_place !== undefined) {
                return put_place;
            }
            return [-1, -1];
        },
    };
}


/***/ }),

/***/ "./src/drawer.ts":
/*!***********************!*\
  !*** ./src/drawer.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convert_vec": () => (/* binding */ convert_vec),
/* harmony export */   "convert_scal": () => (/* binding */ convert_scal),
/* harmony export */   "draw_grid": () => (/* binding */ draw_grid),
/* harmony export */   "draw_piece": () => (/* binding */ draw_piece),
/* harmony export */   "draw_can_put_place": () => (/* binding */ draw_can_put_place),
/* harmony export */   "draw_pieces": () => (/* binding */ draw_pieces),
/* harmony export */   "draw_board": () => (/* binding */ draw_board),
/* harmony export */   "input_convert_place": () => (/* binding */ input_convert_place)
/* harmony export */ });
/* harmony import */ var _othello__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./othello */ "./src/othello.ts");

function convert_vec(x, y, canvas) {
    let hight_mag = canvas.height / 100;
    let width_mag = canvas.width / 100;
    return [x * hight_mag, y * width_mag];
}
function convert_scal(a, canvas) {
    let scal_mag = canvas.height / 100;
    return a * scal_mag;
}
function draw_grid(canvas) {
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
            ctx.lineTo(field_sp_x + (field_size_length / 8) * i, field_sp_y + field_size_length);
            ctx.stroke();
        }
        // 横線をひく
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 2;
        for (let i = 0; i < 9; i++) {
            ctx.beginPath();
            ctx.moveTo(field_sp_x, field_sp_y + (field_size_length / 8) * i);
            ctx.lineTo(field_sp_x + field_size_length, field_sp_y + (field_size_length / 8) * i);
            ctx.stroke();
        }
    }
}
function draw_piece(i, j, canvas, color) {
    const ctx = canvas.getContext('2d');
    //    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const [center_x, center_y] = convert_vec(100 / 16 + (j * 100) / 8, 100 / 16 + (i * 100) / 8, canvas);
    const r = convert_scal(5, canvas);
    if (ctx != undefined) {
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 2;
        if (color === true) {
            ctx.fillStyle = 'black';
        }
        else {
            ctx.fillStyle = 'white';
        }
        ctx.beginPath();
        ctx.arc(center_x, center_y, r, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
    }
}
function draw_can_put_place(i, j, canvas) {
    const ctx = canvas.getContext('2d');
    //    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const [center_x, center_y] = convert_vec(100 / 16 + (j * 100) / 8, 100 / 16 + (i * 100) / 8, canvas);
    const r = convert_scal(2, canvas);
    if (ctx != undefined) {
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 2;
        ctx.fillStyle = 'gray';
        ctx.beginPath();
        ctx.arc(center_x, center_y, r, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
    }
}
function draw_pieces(board, canvas) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board.black[i][j]) {
                draw_piece(i, j, canvas, true);
            }
            else if (board.white[i][j]) {
                draw_piece(i, j, canvas, false);
            }
        }
    }
}
function draw_board(board, canvas) {
    const ctx = canvas.getContext('2d');
    const field_size = [
        document.body.clientWidth,
        window.innerHeight - 100,
        600,
    ].reduce((a, b) => Math.min(a, b));
    canvas.height = field_size;
    canvas.width = field_size;
    if (ctx != undefined) {
        ctx.clearRect(...convert_vec(0, 0, canvas), ...convert_vec(100, 100, canvas));
    }
    draw_grid(canvas);
    draw_pieces(board, canvas);
    (0,_othello__WEBPACK_IMPORTED_MODULE_0__.all_valid_moves)(board).forEach(function (element) {
        draw_can_put_place(element[0], element[1], canvas);
    });
}
function input_convert_place(user_input, canvas) {
    const user_input_100 = [
        (user_input[0] / canvas.height) * 100,
        (user_input[1] / canvas.width) * 100,
    ];
    const i = Math.round((user_input_100[0] - 6.75) / 12.5);
    const j = Math.round((user_input_100[1] - 6.75) / 12.5);
    return [i, j];
}


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "register_mouse_input_listner": () => (/* binding */ register_mouse_input_listner),
/* harmony export */   "put_start_button": () => (/* binding */ put_start_button),
/* harmony export */   "put_cancel_button": () => (/* binding */ put_cancel_button),
/* harmony export */   "create_game": () => (/* binding */ create_game),
/* harmony export */   "start_loop": () => (/* binding */ start_loop),
/* harmony export */   "create_message": () => (/* binding */ create_message)
/* harmony export */ });
/* harmony import */ var _ai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ai */ "./src/ai.ts");
/* harmony import */ var _drawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawer */ "./src/drawer.ts");
/* harmony import */ var _othello__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./othello */ "./src/othello.ts");



function register_mouse_input_listner(game) {
    game.canvas.addEventListener('click', (e) => {
        const rect = game.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const [i, j] = (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.input_convert_place)([x, y], game.canvas);
        game.user_input = [j, i];
    });
}
function put_start_button(game, start_button, cancel_button, select_black, select_white) {
    start_button.addEventListener('click', (e) => {
        game.now_gaming = true;
        game.start_button.style.display = 'none';
        game.select_black.style.display = 'none';
        game.select_white.style.display = 'none';
        game.cancel_button.style.display = 'inline';
        game.board = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.generate_initial_board)();
        (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.draw_board)(game.board, game.canvas);
        game.black_player = 'user';
        game.white_player = 'user';
        game.message_holder.innerText =
            'お互い頑張ってください。' +
                '\n' +
                '黒の手番です。';
    });
    select_black.addEventListener('click', (e) => {
        game.now_gaming = true;
        game.start_button.style.display = 'none';
        game.select_black.style.display = 'none';
        game.select_white.style.display = 'none';
        game.cancel_button.style.display = 'inline';
        game.board = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.generate_initial_board)();
        (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.draw_board)(game.board, game.canvas);
        game.black_player = 'user';
        game.white_player = (0,_ai__WEBPACK_IMPORTED_MODULE_0__.new_random_player)();
        game.message_holder.innerText =
            'さあゲームを始めましょう。' + '\n' + 'あなた(黒)の手番です。';
    });
    select_white.addEventListener('click', (e) => {
        game.now_gaming = true;
        game.start_button.style.display = 'none';
        game.select_black.style.display = 'none';
        game.select_white.style.display = 'none';
        game.cancel_button.style.display = 'inline';
        game.board = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.generate_initial_board)();
        (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.draw_board)(game.board, game.canvas);
        game.black_player = (0,_ai__WEBPACK_IMPORTED_MODULE_0__.new_random_player)();
        game.white_player = 'user';
        game.message_holder.innerText =
            'さあゲームを始めましょう。' + '\n' + '黒の手番です。';
    });
}
function put_cancel_button(game, cancel_button) {
    cancel_button.addEventListener('click', (e) => {
        game.turn_number = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.back_to_my_turn)(game.board_history, game.turn_number);
        const board = game.board_history[game.turn_number][0];
        game.board = board;
        (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.draw_board)(game.board, game.canvas);
    });
}
function create_game(canvas, message_holder, start_button, cancel_button, select_black, select_white) {
    const game = {
        last: performance.now(),
        interval: 1000 / 60,
        board: (0,_othello__WEBPACK_IMPORTED_MODULE_2__.generate_initial_board)(),
        canvas: canvas,
        user_input: null,
        message_holder: message_holder,
        start_button: start_button,
        cancel_button: cancel_button,
        select_black: select_black,
        select_white: select_white,
        now_gaming: false,
        black_player: 'user',
        white_player: 'user',
        board_history: [[(0,_othello__WEBPACK_IMPORTED_MODULE_2__.generate_initial_board)(), _othello__WEBPACK_IMPORTED_MODULE_2__.Gamestatus.Ok]],
        turn_number: 0,
    };
    message_holder.innerText = '対戦相手、先攻後攻を選んでください。';
    game.start_button.style.display = 'inline';
    game.select_black.style.display = 'inline';
    game.select_white.style.display = 'inline';
    register_mouse_input_listner(game);
    put_start_button(game, game.start_button, game.cancel_button, game.select_black, game.select_white);
    return game;
}
function update_state(game) {
    if (game.board.black_turn) {
        if (game.black_player === 'user') {
            return input_state(game);
        }
        else {
            game.user_input = game.black_player.next_move(game.board);
            return input_state(game);
        }
    }
    if (!game.board.black_turn) {
        if (game.white_player === 'user') {
            return input_state(game);
        }
        else {
            game.user_input = game.white_player.next_move(game.board);
            return input_state(game);
        }
    }
    return false;
}
function input_state(game) {
    if (!game.now_gaming && game.user_input !== null) {
        game.user_input = null;
        return false;
    }
    if (game.now_gaming && game.user_input !== null) {
        game.turn_number = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.update_history)(game.board_history, game.turn_number, game.user_input);
        const [board, status] = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.next_state)(game.board, game.user_input);
        game.user_input = null;
        game.board = board;
        if (status === _othello__WEBPACK_IMPORTED_MODULE_2__.Gamestatus.Error) {
            return false;
        }
        if (status === _othello__WEBPACK_IMPORTED_MODULE_2__.Gamestatus.End) {
            game.message_holder.innerText = create_message(game, status);
            game.now_gaming = false;
            game.start_button.style.display = 'inline';
            game.select_black.style.display = 'inline';
            game.select_white.style.display = 'inline';
            return true;
        }
        else {
            game.message_holder.innerText = create_message(game, status);
            return true;
        }
    }
    return false;
}
function update_game(game) {
    if (update_state(game)) {
        (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.draw_board)(game.board, game.canvas);
    }
}
function start_loop(game, canvas) {
    const run = (now) => {
        let delta = now - game.last;
        while (delta >= game.interval) {
            delta -= game.interval;
            game.last = now - delta;
            update_game(game);
        }
        requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
}
function create_message(game, status) {
    const board = game.board;
    const b_score = '黒： ' + (0,_othello__WEBPACK_IMPORTED_MODULE_2__.calc_score)(board)[0];
    const w_score = '白： ' + (0,_othello__WEBPACK_IMPORTED_MODULE_2__.calc_score)(board)[1];
    const score = b_score +
        '\n' +
        w_score +
        '\n';
    if (status === _othello__WEBPACK_IMPORTED_MODULE_2__.Gamestatus.Ok) {
        if (board.black_turn) {
            return score + '黒の手番です';
        }
        else {
            return score + '白の手番です';
        }
    }
    else if (status === _othello__WEBPACK_IMPORTED_MODULE_2__.Gamestatus.Error) {
        if (board.black_turn) {
            return score + 'そこには置くことができません。黒の手番です。';
        }
        else {
            return score + 'そこには置くことができません。白の手番です。';
        }
    }
    else if (status === _othello__WEBPACK_IMPORTED_MODULE_2__.Gamestatus.Pass) {
        if (board.black_turn) {
            return score + '白は置くところがないのでパスです。再度黒の手番です。';
        }
        else {
            return score + '黒は置くところがないのでパスです。再度白の手番です。';
        }
    }
    else if (status === _othello__WEBPACK_IMPORTED_MODULE_2__.Gamestatus.End) {
        if ((0,_othello__WEBPACK_IMPORTED_MODULE_2__.calc_score)(board)[0] > (0,_othello__WEBPACK_IMPORTED_MODULE_2__.calc_score)(board)[1]) {
            return (score +
                'ゲーム終了です。' +
                '\n' +
                '黒の勝ちです。' +
                '\n' +
                '再度ゲームを開始するにはボタンを押してください。');
        }
        else if ((0,_othello__WEBPACK_IMPORTED_MODULE_2__.calc_score)(board)[0] < (0,_othello__WEBPACK_IMPORTED_MODULE_2__.calc_score)(board)[1]) {
            return (score +
                'ゲーム終了です。' +
                '\n' +
                '白の勝ちです。' +
                '\n' +
                '再度ゲームを開始するにはボタンを押してください。');
        }
        else if (((0,_othello__WEBPACK_IMPORTED_MODULE_2__.calc_score)(board)[0] = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.calc_score)(board)[1])) {
            return (score +
                'ゲーム終了です。' +
                '\n' +
                '引き分けです。' +
                '\n' +
                '再度ゲームを開始するにはボタンを押してください。');
        }
    }
    return 'バグ';
}


/***/ }),

/***/ "./src/othello.ts":
/*!************************!*\
  !*** ./src/othello.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generate_initial_board": () => (/* binding */ generate_initial_board),
/* harmony export */   "calc_score": () => (/* binding */ calc_score),
/* harmony export */   "put_stone": () => (/* binding */ put_stone),
/* harmony export */   "flip_stone": () => (/* binding */ flip_stone),
/* harmony export */   "move_turn": () => (/* binding */ move_turn),
/* harmony export */   "parse_coord": () => (/* binding */ parse_coord),
/* harmony export */   "add_vec": () => (/* binding */ add_vec),
/* harmony export */   "DIRECTIONS": () => (/* binding */ DIRECTIONS),
/* harmony export */   "judge_flip_1d": () => (/* binding */ judge_flip_1d),
/* harmony export */   "is_valid_move": () => (/* binding */ is_valid_move),
/* harmony export */   "all_valid_moves": () => (/* binding */ all_valid_moves),
/* harmony export */   "stringify_board": () => (/* binding */ stringify_board),
/* harmony export */   "flipable_all_places": () => (/* binding */ flipable_all_places),
/* harmony export */   "Gamestatus": () => (/* binding */ Gamestatus),
/* harmony export */   "next_state": () => (/* binding */ next_state),
/* harmony export */   "update_history": () => (/* binding */ update_history),
/* harmony export */   "deep_copy_board_array": () => (/* binding */ deep_copy_board_array),
/* harmony export */   "deep_copy_board": () => (/* binding */ deep_copy_board),
/* harmony export */   "add_board_history": () => (/* binding */ add_board_history),
/* harmony export */   "return_one_turn": () => (/* binding */ return_one_turn),
/* harmony export */   "next_one_turn": () => (/* binding */ next_one_turn),
/* harmony export */   "delete_later_turn": () => (/* binding */ delete_later_turn),
/* harmony export */   "back_to_my_turn": () => (/* binding */ back_to_my_turn)
/* harmony export */ });
//盤面初期化
function generate_initial_board() {
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
        black: black,
        white: white,
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
function calc_score(board) {
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
function put_stone(point, black_turn, board) {
    const row_number = point[0];
    const column_number = point[1];
    if (row_number >= 0 &&
        row_number <= 7 &&
        column_number >= 0 &&
        column_number <= 7) {
        if (!board.black[row_number][column_number] &&
            !board.white[row_number][column_number]) {
            if (black_turn) {
                board.black[row_number][column_number] = true;
            }
            else {
                board.white[row_number][column_number] = true;
            }
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
//[行番号, 列番号]を受け取って石をひっくり返す
function flip_stone(point, board) {
    const row_number = point[0];
    const column_number = point[1];
    if (row_number >= 0 &&
        row_number <= 7 &&
        column_number >= 0 &&
        column_number <= 7) {
        if (board.black[row_number][column_number] ||
            board.white[row_number][column_number]) {
            board.black[row_number][column_number] =
                !board.black[row_number][column_number];
            board.white[row_number][column_number] =
                !board.white[row_number][column_number];
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
//手番を進める
function move_turn(board) {
    board.black_turn = !board.black_turn;
    return board;
}
//"英語小文字+数字"情報を受け取って[number, number]にする
function parse_coord(coord_str) {
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
function add_vec(p, q) {
    const new_p = [0, 0];
    new_p[0] = p[0] + q[0];
    new_p[1] = p[1] + q[1];
    return new_p;
}
const DIRECTIONS = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
    ul: [-1, -1],
    ur: [-1, 1],
    dl: [1, -1],
    dr: [1, 1],
};
//一定方向にひっくり返せる石があるか判断する
function judge_flip_1d(p, q, board) {
    let flipable_stones = [];
    let new_p = add_vec(p, q);
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
    }
    else {
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
function is_valid_move(p, board) {
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
function all_valid_moves(board) {
    const can_put_place = [];
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
function stringify_board(board) {
    let can_put_place = all_valid_moves(board);
    let Hyouji = `   a b c d e f g h
   - - - - - - - -
`;
    board.black.forEach((r, i) => {
        Hyouji = Hyouji + String(i + 1) + ' |';
        r.forEach((b, j) => {
            let c = ' ';
            if (board.white[i][j]) {
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
function flipable_all_places(p, board) {
    let can_flip_places = [];
    for (const property in DIRECTIONS) {
        const q = Reflect.get(DIRECTIONS, property);
        can_flip_places = can_flip_places.concat(judge_flip_1d(p, q, board));
    }
    return can_flip_places;
}
var Gamestatus;
(function (Gamestatus) {
    Gamestatus[Gamestatus["Ok"] = 0] = "Ok";
    Gamestatus[Gamestatus["Pass"] = 1] = "Pass";
    Gamestatus[Gamestatus["End"] = 2] = "End";
    Gamestatus[Gamestatus["Error"] = 3] = "Error";
})(Gamestatus || (Gamestatus = {}));
//現在の盤面と次の着手が与えられて次の盤面を返す
function next_state(input_board, p) {
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
            }
            else {
                return [board, Gamestatus.Pass];
            }
        }
    }
    return [board, Gamestatus.Error];
}
function update_history(board_history, turn_number, user_input) {
    const board = board_history[turn_number][0];
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
function deep_copy_board_array(board_array) {
    return board_array.map((r) => [...r]);
}
function deep_copy_board(board) {
    return {
        ...board,
        black: deep_copy_board_array(board.black),
        white: deep_copy_board_array(board.white),
    };
}
function add_board_history(board, board_history, status, turn_number) {
    board_history.push([deep_copy_board(board), status]);
    const put_turn_number = turn_number + 1;
    return put_turn_number;
}
//historyは消さずにboaedが1ターン戻る
function return_one_turn(board_history, turn_number) {
    if (turn_number >= 1) {
        const board = deep_copy_board(board_history[turn_number - 1][0]);
        turn_number = turn_number - 1;
        return board;
    }
    return deep_copy_board(board_history[turn_number][0]);
}
//historyは消さずにboaedが1ターン進む
function next_one_turn(board_history, turn_number) {
    if (turn_number < board_history.length - 1) {
        const board = deep_copy_board(board_history[turn_number + 1][0]);
        turn_number++;
        return board;
    }
    return deep_copy_board(board_history[turn_number][0]);
}
//そのboard以降のhistoryを消す
function delete_later_turn(board_history, turn_number) {
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
function back_to_my_turn(board_history, turn_number) {
    if (turn_number > 1) {
        const is_black_turn = board_history[turn_number][0].black_turn;
        turn_number--;
        let before_board = deep_copy_board(board_history[turn_number][0]);
        while (is_black_turn !== before_board.black_turn) {
            turn_number--;
            before_board = deep_copy_board(board_history[turn_number][0]);
        }
        return turn_number;
    }
    return turn_number;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _drawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawer */ "./src/drawer.ts");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.ts");


const main = () => {
    const canvas = document.getElementById('canvas');
    const message_holder = document.getElementById('message');
    const start_button = document.getElementById('start_button');
    const cancel_button = document.getElementById('cancel_button');
    const select_black = document.getElementById('select_black');
    const select_white = document.getElementById('select_white');
    start_button.style.display = 'none';
    cancel_button.style.display = 'none';
    const game = (0,_game__WEBPACK_IMPORTED_MODULE_1__.create_game)(canvas, message_holder, start_button, cancel_button, select_black, select_white);
    (0,_game__WEBPACK_IMPORTED_MODULE_1__.put_cancel_button)(game, game.cancel_button);
    (0,_drawer__WEBPACK_IMPORTED_MODULE_0__.draw_board)(game.board, canvas);
    (0,_game__WEBPACK_IMPORTED_MODULE_1__.start_loop)(game, canvas);
};
main();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztBQUMzQixDQUFDLENBQUM7QUFFRixJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL290aGVsbG8vLi9zcmMvYWkudHMiLCJ3ZWJwYWNrOi8vb3RoZWxsby8uL3NyYy9kcmF3ZXIudHMiLCJ3ZWJwYWNrOi8vb3RoZWxsby8uL3NyYy9nYW1lLnRzIiwid2VicGFjazovL290aGVsbG8vLi9zcmMvb3RoZWxsby50cyIsIndlYnBhY2s6Ly9vdGhlbGxvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL290aGVsbG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL290aGVsbG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vdGhlbGxvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3RoZWxsby8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbGxfdmFsaWRfbW92ZXMsIEJvYXJkIH0gZnJvbSAnLi9vdGhlbGxvJztcblxuZXhwb3J0IHR5cGUgQUlBZ2VudCA9IHtcbiAgbmV4dF9tb3ZlKGJvYXJkOiBSZWFkb25seTxCb2FyZD4pOiBbbnVtYmVyLCBudW1iZXJdO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld19yYW5kb21fcGxheWVyKCk6IEFJQWdlbnQge1xuICByZXR1cm4ge1xuICAgIG5leHRfbW92ZTogKGJvYXJkOiBSZWFkb25seTxCb2FyZD4pID0+IHtcbiAgICAgIGNvbnN0IGNhbl9wdXRfcGxhY2UgPSBhbGxfdmFsaWRfbW92ZXMoYm9hcmQpO1xuICAgICAgY29uc3QgcHV0X3BsYWNlID1cbiAgICAgICAgY2FuX3B1dF9wbGFjZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjYW5fcHV0X3BsYWNlLmxlbmd0aCldO1xuICAgICAgaWYgKHB1dF9wbGFjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBwdXRfcGxhY2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gWy0xLCAtMV07XG4gICAgfSxcbiAgfTtcbn1cbiIsImltcG9ydCB7XG4gIEJvYXJkLFxuICBjYWxjX3Njb3JlLFxuICBnZW5lcmF0ZV9pbml0aWFsX2JvYXJkLFxuICBzdHJpbmdpZnlfYm9hcmQsXG4gIHB1dF9zdG9uZSxcbiAgZmxpcF9zdG9uZSxcbiAgbW92ZV90dXJuLFxuICBwYXJzZV9jb29yZCxcbiAgaXNfdmFsaWRfbW92ZSxcbiAgYWRkX3ZlYyxcbiAganVkZ2VfZmxpcF8xZCxcbiAgRElSRUNUSU9OUyxcbiAgYWxsX3ZhbGlkX21vdmVzLFxuICBmbGlwYWJsZV9hbGxfcGxhY2VzLFxuICBuZXh0X3N0YXRlLFxuICBHYW1lc3RhdHVzLFxufSBmcm9tICcuL290aGVsbG8nO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF92ZWMoXG4gIHg6IG51bWJlcixcbiAgeTogbnVtYmVyLFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG4pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgbGV0IGhpZ2h0X21hZyA9IGNhbnZhcy5oZWlnaHQgLyAxMDA7XG4gIGxldCB3aWR0aF9tYWcgPSBjYW52YXMud2lkdGggLyAxMDA7XG4gIHJldHVybiBbeCAqIGhpZ2h0X21hZywgeSAqIHdpZHRoX21hZ107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X3NjYWwoYTogbnVtYmVyLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogbnVtYmVyIHtcbiAgbGV0IHNjYWxfbWFnID0gY2FudmFzLmhlaWdodCAvIDEwMDtcbiAgcmV0dXJuIGEgKiBzY2FsX21hZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdfZ3JpZChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZCB7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAvLyAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgbGV0IFtmaWVsZF9zcF94LCBmaWVsZF9zcF95XSA9IGNvbnZlcnRfdmVjKDAsIDAsIGNhbnZhcyk7XG4gIGxldCBmaWVsZF9zaXplX2xlbmd0aCA9IGNvbnZlcnRfc2NhbCgxMDAsIGNhbnZhcyk7XG5cbiAgaWYgKGN0eCAhPSB1bmRlZmluZWQpIHtcbiAgICAvLyDln7rnpI7jga7nm6TpnaLplbfmlrnlvaLjgavloZfjgorjgaTjgbbjgZlcbiAgICBjdHguZmlsbFN0eWxlID0gJ2dyZWVuJztcbiAgICBjdHguZmlsbFJlY3QoZmllbGRfc3BfeCwgZmllbGRfc3BfeSwgZmllbGRfc2l6ZV9sZW5ndGgsIGZpZWxkX3NpemVfbGVuZ3RoKTtcblxuICAgIC8vIOe4pue3muOCkuOBsuOBj1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdncmF5JztcbiAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhmaWVsZF9zcF94ICsgKGZpZWxkX3NpemVfbGVuZ3RoIC8gOCkgKiBpLCBmaWVsZF9zcF95KTtcbiAgICAgIGN0eC5saW5lVG8oXG4gICAgICAgIGZpZWxkX3NwX3ggKyAoZmllbGRfc2l6ZV9sZW5ndGggLyA4KSAqIGksXG4gICAgICAgIGZpZWxkX3NwX3kgKyBmaWVsZF9zaXplX2xlbmd0aFxuICAgICAgKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICAvLyDmqKrnt5rjgpLjgbLjgY9cbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnZ3JheSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oZmllbGRfc3BfeCwgZmllbGRfc3BfeSArIChmaWVsZF9zaXplX2xlbmd0aCAvIDgpICogaSk7XG4gICAgICBjdHgubGluZVRvKFxuICAgICAgICBmaWVsZF9zcF94ICsgZmllbGRfc2l6ZV9sZW5ndGgsXG4gICAgICAgIGZpZWxkX3NwX3kgKyAoZmllbGRfc2l6ZV9sZW5ndGggLyA4KSAqIGlcbiAgICAgICk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3X3BpZWNlKFxuICBpOiBudW1iZXIsXG4gIGo6IG51bWJlcixcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgY29sb3I6IGJvb2xlYW5cbik6IHZvaWQge1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgLy8gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuXG4gIGNvbnN0IFtjZW50ZXJfeCwgY2VudGVyX3ldID0gY29udmVydF92ZWMoXG4gICAgMTAwIC8gMTYgKyAoaiAqIDEwMCkgLyA4LFxuICAgIDEwMCAvIDE2ICsgKGkgKiAxMDApIC8gOCxcbiAgICBjYW52YXNcbiAgKTtcbiAgY29uc3QgciA9IGNvbnZlcnRfc2NhbCg1LCBjYW52YXMpO1xuXG4gIGlmIChjdHggIT0gdW5kZWZpbmVkKSB7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ2dyYXknO1xuICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgIGlmIChjb2xvciA9PT0gdHJ1ZSkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgIH1cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhjZW50ZXJfeCwgY2VudGVyX3ksIHIsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdfY2FuX3B1dF9wbGFjZShcbiAgaTogbnVtYmVyLFxuICBqOiBudW1iZXIsXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcbik6IHZvaWQge1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgLy8gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuXG4gIGNvbnN0IFtjZW50ZXJfeCwgY2VudGVyX3ldID0gY29udmVydF92ZWMoXG4gICAgMTAwIC8gMTYgKyAoaiAqIDEwMCkgLyA4LFxuICAgIDEwMCAvIDE2ICsgKGkgKiAxMDApIC8gOCxcbiAgICBjYW52YXNcbiAgKTtcbiAgY29uc3QgciA9IGNvbnZlcnRfc2NhbCgyLCBjYW52YXMpO1xuXG4gIGlmIChjdHggIT0gdW5kZWZpbmVkKSB7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ2dyYXknO1xuICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnZ3JheSc7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoY2VudGVyX3gsIGNlbnRlcl95LCByLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3X3BpZWNlcyhib2FyZDogQm9hcmQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgaWYgKGJvYXJkLmJsYWNrW2ldIVtqXSkge1xuICAgICAgICBkcmF3X3BpZWNlKGksIGosIGNhbnZhcywgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkLndoaXRlW2ldIVtqXSkge1xuICAgICAgICBkcmF3X3BpZWNlKGksIGosIGNhbnZhcywgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd19ib2FyZChib2FyZDogQm9hcmQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGNvbnN0IGZpZWxkX3NpemUgPSBbXG4gICAgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCxcbiAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLSAxMDAsXG4gICAgNjAwLFxuICBdLnJlZHVjZSgoYSwgYikgPT4gTWF0aC5taW4oYSwgYikpO1xuICBjYW52YXMuaGVpZ2h0ID0gZmllbGRfc2l6ZTtcbiAgY2FudmFzLndpZHRoID0gZmllbGRfc2l6ZTtcblxuICBpZiAoY3R4ICE9IHVuZGVmaW5lZCkge1xuICAgIGN0eC5jbGVhclJlY3QoXG4gICAgICAuLi5jb252ZXJ0X3ZlYygwLCAwLCBjYW52YXMpLFxuICAgICAgLi4uY29udmVydF92ZWMoMTAwLCAxMDAsIGNhbnZhcylcbiAgICApO1xuICB9XG4gIGRyYXdfZ3JpZChjYW52YXMpO1xuICBkcmF3X3BpZWNlcyhib2FyZCwgY2FudmFzKTtcbiAgYWxsX3ZhbGlkX21vdmVzKGJvYXJkKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgZHJhd19jYW5fcHV0X3BsYWNlKGVsZW1lbnRbMF0sIGVsZW1lbnRbMV0sIGNhbnZhcyk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5wdXRfY29udmVydF9wbGFjZShcbiAgdXNlcl9pbnB1dDogW251bWJlciwgbnVtYmVyXSxcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxuKTogW251bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IHVzZXJfaW5wdXRfMTAwID0gW1xuICAgICh1c2VyX2lucHV0WzBdIC8gY2FudmFzLmhlaWdodCkgKiAxMDAsXG4gICAgKHVzZXJfaW5wdXRbMV0gLyBjYW52YXMud2lkdGgpICogMTAwLFxuICBdO1xuICBjb25zdCBpID0gTWF0aC5yb3VuZCgodXNlcl9pbnB1dF8xMDBbMF0hIC0gNi43NSkgLyAxMi41KTtcbiAgY29uc3QgaiA9IE1hdGgucm91bmQoKHVzZXJfaW5wdXRfMTAwWzFdISAtIDYuNzUpIC8gMTIuNSk7XG4gIHJldHVybiBbaSwgal07XG59XG4iLCJpbXBvcnQgeyBiYXNlbmFtZSB9IGZyb20gJ3BhdGgvcG9zaXgnO1xuaW1wb3J0IHsgZ2V0U3lzdGVtRXJyb3JNYXAgfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IEFJQWdlbnQsIG5ld19yYW5kb21fcGxheWVyIH0gZnJvbSAnLi9haSc7XG5pbXBvcnQgeyBkcmF3X2JvYXJkLCBkcmF3X3BpZWNlcywgaW5wdXRfY29udmVydF9wbGFjZSB9IGZyb20gJy4vZHJhd2VyJztcbmltcG9ydCB7XG4gIEJvYXJkLFxuICBjYWxjX3Njb3JlLFxuICBnZW5lcmF0ZV9pbml0aWFsX2JvYXJkLFxuICBzdHJpbmdpZnlfYm9hcmQsXG4gIHB1dF9zdG9uZSxcbiAgZmxpcF9zdG9uZSxcbiAgbW92ZV90dXJuLFxuICBwYXJzZV9jb29yZCxcbiAgaXNfdmFsaWRfbW92ZSxcbiAgYWRkX3ZlYyxcbiAganVkZ2VfZmxpcF8xZCxcbiAgRElSRUNUSU9OUyxcbiAgYWxsX3ZhbGlkX21vdmVzLFxuICBuZXh0X3N0YXRlLFxuICBHYW1lc3RhdHVzLFxuICBmbGlwYWJsZV9hbGxfcGxhY2VzLFxuICBCb2FyZF9oaXN0b3J5LFxuICBhZGRfYm9hcmRfaGlzdG9yeSxcbiAgZGVlcF9jb3B5X2JvYXJkLFxuICBkZWxldGVfbGF0ZXJfdHVybixcbiAgZGVlcF9jb3B5X2JvYXJkX2FycmF5LFxuICBiYWNrX3RvX215X3R1cm4sXG4gIHVwZGF0ZV9oaXN0b3J5LFxufSBmcm9tICcuL290aGVsbG8nO1xuXG5leHBvcnQgdHlwZSBHYW1lID0ge1xuICBsYXN0OiBudW1iZXI7IC8vIOacgOW+jOOBq+ebpOmdouOBruabtOaWsOOCkuOBl+OBn+aZguWIuyAobXMpXG4gIGludGVydmFsOiBudW1iZXI7IC8vIChpbnRlcnZhbCltcyDmr47jgavnm6TpnaLjga7mm7TmlrDjgpLooYzjgYZcbiAgYm9hcmQ6IEJvYXJkO1xuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICB1c2VyX2lucHV0OiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDtcbiAgbWVzc2FnZV9ob2xkZXI6IEhUTUxTcGFuRWxlbWVudDtcbiAgc3RhcnRfYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgc2VsZWN0X2JsYWNrOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgc2VsZWN0X3doaXRlOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY2FuY2VsX2J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIG5vd19nYW1pbmc6IGJvb2xlYW47XG4gIGJsYWNrX3BsYXllcjogQUlBZ2VudCB8ICd1c2VyJztcbiAgd2hpdGVfcGxheWVyOiBBSUFnZW50IHwgJ3VzZXInO1xuICBib2FyZF9oaXN0b3J5OiBCb2FyZF9oaXN0b3J5O1xuICB0dXJuX251bWJlcjogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyX21vdXNlX2lucHV0X2xpc3RuZXIoZ2FtZTogR2FtZSk6IHZvaWQge1xuICBnYW1lLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgcmVjdCA9IGdhbWUuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgIGNvbnN0IFtpLCBqXSA9IGlucHV0X2NvbnZlcnRfcGxhY2UoW3gsIHldLCBnYW1lLmNhbnZhcyk7XG4gICAgZ2FtZS51c2VyX2lucHV0ID0gW2osIGldO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1dF9zdGFydF9idXR0b24oXG4gIGdhbWU6IEdhbWUsXG4gIHN0YXJ0X2J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQsXG4gIGNhbmNlbF9idXR0b246IEhUTUxCdXR0b25FbGVtZW50LFxuICBzZWxlY3RfYmxhY2s6IEhUTUxCdXR0b25FbGVtZW50LFxuICBzZWxlY3Rfd2hpdGU6IEhUTUxCdXR0b25FbGVtZW50XG4pOiB2b2lkIHtcbiAgc3RhcnRfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBnYW1lLm5vd19nYW1pbmcgPSB0cnVlO1xuICAgIGdhbWUuc3RhcnRfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfYmxhY2suc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF93aGl0ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuY2FuY2VsX2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgZ2FtZS5ib2FyZCA9IGdlbmVyYXRlX2luaXRpYWxfYm9hcmQoKTtcbiAgICBkcmF3X2JvYXJkKGdhbWUuYm9hcmQsIGdhbWUuY2FudmFzKTtcbiAgICBnYW1lLmJsYWNrX3BsYXllciA9ICd1c2VyJztcbiAgICBnYW1lLndoaXRlX3BsYXllciA9ICd1c2VyJztcbiAgICBnYW1lLm1lc3NhZ2VfaG9sZGVyLmlubmVyVGV4dCA9XG4gICAgICAn44GK5LqS44GE6aCR5by144Gj44Gm44GP44Gg44GV44GE44CCJyArXG4gICAgICAnXFxuJyArXG4gICAgICAn6buS44Gu5omL55Wq44Gn44GZ44CCJyBcbiAgfSk7XG4gIHNlbGVjdF9ibGFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgZ2FtZS5ub3dfZ2FtaW5nID0gdHJ1ZTtcbiAgICBnYW1lLnN0YXJ0X2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X2JsYWNrLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3Rfd2hpdGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLmNhbmNlbF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgIGdhbWUuYm9hcmQgPSBnZW5lcmF0ZV9pbml0aWFsX2JvYXJkKCk7XG4gICAgZHJhd19ib2FyZChnYW1lLmJvYXJkLCBnYW1lLmNhbnZhcyk7XG4gICAgZ2FtZS5ibGFja19wbGF5ZXIgPSAndXNlcic7XG4gICAgZ2FtZS53aGl0ZV9wbGF5ZXIgPSBuZXdfcmFuZG9tX3BsYXllcigpO1xuICAgIGdhbWUubWVzc2FnZV9ob2xkZXIuaW5uZXJUZXh0ID1cbiAgICAgICfjgZXjgYLjgrLjg7zjg6DjgpLlp4vjgoHjgb7jgZfjgofjgYbjgIInICsgJ1xcbicgKyAn44GC44Gq44GfKOm7kinjga7miYvnlarjgafjgZnjgIInO1xuICB9KTtcbiAgc2VsZWN0X3doaXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBnYW1lLm5vd19nYW1pbmcgPSB0cnVlO1xuICAgIGdhbWUuc3RhcnRfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfYmxhY2suc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF93aGl0ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuY2FuY2VsX2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgZ2FtZS5ib2FyZCA9IGdlbmVyYXRlX2luaXRpYWxfYm9hcmQoKTtcbiAgICBkcmF3X2JvYXJkKGdhbWUuYm9hcmQsIGdhbWUuY2FudmFzKTtcbiAgICBnYW1lLmJsYWNrX3BsYXllciA9IG5ld19yYW5kb21fcGxheWVyKCk7XG4gICAgZ2FtZS53aGl0ZV9wbGF5ZXIgPSAndXNlcic7XG4gICAgZ2FtZS5tZXNzYWdlX2hvbGRlci5pbm5lclRleHQgPVxuICAgICAgJ+OBleOBguOCsuODvOODoOOCkuWni+OCgeOBvuOBl+OCh+OBhuOAgicgKyAnXFxuJyArICfpu5Ljga7miYvnlarjgafjgZnjgIInO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1dF9jYW5jZWxfYnV0dG9uKFxuICBnYW1lOiBHYW1lLFxuICBjYW5jZWxfYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudFxuKTogdm9pZCB7XG4gIGNhbmNlbF9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGdhbWUudHVybl9udW1iZXIgPSBiYWNrX3RvX215X3R1cm4oZ2FtZS5ib2FyZF9oaXN0b3J5LCBnYW1lLnR1cm5fbnVtYmVyKTtcbiAgICBjb25zdCBib2FyZCA9IGdhbWUuYm9hcmRfaGlzdG9yeVtnYW1lLnR1cm5fbnVtYmVyXSFbMF07XG4gICAgZ2FtZS5ib2FyZCA9IGJvYXJkO1xuICAgIGRyYXdfYm9hcmQoZ2FtZS5ib2FyZCwgZ2FtZS5jYW52YXMpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9nYW1lKFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICBtZXNzYWdlX2hvbGRlcjogSFRNTFNwYW5FbGVtZW50LFxuICBzdGFydF9idXR0b246IEhUTUxCdXR0b25FbGVtZW50LFxuICBjYW5jZWxfYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCxcbiAgc2VsZWN0X2JsYWNrOiBIVE1MQnV0dG9uRWxlbWVudCxcbiAgc2VsZWN0X3doaXRlOiBIVE1MQnV0dG9uRWxlbWVudFxuKTogR2FtZSB7XG4gIGNvbnN0IGdhbWU6IEdhbWUgPSB7XG4gICAgbGFzdDogcGVyZm9ybWFuY2Uubm93KCksXG4gICAgaW50ZXJ2YWw6IDEwMDAgLyA2MCwgLy8gbXNcbiAgICBib2FyZDogZ2VuZXJhdGVfaW5pdGlhbF9ib2FyZCgpLFxuICAgIGNhbnZhczogY2FudmFzLFxuICAgIHVzZXJfaW5wdXQ6IG51bGwsXG4gICAgbWVzc2FnZV9ob2xkZXI6IG1lc3NhZ2VfaG9sZGVyLFxuICAgIHN0YXJ0X2J1dHRvbjogc3RhcnRfYnV0dG9uLFxuICAgIGNhbmNlbF9idXR0b246IGNhbmNlbF9idXR0b24sXG4gICAgc2VsZWN0X2JsYWNrOiBzZWxlY3RfYmxhY2ssXG4gICAgc2VsZWN0X3doaXRlOiBzZWxlY3Rfd2hpdGUsXG4gICAgbm93X2dhbWluZzogZmFsc2UsXG4gICAgYmxhY2tfcGxheWVyOiAndXNlcicsXG4gICAgd2hpdGVfcGxheWVyOiAndXNlcicsXG4gICAgYm9hcmRfaGlzdG9yeTogW1tnZW5lcmF0ZV9pbml0aWFsX2JvYXJkKCksIEdhbWVzdGF0dXMuT2tdXSxcbiAgICB0dXJuX251bWJlcjogMCxcbiAgfTtcbiAgbWVzc2FnZV9ob2xkZXIuaW5uZXJUZXh0ID0gJ+WvvuaIpuebuOaJi+OAgeWFiOaUu+W+jOaUu+OCkumBuOOCk+OBp+OBj+OBoOOBleOBhOOAgic7XG4gIGdhbWUuc3RhcnRfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgZ2FtZS5zZWxlY3RfYmxhY2suc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICBnYW1lLnNlbGVjdF93aGl0ZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gIHJlZ2lzdGVyX21vdXNlX2lucHV0X2xpc3RuZXIoZ2FtZSk7XG4gIHB1dF9zdGFydF9idXR0b24oXG4gICAgZ2FtZSxcbiAgICBnYW1lLnN0YXJ0X2J1dHRvbixcbiAgICBnYW1lLmNhbmNlbF9idXR0b24sXG4gICAgZ2FtZS5zZWxlY3RfYmxhY2ssXG4gICAgZ2FtZS5zZWxlY3Rfd2hpdGVcbiAgKTtcbiAgcmV0dXJuIGdhbWU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZV9zdGF0ZShnYW1lOiBHYW1lKTogYm9vbGVhbiB7XG4gIGlmIChnYW1lLmJvYXJkLmJsYWNrX3R1cm4pIHtcbiAgICBpZiAoZ2FtZS5ibGFja19wbGF5ZXIgPT09ICd1c2VyJykge1xuICAgICAgcmV0dXJuIGlucHV0X3N0YXRlKGdhbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnYW1lLnVzZXJfaW5wdXQgPSBnYW1lLmJsYWNrX3BsYXllci5uZXh0X21vdmUoZ2FtZS5ib2FyZCk7XG4gICAgICByZXR1cm4gaW5wdXRfc3RhdGUoZ2FtZSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFnYW1lLmJvYXJkLmJsYWNrX3R1cm4pIHtcbiAgICBpZiAoZ2FtZS53aGl0ZV9wbGF5ZXIgPT09ICd1c2VyJykge1xuICAgICAgcmV0dXJuIGlucHV0X3N0YXRlKGdhbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnYW1lLnVzZXJfaW5wdXQgPSBnYW1lLndoaXRlX3BsYXllci5uZXh0X21vdmUoZ2FtZS5ib2FyZCk7XG4gICAgICByZXR1cm4gaW5wdXRfc3RhdGUoZ2FtZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaW5wdXRfc3RhdGUoZ2FtZTogR2FtZSk6IGJvb2xlYW4ge1xuICBpZiAoIWdhbWUubm93X2dhbWluZyAmJiBnYW1lLnVzZXJfaW5wdXQgIT09IG51bGwpIHtcbiAgICBnYW1lLnVzZXJfaW5wdXQgPSBudWxsO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoZ2FtZS5ub3dfZ2FtaW5nICYmIGdhbWUudXNlcl9pbnB1dCAhPT0gbnVsbCkge1xuICAgIGdhbWUudHVybl9udW1iZXIgPSB1cGRhdGVfaGlzdG9yeShcbiAgICAgIGdhbWUuYm9hcmRfaGlzdG9yeSxcbiAgICAgIGdhbWUudHVybl9udW1iZXIsXG4gICAgICBnYW1lLnVzZXJfaW5wdXRcbiAgICApO1xuICAgIGNvbnN0IFtib2FyZCwgc3RhdHVzXSA9IG5leHRfc3RhdGUoZ2FtZS5ib2FyZCwgZ2FtZS51c2VyX2lucHV0KTtcbiAgICBnYW1lLnVzZXJfaW5wdXQgPSBudWxsO1xuICAgIGdhbWUuYm9hcmQgPSBib2FyZDtcbiAgICBpZiAoc3RhdHVzID09PSBHYW1lc3RhdHVzLkVycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzdGF0dXMgPT09IEdhbWVzdGF0dXMuRW5kKSB7XG4gICAgICBnYW1lLm1lc3NhZ2VfaG9sZGVyLmlubmVyVGV4dCA9IGNyZWF0ZV9tZXNzYWdlKGdhbWUsIHN0YXR1cyk7XG4gICAgICBnYW1lLm5vd19nYW1pbmcgPSBmYWxzZTtcbiAgICAgIGdhbWUuc3RhcnRfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICAgIGdhbWUuc2VsZWN0X2JsYWNrLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICAgIGdhbWUuc2VsZWN0X3doaXRlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBnYW1lLm1lc3NhZ2VfaG9sZGVyLmlubmVyVGV4dCA9IGNyZWF0ZV9tZXNzYWdlKGdhbWUsIHN0YXR1cyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVfZ2FtZShnYW1lOiBHYW1lKTogdm9pZCB7XG4gIGlmICh1cGRhdGVfc3RhdGUoZ2FtZSkpIHtcbiAgICBkcmF3X2JvYXJkKGdhbWUuYm9hcmQsIGdhbWUuY2FudmFzKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRfbG9vcChnYW1lOiBHYW1lLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZCB7XG4gIGNvbnN0IHJ1biA9IChub3c6IG51bWJlcikgPT4ge1xuICAgIGxldCBkZWx0YSA9IG5vdyAtIGdhbWUubGFzdDtcbiAgICB3aGlsZSAoZGVsdGEgPj0gZ2FtZS5pbnRlcnZhbCkge1xuICAgICAgZGVsdGEgLT0gZ2FtZS5pbnRlcnZhbDtcbiAgICAgIGdhbWUubGFzdCA9IG5vdyAtIGRlbHRhO1xuICAgICAgdXBkYXRlX2dhbWUoZ2FtZSk7XG4gICAgfVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShydW4pO1xuICB9O1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocnVuKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9tZXNzYWdlKGdhbWU6IEdhbWUsIHN0YXR1czogR2FtZXN0YXR1cyk6IHN0cmluZyB7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZS5ib2FyZDtcbiAgY29uc3QgYl9zY29yZSA9ICfpu5LvvJogJyArIGNhbGNfc2NvcmUoYm9hcmQpWzBdO1xuICBjb25zdCB3X3Njb3JlID0gJ+eZve+8miAnICsgY2FsY19zY29yZShib2FyZClbMV07XG4gIGNvbnN0IHNjb3JlID1cbiAgICBiX3Njb3JlICtcbiAgICAnXFxuJyArXG4gICAgd19zY29yZSArXG4gICAgJ1xcbidcbiAgaWYgKHN0YXR1cyA9PT0gR2FtZXN0YXR1cy5Paykge1xuICAgIGlmIChib2FyZC5ibGFja190dXJuKSB7XG4gICAgICByZXR1cm4gc2NvcmUgKyAn6buS44Gu5omL55Wq44Gn44GZJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNjb3JlICsgJ+eZveOBruaJi+eVquOBp+OBmSc7XG4gICAgfVxuICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gR2FtZXN0YXR1cy5FcnJvcikge1xuICAgIGlmIChib2FyZC5ibGFja190dXJuKSB7XG4gICAgICByZXR1cm4gc2NvcmUgKyAn44Gd44GT44Gr44Gv572u44GP44GT44Go44GM44Gn44GN44G+44Gb44KT44CC6buS44Gu5omL55Wq44Gn44GZ44CCJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNjb3JlICsgJ+OBneOBk+OBq+OBr+e9ruOBj+OBk+OBqOOBjOOBp+OBjeOBvuOBm+OCk+OAgueZveOBruaJi+eVquOBp+OBmeOAgic7XG4gICAgfVxuICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gR2FtZXN0YXR1cy5QYXNzKSB7XG4gICAgaWYgKGJvYXJkLmJsYWNrX3R1cm4pIHtcbiAgICAgIHJldHVybiBzY29yZSArICfnmb3jga/nva7jgY/jgajjgZPjgo3jgYzjgarjgYTjga7jgafjg5HjgrnjgafjgZnjgILlho3luqbpu5Ljga7miYvnlarjgafjgZnjgIInO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2NvcmUgKyAn6buS44Gv572u44GP44Go44GT44KN44GM44Gq44GE44Gu44Gn44OR44K544Gn44GZ44CC5YaN5bqm55m944Gu5omL55Wq44Gn44GZ44CCJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoc3RhdHVzID09PSBHYW1lc3RhdHVzLkVuZCkge1xuICAgIGlmIChjYWxjX3Njb3JlKGJvYXJkKVswXSA+IGNhbGNfc2NvcmUoYm9hcmQpWzFdKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBzY29yZSArXG4gICAgICAgICfjgrLjg7zjg6DntYLkuobjgafjgZnjgIInICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAn6buS44Gu5Yud44Gh44Gn44GZ44CCJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ+WGjeW6puOCsuODvOODoOOCkumWi+Wni+OBmeOCi+OBq+OBr+ODnOOCv+ODs+OCkuaKvOOBl+OBpuOBj+OBoOOBleOBhOOAgidcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChjYWxjX3Njb3JlKGJvYXJkKVswXSA8IGNhbGNfc2NvcmUoYm9hcmQpWzFdKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBzY29yZSArXG4gICAgICAgICfjgrLjg7zjg6DntYLkuobjgafjgZnjgIInICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAn55m944Gu5Yud44Gh44Gn44GZ44CCJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ+WGjeW6puOCsuODvOODoOOCkumWi+Wni+OBmeOCi+OBq+OBr+ODnOOCv+ODs+OCkuaKvOOBl+OBpuOBj+OBoOOBleOBhOOAgidcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICgoY2FsY19zY29yZShib2FyZClbMF0gPSBjYWxjX3Njb3JlKGJvYXJkKVsxXSkpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHNjb3JlICtcbiAgICAgICAgJ+OCsuODvOODoOe1guS6huOBp+OBmeOAgicgK1xuICAgICAgICAnXFxuJyArXG4gICAgICAgICflvJXjgY3liIbjgZHjgafjgZnjgIInICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAn5YaN5bqm44Ky44O844Og44KS6ZaL5aeL44GZ44KL44Gr44Gv44Oc44K/44Oz44KS5oq844GX44Gm44GP44Gg44GV44GE44CCJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICfjg5DjgrAnO1xufVxuIiwiZXhwb3J0IHR5cGUgUm93ID0gW1xuICBib29sZWFuLFxuICBib29sZWFuLFxuICBib29sZWFuLFxuICBib29sZWFuLFxuICBib29sZWFuLFxuICBib29sZWFuLFxuICBib29sZWFuLFxuICBib29sZWFuXG5dO1xuXG5leHBvcnQgdHlwZSBCb2FyZEFycmF5ID0gW1JvdywgUm93LCBSb3csIFJvdywgUm93LCBSb3csIFJvdywgUm93XTtcblxuZXhwb3J0IHR5cGUgQm9hcmQgPSB7XG4gIGJsYWNrOiBCb2FyZEFycmF5O1xuICB3aGl0ZTogQm9hcmRBcnJheTtcbiAgYmxhY2tfdHVybjogYm9vbGVhbjtcbn07XG5cbi8vZXhwb3J0IHR5cGUgQm9hcmRfaGlzdG9yeSA9IG5ldyBBcnJheSg2NCkuZmlsbChCb2FyZClcblxuLypcbmV4cG9ydCB0eXBlIEJvYXJkX2hpc3RvcnkgPVtcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG4gIEJvYXJkLFxuICBCb2FyZCxcbiAgQm9hcmQsXG5dXG4qL1xuXG5leHBvcnQgdHlwZSBCb2FyZF9oaXN0b3J5ID0gW0JvYXJkLCBHYW1lc3RhdHVzXVtdO1xuXG4vL+ebpOmdouWIneacn+WMllxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlX2luaXRpYWxfYm9hcmQoKTogQm9hcmQge1xuICBjb25zdCBibGFjayA9IG5ldyBBcnJheSg4KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBibGFja1tpXSA9IG5ldyBBcnJheSg4KS5maWxsKGZhbHNlKTtcbiAgfVxuICBibGFja1s0XVszXSA9IHRydWU7XG4gIGJsYWNrWzNdWzRdID0gdHJ1ZTtcblxuICBjb25zdCB3aGl0ZSA9IG5ldyBBcnJheSg4KTtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICB3aGl0ZVtqXSA9IG5ldyBBcnJheSg4KS5maWxsKGZhbHNlKTtcbiAgfVxuICB3aGl0ZVszXVszXSA9IHRydWU7XG4gIHdoaXRlWzRdWzRdID0gdHJ1ZTtcblxuICBjb25zdCBibGFja190dXJuID0gdHJ1ZTtcblxuICBjb25zdCBib2FyZCA9IHtcbiAgICBibGFjazogYmxhY2sgYXMgQm9hcmRBcnJheSxcbiAgICB3aGl0ZTogd2hpdGUgYXMgQm9hcmRBcnJheSxcbiAgICBibGFja190dXJuOiBibGFja190dXJuLFxuICB9O1xuXG4gIHJldHVybiBib2FyZDtcbn1cblxuLypcbi8v44Gd44Gu5pmC44Gu55uk6Z2i44KS6KGo56S6XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5X2JvYXJkKGJvYXJkOiBCb2FyZCk6IHN0cmluZyB7XG4gIGxldCBIeW91amkgPSBgICAgYSBiIGMgZCBlIGYgZyBoXG4gICAtIC0gLSAtIC0gLSAtIC1cbmA7XG4gIGJvYXJkLmJsYWNrLmZvckVhY2goKHIsIGkpID0+IHtcbiAgICBIeW91amkgPSBIeW91amkgKyBTdHJpbmcoaSArIDEpICsgJyB8JztcbiAgICByLmZvckVhY2goKGIsIGopID0+IHtcbiAgICAgIGxldCBjID0gJyAnO1xuICAgICAgaWYgKGJvYXJkLndoaXRlW2ldIVtqXSkge1xuICAgICAgICBjID0gJ28nO1xuICAgICAgfVxuICAgICAgaWYgKGIpIHtcbiAgICAgICAgYyA9ICd4JztcbiAgICAgIH1cbiAgICAgIEh5b3VqaSA9IEh5b3VqaSArIGMgKyAnfCc7XG4gICAgfSk7XG4gICAgSHlvdWppID0gSHlvdWppICsgJ1xcbic7XG4gIH0pO1xuICBIeW91amkgPSBIeW91amkgKyAnICAgLSAtIC0gLSAtIC0gLSAtJyArICdcXG4nO1xuICByZXR1cm4gSHlvdWppO1xufVxuKi9cblxuLy8gW+m7kuOBruefs+aVsCwg55m944Gu55+z5pWwXeOCkui/lOOBmVxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNfc2NvcmUoYm9hcmQ6IEJvYXJkKTogW251bWJlciwgbnVtYmVyXSB7XG4gIGxldCBiX3Njb3JlID0gMDtcbiAgbGV0IHdfc2NvcmUgPSAwO1xuXG4gIGJvYXJkLmJsYWNrLmZvckVhY2goKHIsIGkpID0+IHtcbiAgICByLmZvckVhY2goKGIsIGopID0+IHtcbiAgICAgIGlmIChiKSB7XG4gICAgICAgIGJfc2NvcmUrKztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIGJvYXJkLndoaXRlLmZvckVhY2goKHIsIGkpID0+IHtcbiAgICByLmZvckVhY2goKGIsIGopID0+IHtcbiAgICAgIGlmIChiKSB7XG4gICAgICAgIHdfc2NvcmUrKztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBbYl9zY29yZSwgd19zY29yZV07XG59XG5cbi8vW+ihjOeVquWPtywg5YiX55Wq5Y+3XeOAgemghueVquOCkuWPl+OBkeWPluOBo+OBpuOBneOBruWgtOaJgOOBq+efs+OCkue9ruOBj1xuZXhwb3J0IGZ1bmN0aW9uIHB1dF9zdG9uZShcbiAgcG9pbnQ6IFtudW1iZXIsIG51bWJlcl0sXG4gIGJsYWNrX3R1cm46IGJvb2xlYW4sXG4gIGJvYXJkOiBCb2FyZFxuKSB7XG4gIGNvbnN0IHJvd19udW1iZXIgPSBwb2ludFswXTtcbiAgY29uc3QgY29sdW1uX251bWJlciA9IHBvaW50WzFdO1xuXG4gIGlmIChcbiAgICByb3dfbnVtYmVyID49IDAgJiZcbiAgICByb3dfbnVtYmVyIDw9IDcgJiZcbiAgICBjb2x1bW5fbnVtYmVyID49IDAgJiZcbiAgICBjb2x1bW5fbnVtYmVyIDw9IDdcbiAgKSB7XG4gICAgaWYgKFxuICAgICAgIWJvYXJkLmJsYWNrW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXSAmJlxuICAgICAgIWJvYXJkLndoaXRlW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXVxuICAgICkge1xuICAgICAgaWYgKGJsYWNrX3R1cm4pIHtcbiAgICAgICAgYm9hcmQuYmxhY2tbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkLndoaXRlW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy9b6KGM55Wq5Y+3LCDliJfnlarlj7dd44KS5Y+X44GR5Y+W44Gj44Gm55+z44KS44Gy44Gj44GP44KK6L+U44GZXG5leHBvcnQgZnVuY3Rpb24gZmxpcF9zdG9uZShwb2ludDogW251bWJlciwgbnVtYmVyXSwgYm9hcmQ6IEJvYXJkKTogYm9vbGVhbiB7XG4gIGNvbnN0IHJvd19udW1iZXIgPSBwb2ludFswXTtcbiAgY29uc3QgY29sdW1uX251bWJlciA9IHBvaW50WzFdO1xuXG4gIGlmIChcbiAgICByb3dfbnVtYmVyID49IDAgJiZcbiAgICByb3dfbnVtYmVyIDw9IDcgJiZcbiAgICBjb2x1bW5fbnVtYmVyID49IDAgJiZcbiAgICBjb2x1bW5fbnVtYmVyIDw9IDdcbiAgKSB7XG4gICAgaWYgKFxuICAgICAgYm9hcmQuYmxhY2tbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdIHx8XG4gICAgICBib2FyZC53aGl0ZVtyb3dfbnVtYmVyXSFbY29sdW1uX251bWJlcl1cbiAgICApIHtcbiAgICAgIGJvYXJkLmJsYWNrW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXSA9XG4gICAgICAgICFib2FyZC5ibGFja1tyb3dfbnVtYmVyXSFbY29sdW1uX251bWJlcl07XG4gICAgICBib2FyZC53aGl0ZVtyb3dfbnVtYmVyXSFbY29sdW1uX251bWJlcl0gPVxuICAgICAgICAhYm9hcmQud2hpdGVbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8v5omL55Wq44KS6YCy44KB44KLXG5leHBvcnQgZnVuY3Rpb24gbW92ZV90dXJuKGJvYXJkOiBCb2FyZCk6IEJvYXJkIHtcbiAgYm9hcmQuYmxhY2tfdHVybiA9ICFib2FyZC5ibGFja190dXJuO1xuICByZXR1cm4gYm9hcmQ7XG59XG5cbi8vXCLoi7Hoqp7lsI/mloflrZcr5pWw5a2XXCLmg4XloLHjgpLlj5fjgZHlj5bjgaPjgaZbbnVtYmVyLCBudW1iZXJd44Gr44GZ44KLXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfY29vcmQoY29vcmRfc3RyOiBzdHJpbmcpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgaWYgKGNvb3JkX3N0ci5sZW5ndGggIT09IDIpIHtcbiAgICByZXR1cm4gWy0xLCAtMV07XG4gIH1cblxuICBjb25zdCByb3dfc3RyID0gY29vcmRfc3RyLnNwbGl0KCcnKVsxXTtcbiAgY29uc3QgY29sdW1uX3N0ciA9IGNvb3JkX3N0ci5zcGxpdCgnJylbMF07XG4gIGxldCBbcm93X251bWJlciwgY29sdW1uX251bWJlcl0gPSBbLTEsIC0xXTtcblxuICBpZiAocm93X3N0ciA9PT0gJzEnKSB7XG4gICAgcm93X251bWJlciA9IDA7XG4gIH1cbiAgaWYgKHJvd19zdHIgPT09ICcyJykge1xuICAgIHJvd19udW1iZXIgPSAxO1xuICB9XG4gIGlmIChyb3dfc3RyID09PSAnMycpIHtcbiAgICByb3dfbnVtYmVyID0gMjtcbiAgfVxuICBpZiAocm93X3N0ciA9PT0gJzQnKSB7XG4gICAgcm93X251bWJlciA9IDM7XG4gIH1cbiAgaWYgKHJvd19zdHIgPT09ICc1Jykge1xuICAgIHJvd19udW1iZXIgPSA0O1xuICB9XG4gIGlmIChyb3dfc3RyID09PSAnNicpIHtcbiAgICByb3dfbnVtYmVyID0gNTtcbiAgfVxuICBpZiAocm93X3N0ciA9PT0gJzcnKSB7XG4gICAgcm93X251bWJlciA9IDY7XG4gIH1cbiAgaWYgKHJvd19zdHIgPT09ICc4Jykge1xuICAgIHJvd19udW1iZXIgPSA3O1xuICB9XG5cbiAgaWYgKGNvbHVtbl9zdHIgPT09ICdhJykge1xuICAgIGNvbHVtbl9udW1iZXIgPSAwO1xuICB9XG4gIGlmIChjb2x1bW5fc3RyID09PSAnYicpIHtcbiAgICBjb2x1bW5fbnVtYmVyID0gMTtcbiAgfVxuICBpZiAoY29sdW1uX3N0ciA9PT0gJ2MnKSB7XG4gICAgY29sdW1uX251bWJlciA9IDI7XG4gIH1cbiAgaWYgKGNvbHVtbl9zdHIgPT09ICdkJykge1xuICAgIGNvbHVtbl9udW1iZXIgPSAzO1xuICB9XG4gIGlmIChjb2x1bW5fc3RyID09PSAnZScpIHtcbiAgICBjb2x1bW5fbnVtYmVyID0gNDtcbiAgfVxuICBpZiAoY29sdW1uX3N0ciA9PT0gJ2YnKSB7XG4gICAgY29sdW1uX251bWJlciA9IDU7XG4gIH1cbiAgaWYgKGNvbHVtbl9zdHIgPT09ICdnJykge1xuICAgIGNvbHVtbl9udW1iZXIgPSA2O1xuICB9XG4gIGlmIChjb2x1bW5fc3RyID09PSAnaCcpIHtcbiAgICBjb2x1bW5fbnVtYmVyID0gNztcbiAgfVxuXG4gIGlmIChyb3dfbnVtYmVyICE9IC0xICYmIGNvbHVtbl9udW1iZXIgIT0gLTEpIHtcbiAgICByZXR1cm4gW3Jvd19udW1iZXIsIGNvbHVtbl9udW1iZXJdO1xuICB9XG5cbiAgcmV0dXJuIFstMSwgLTFdO1xufVxuXG4vL1tudW1iZXIsIG51bWJlcl3liIbjgaDjgZFbbnVtYmVyLCBudW1iZXJd44GL44KJ56e75YuV44GZ44KLXG5leHBvcnQgZnVuY3Rpb24gYWRkX3ZlYyhcbiAgcDogcmVhZG9ubHkgW251bWJlciwgbnVtYmVyXSxcbiAgcTogcmVhZG9ubHkgW251bWJlciwgbnVtYmVyXVxuKTogW251bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IG5ld19wOiBbbnVtYmVyLCBudW1iZXJdID0gWzAsIDBdO1xuICBuZXdfcFswXSA9IHBbMF0gKyBxWzBdO1xuICBuZXdfcFsxXSA9IHBbMV0gKyBxWzFdO1xuICByZXR1cm4gbmV3X3A7XG59XG5cbmV4cG9ydCBjb25zdCBESVJFQ1RJT05TID0ge1xuICB1cDogWy0xLCAwXSxcbiAgZG93bjogWzEsIDBdLFxuICBsZWZ0OiBbMCwgLTFdLFxuICByaWdodDogWzAsIDFdLFxuICB1bDogWy0xLCAtMV0sXG4gIHVyOiBbLTEsIDFdLFxuICBkbDogWzEsIC0xXSxcbiAgZHI6IFsxLCAxXSxcbn0gYXMgY29uc3Q7XG5cbi8v5LiA5a6a5pa55ZCR44Gr44Gy44Gj44GP44KK6L+U44Gb44KL55+z44GM44GC44KL44GL5Yik5pat44GZ44KLXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VfZmxpcF8xZChcbiAgcDogcmVhZG9ubHkgW251bWJlciwgbnVtYmVyXSxcbiAgcTogcmVhZG9ubHkgW251bWJlciwgbnVtYmVyXSxcbiAgYm9hcmQ6IEJvYXJkXG4pOiBbbnVtYmVyLCBudW1iZXJdW10ge1xuICBsZXQgZmxpcGFibGVfc3RvbmVzID0gW107XG4gIGxldCBuZXdfcDogW251bWJlciwgbnVtYmVyXSA9IGFkZF92ZWMocCwgcSk7XG4gIGlmIChib2FyZC5ibGFja190dXJuKSB7XG4gICAgbGV0IHdfcm93ID0gYm9hcmQud2hpdGVbbmV3X3BbMF1dO1xuICAgIGlmICh3X3JvdyA9PSB1bmRlZmluZWQgfHwgIXdfcm93W25ld19wWzFdXSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICB3aGlsZSAod19yb3cgIT0gdW5kZWZpbmVkICYmIHdfcm93W25ld19wWzFdXSkge1xuICAgICAgZmxpcGFibGVfc3RvbmVzLnB1c2gobmV3X3ApO1xuICAgICAgbmV3X3AgPSBhZGRfdmVjKG5ld19wLCBxKTtcbiAgICAgIHdfcm93ID0gYm9hcmQud2hpdGVbbmV3X3BbMF1dO1xuICAgIH1cbiAgICBsZXQgYl9yb3cgPSBib2FyZC5ibGFja1tuZXdfcFswXV07XG4gICAgaWYgKGJfcm93ICE9IHVuZGVmaW5lZCAmJiBiX3Jvd1tuZXdfcFsxXV0pIHtcbiAgICAgIHJldHVybiBmbGlwYWJsZV9zdG9uZXM7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgYl9yb3cgPSBib2FyZC5ibGFja1tuZXdfcFswXV07XG4gICAgaWYgKGJfcm93ID09IHVuZGVmaW5lZCB8fCAhYl9yb3dbbmV3X3BbMV1dKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHdoaWxlIChiX3JvdyAhPSB1bmRlZmluZWQgJiYgYl9yb3dbbmV3X3BbMV1dKSB7XG4gICAgICBmbGlwYWJsZV9zdG9uZXMucHVzaChuZXdfcCk7XG4gICAgICBuZXdfcCA9IGFkZF92ZWMobmV3X3AsIHEpO1xuICAgICAgYl9yb3cgPSBib2FyZC5ibGFja1tuZXdfcFswXV07XG4gICAgfVxuICAgIGxldCB3X3JvdyA9IGJvYXJkLndoaXRlW25ld19wWzBdXTtcbiAgICBpZiAod19yb3cgIT0gdW5kZWZpbmVkICYmIHdfcm93W25ld19wWzFdXSkge1xuICAgICAgcmV0dXJuIGZsaXBhYmxlX3N0b25lcztcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG5cbi8vW251bWJlciwgbnVtYmVyXeOCkuWPl+OBkeWPluOBo+OBpuWQiOazleOBi+OCkuWIpOaWreOBmeOCi1xuZXhwb3J0IGZ1bmN0aW9uIGlzX3ZhbGlkX21vdmUocDogW251bWJlciwgbnVtYmVyXSwgYm9hcmQ6IEJvYXJkKTogYm9vbGVhbiB7XG4gIGxldCBqdWRnZV9udW1iZXIgPSAwO1xuXG4gIGNvbnN0IHdfcm93ID0gYm9hcmQud2hpdGVbcFswXV07XG4gIGNvbnN0IGJfcm93ID0gYm9hcmQuYmxhY2tbcFswXV07XG5cbiAgaWYgKGJfcm93ID09IHVuZGVmaW5lZCB8fCBiX3Jvd1twWzFdXSB8fCB3X3JvdyA9PSB1bmRlZmluZWQgfHwgd19yb3dbcFsxXV0pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBESVJFQ1RJT05TKSB7XG4gICAgaWYgKGp1ZGdlX2ZsaXBfMWQocCwgUmVmbGVjdC5nZXQoRElSRUNUSU9OUywgcHJvcGVydHkpLCBib2FyZCkubGVuZ3RoID4gMCkge1xuICAgICAganVkZ2VfbnVtYmVyKys7XG4gICAgfVxuICB9XG4gIGlmIChqdWRnZV9udW1iZXIgPiAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vL+WQiOazleaJi+OCkuWFqOihqOekuuOBmeOCi1xuZXhwb3J0IGZ1bmN0aW9uIGFsbF92YWxpZF9tb3Zlcyhib2FyZDogQm9hcmQpOiBbbnVtYmVyLCBudW1iZXJdW10ge1xuICBjb25zdCBjYW5fcHV0X3BsYWNlOiBbbnVtYmVyLCBudW1iZXJdW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgaWYgKGlzX3ZhbGlkX21vdmUoW2ksIGpdLCBib2FyZCkpIHtcbiAgICAgICAgY2FuX3B1dF9wbGFjZS5wdXNoKFtpLCBqXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjYW5fcHV0X3BsYWNlO1xufVxuXG4vL+OBneOBruaZguOBruebpOmdouOCkuihqOekuiDigLvjgZ/jgaDjgZfjgYrjgZHjgovloLTmiYDjgpIt44Gn6KGo56S6XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5X2JvYXJkKGJvYXJkOiBCb2FyZCk6IHN0cmluZyB7XG4gIGxldCBjYW5fcHV0X3BsYWNlOiBbbnVtYmVyLCBudW1iZXJdW10gPSBhbGxfdmFsaWRfbW92ZXMoYm9hcmQpO1xuICBsZXQgSHlvdWppID0gYCAgIGEgYiBjIGQgZSBmIGcgaFxuICAgLSAtIC0gLSAtIC0gLSAtXG5gO1xuICBib2FyZC5ibGFjay5mb3JFYWNoKChyLCBpKSA9PiB7XG4gICAgSHlvdWppID0gSHlvdWppICsgU3RyaW5nKGkgKyAxKSArICcgfCc7XG4gICAgci5mb3JFYWNoKChiLCBqKSA9PiB7XG4gICAgICBsZXQgYyA9ICcgJztcbiAgICAgIGlmIChib2FyZC53aGl0ZVtpXSFbal0pIHtcbiAgICAgICAgYyA9ICdvJztcbiAgICAgIH1cbiAgICAgIGlmIChiKSB7XG4gICAgICAgIGMgPSAneCc7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY2FuX3B1dF9wbGFjZSkge1xuICAgICAgICBpZiAoZWxlbWVudFswXSA9PT0gaSAmJiBlbGVtZW50WzFdID09PSBqKSB7XG4gICAgICAgICAgYyA9ICctJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgSHlvdWppID0gSHlvdWppICsgYyArICd8JztcbiAgICB9KTtcbiAgICBIeW91amkgPSBIeW91amkgKyAnXFxuJztcbiAgfSk7XG4gIEh5b3VqaSA9IEh5b3VqaSArICcgICAtIC0gLSAtIC0gLSAtIC0nICsgJ1xcbic7XG4gIHJldHVybiBIeW91amk7XG59XG5cbi8v44Gy44Gj44GP44KK6L+U44Gb44KL44Go44GT44KN44KS44GZ44G544Gm44Oq44K544OI5YyW44GZ44KLXG5leHBvcnQgZnVuY3Rpb24gZmxpcGFibGVfYWxsX3BsYWNlcyhcbiAgcDogW251bWJlciwgbnVtYmVyXSxcbiAgYm9hcmQ6IEJvYXJkXG4pOiBbbnVtYmVyLCBudW1iZXJdW10ge1xuICBsZXQgY2FuX2ZsaXBfcGxhY2VzOiBbbnVtYmVyLCBudW1iZXJdW10gPSBbXTtcbiAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBESVJFQ1RJT05TKSB7XG4gICAgY29uc3QgcTogW251bWJlciwgbnVtYmVyXSA9IFJlZmxlY3QuZ2V0KERJUkVDVElPTlMsIHByb3BlcnR5KTtcbiAgICBjYW5fZmxpcF9wbGFjZXMgPSBjYW5fZmxpcF9wbGFjZXMuY29uY2F0KGp1ZGdlX2ZsaXBfMWQocCwgcSwgYm9hcmQpKTtcbiAgfVxuICByZXR1cm4gY2FuX2ZsaXBfcGxhY2VzO1xufVxuXG5leHBvcnQgZW51bSBHYW1lc3RhdHVzIHtcbiAgT2ssXG4gIFBhc3MsXG4gIEVuZCxcbiAgRXJyb3IsXG59XG5cbi8v54++5Zyo44Gu55uk6Z2i44Go5qyh44Gu552A5omL44GM5LiO44GI44KJ44KM44Gm5qyh44Gu55uk6Z2i44KS6L+U44GZXG5leHBvcnQgZnVuY3Rpb24gbmV4dF9zdGF0ZShcbiAgaW5wdXRfYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPixcbiAgcDogW251bWJlciwgbnVtYmVyXVxuKTogW0JvYXJkLCBHYW1lc3RhdHVzXSB7XG4gIGNvbnN0IGJvYXJkID0gZGVlcF9jb3B5X2JvYXJkKGlucHV0X2JvYXJkKTtcbiAgaWYgKGlzX3ZhbGlkX21vdmUocCwgYm9hcmQpICYmIHB1dF9zdG9uZShwLCBib2FyZC5ibGFja190dXJuLCBib2FyZCkpIHtcbiAgICBjb25zdCBjYW5fZmxpcF9wbGFjZXMgPSBmbGlwYWJsZV9hbGxfcGxhY2VzKHAsIGJvYXJkKTtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnRzIG9mIGNhbl9mbGlwX3BsYWNlcykge1xuICAgICAgZmxpcF9zdG9uZShlbGVtZW50cywgYm9hcmQpO1xuICAgIH1cblxuICAgIG1vdmVfdHVybihib2FyZCk7XG5cbiAgICBpZiAoYWxsX3ZhbGlkX21vdmVzKGJvYXJkKS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gW2JvYXJkLCBHYW1lc3RhdHVzLk9rXTtcbiAgICB9XG5cbiAgICBpZiAoYWxsX3ZhbGlkX21vdmVzKGJvYXJkKS5sZW5ndGggPT09IDApIHtcbiAgICAgIG1vdmVfdHVybihib2FyZCk7XG4gICAgICBpZiAoYWxsX3ZhbGlkX21vdmVzKGJvYXJkKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtib2FyZCwgR2FtZXN0YXR1cy5FbmRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtib2FyZCwgR2FtZXN0YXR1cy5QYXNzXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtib2FyZCwgR2FtZXN0YXR1cy5FcnJvcl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVfaGlzdG9yeShcbiAgYm9hcmRfaGlzdG9yeTogQm9hcmRfaGlzdG9yeSxcbiAgdHVybl9udW1iZXI6IG51bWJlcixcbiAgdXNlcl9pbnB1dDogW251bWJlciwgbnVtYmVyXVxuKTogbnVtYmVyIHtcbiAgY29uc3QgYm9hcmQgPSBib2FyZF9oaXN0b3J5W3R1cm5fbnVtYmVyXSFbMF07XG4gIGRlbGV0ZV9sYXRlcl90dXJuKGJvYXJkX2hpc3RvcnksIHR1cm5fbnVtYmVyKTtcbiAgY29uc3QgW25leHRfYm9hcmQsIHN0YXR1c10gPSBuZXh0X3N0YXRlKGJvYXJkLCB1c2VyX2lucHV0KTtcbiAgYm9hcmRfaGlzdG9yeS5wdXNoKFtuZXh0X2JvYXJkLCBzdGF0dXNdKTtcbiAgcmV0dXJuIHR1cm5fbnVtYmVyICsgMTtcbn1cblxuLy/nj77lnKjjga7nm6TpnaLjgajmrKHjga7nnYDmiYvjgYzkuI7jgYjjgonjgozjgabmrKHjga7nm6TpnaLjgpJoaXN0b3J544Gr5L+d5a2Y44GZ44KLXG4vKlxuZXhwb3J0IGZ1bmN0aW9uIGtlZXBfbmV4dF9zdGF0ZShcbiAgYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPixcbiAgcDogW251bWJlciwgbnVtYmVyXSxcbiAgYm9hcmRfaGlzdG9yeTogQm9hcmRfaGlzdG9yeSxcbiAgdHVybl9udW1iZXI6IG51bWJlclxuKTpudW1iZXJ7XG4gIGxldCB0ZW1wb3JhcnlfYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoYm9hcmRfaGlzdG9yeVt0dXJuX251bWJlcl0hWzBdKVxuICBpZiAoaXNfdmFsaWRfbW92ZShwLCB0ZW1wb3JhcnlfYm9hcmQpICYmIHB1dF9zdG9uZShwLCBib2FyZC5ibGFja190dXJuLCB0ZW1wb3JhcnlfYm9hcmQpKSB7XG4gICAgY29uc3QgY2FuX2ZsaXBfcGxhY2VzID0gZmxpcGFibGVfYWxsX3BsYWNlcyhwLCBib2FyZCk7XG4gICAgZm9yIChjb25zdCBlbGVtZW50cyBvZiBjYW5fZmxpcF9wbGFjZXMpIHtcbiAgICAgIGZsaXBfc3RvbmUoZWxlbWVudHMsIHRlbXBvcmFyeV9ib2FyZCk7XG4gICAgfVxuICAgIHRlbXBvcmFyeV9ib2FyZCA9IG1vdmVfdHVybih0ZW1wb3JhcnlfYm9hcmQpO1xuICAgIGlmIChhbGxfdmFsaWRfbW92ZXModGVtcG9yYXJ5X2JvYXJkKS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBwdXRfbnVtYmVyID0gYWRkX2JvYXJkX2hpc3RvcnkoZGVlcF9jb3B5X2JvYXJkKHRlbXBvcmFyeV9ib2FyZCksIGJvYXJkX2hpc3RvcnksIEdhbWVzdGF0dXMuT2ssIHR1cm5fbnVtYmVyKTtcbiAgICAgIHJldHVybiBwdXRfbnVtYmVyXG4gICAgfVxuXG4gICAgaWYgKGFsbF92YWxpZF9tb3Zlcyh0ZW1wb3JhcnlfYm9hcmQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGVtcG9yYXJ5X2JvYXJkID0gbW92ZV90dXJuKHRlbXBvcmFyeV9ib2FyZCk7XG4gICAgICBpZiAoYWxsX3ZhbGlkX21vdmVzKHRlbXBvcmFyeV9ib2FyZCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHB1dF9udW1iZXIgPSBhZGRfYm9hcmRfaGlzdG9yeShkZWVwX2NvcHlfYm9hcmQodGVtcG9yYXJ5X2JvYXJkKSwgYm9hcmRfaGlzdG9yeSwgR2FtZXN0YXR1cy5FbmQsIHR1cm5fbnVtYmVyKTtcbiAgICAgICAgcmV0dXJuIHB1dF9udW1iZXJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHB1dF9udW1iZXIgPSBhZGRfYm9hcmRfaGlzdG9yeShkZWVwX2NvcHlfYm9hcmQodGVtcG9yYXJ5X2JvYXJkKSwgYm9hcmRfaGlzdG9yeSwgR2FtZXN0YXR1cy5QYXNzLCB0dXJuX251bWJlcik7XG4gICAgICAgIHJldHVybiBwdXRfbnVtYmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHVybl9udW1iZXJcbn1cbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBkZWVwX2NvcHlfYm9hcmRfYXJyYXkoXG4gIGJvYXJkX2FycmF5OiBSZWFkb25seTxCb2FyZEFycmF5PlxuKTogQm9hcmRBcnJheSB7XG4gIHJldHVybiBib2FyZF9hcnJheS5tYXAoKHIpID0+IFsuLi5yXSkgYXMgQm9hcmRBcnJheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBfY29weV9ib2FyZChib2FyZDogUmVhZG9ubHk8Qm9hcmQ+KTogQm9hcmQge1xuICByZXR1cm4ge1xuICAgIC4uLmJvYXJkLFxuICAgIGJsYWNrOiBkZWVwX2NvcHlfYm9hcmRfYXJyYXkoYm9hcmQuYmxhY2spLFxuICAgIHdoaXRlOiBkZWVwX2NvcHlfYm9hcmRfYXJyYXkoYm9hcmQud2hpdGUpLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkX2JvYXJkX2hpc3RvcnkoXG4gIGJvYXJkOiBSZWFkb25seTxCb2FyZD4sXG4gIGJvYXJkX2hpc3Rvcnk6IEJvYXJkX2hpc3RvcnksXG4gIHN0YXR1czogR2FtZXN0YXR1cyxcbiAgdHVybl9udW1iZXI6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgYm9hcmRfaGlzdG9yeS5wdXNoKFtkZWVwX2NvcHlfYm9hcmQoYm9hcmQpLCBzdGF0dXNdKTtcbiAgY29uc3QgcHV0X3R1cm5fbnVtYmVyID0gdHVybl9udW1iZXIgKyAxO1xuICByZXR1cm4gcHV0X3R1cm5fbnVtYmVyO1xufVxuXG4vL2hpc3Rvcnnjga/mtojjgZXjgZrjgatib2FlZOOBjDHjgr/jg7zjg7PmiLvjgotcbmV4cG9ydCBmdW5jdGlvbiByZXR1cm5fb25lX3R1cm4oXG4gIGJvYXJkX2hpc3Rvcnk6IEJvYXJkX2hpc3RvcnksXG4gIHR1cm5fbnVtYmVyOiBudW1iZXJcbik6IEJvYXJkIHtcbiAgaWYgKHR1cm5fbnVtYmVyID49IDEpIHtcbiAgICBjb25zdCBib2FyZCA9IGRlZXBfY29weV9ib2FyZChib2FyZF9oaXN0b3J5W3R1cm5fbnVtYmVyIC0gMV0hWzBdKTtcbiAgICB0dXJuX251bWJlciA9IHR1cm5fbnVtYmVyIC0gMTtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cbiAgcmV0dXJuIGRlZXBfY29weV9ib2FyZChib2FyZF9oaXN0b3J5W3R1cm5fbnVtYmVyXSFbMF0pO1xufVxuXG4vL2hpc3Rvcnnjga/mtojjgZXjgZrjgatib2FlZOOBjDHjgr/jg7zjg7PpgLLjgoBcbmV4cG9ydCBmdW5jdGlvbiBuZXh0X29uZV90dXJuKFxuICBib2FyZF9oaXN0b3J5OiBCb2FyZF9oaXN0b3J5LFxuICB0dXJuX251bWJlcjogbnVtYmVyXG4pOiBCb2FyZCB7XG4gIGlmICh0dXJuX251bWJlciA8IGJvYXJkX2hpc3RvcnkubGVuZ3RoIC0gMSkge1xuICAgIGNvbnN0IGJvYXJkID0gZGVlcF9jb3B5X2JvYXJkKGJvYXJkX2hpc3RvcnlbdHVybl9udW1iZXIgKyAxXSFbMF0pO1xuICAgIHR1cm5fbnVtYmVyKys7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG4gIHJldHVybiBkZWVwX2NvcHlfYm9hcmQoYm9hcmRfaGlzdG9yeVt0dXJuX251bWJlcl0hWzBdKTtcbn1cblxuLy/jgZ3jga5ib2FyZOS7pemZjeOBrmhpc3RvcnnjgpLmtojjgZlcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVfbGF0ZXJfdHVybihcbiAgYm9hcmRfaGlzdG9yeTogQm9hcmRfaGlzdG9yeSxcbiAgdHVybl9udW1iZXI6IG51bWJlclxuKTogQm9hcmRfaGlzdG9yeSB7XG4gIGlmIChib2FyZF9oaXN0b3J5Lmxlbmd0aCA+IDEpIHtcbiAgICBjb25zdCBudW1iZXJfb2ZfZGVsZXRlID0gYm9hcmRfaGlzdG9yeS5sZW5ndGggLSB0dXJuX251bWJlciAtIDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJfb2ZfZGVsZXRlOyBpKyspIHtcbiAgICAgIGJvYXJkX2hpc3RvcnkucG9wKCk7XG4gICAgfVxuICAgIHJldHVybiBib2FyZF9oaXN0b3J5O1xuICB9XG4gIHJldHVybiBib2FyZF9oaXN0b3J5O1xufVxuXG4vL+WJjeWbnuOBruOBneOBruiJsuOBruOCv+ODvOODs+OBvuOBp+aIu+OCi1xuZXhwb3J0IGZ1bmN0aW9uIGJhY2tfdG9fbXlfdHVybihcbiAgYm9hcmRfaGlzdG9yeTogQm9hcmRfaGlzdG9yeSxcbiAgdHVybl9udW1iZXI6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgaWYgKHR1cm5fbnVtYmVyID4gMSkge1xuICAgIGNvbnN0IGlzX2JsYWNrX3R1cm4gPSBib2FyZF9oaXN0b3J5W3R1cm5fbnVtYmVyXSFbMF0uYmxhY2tfdHVybjtcbiAgICB0dXJuX251bWJlci0tO1xuICAgIGxldCBiZWZvcmVfYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoYm9hcmRfaGlzdG9yeVt0dXJuX251bWJlcl0hWzBdKTtcbiAgICB3aGlsZSAoaXNfYmxhY2tfdHVybiAhPT0gYmVmb3JlX2JvYXJkLmJsYWNrX3R1cm4pIHtcbiAgICAgIHR1cm5fbnVtYmVyLS07XG4gICAgICBiZWZvcmVfYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoYm9hcmRfaGlzdG9yeVt0dXJuX251bWJlcl0hWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHR1cm5fbnVtYmVyO1xuICB9XG4gIHJldHVybiB0dXJuX251bWJlcjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbmV3X3JhbmRvbV9wbGF5ZXIgfSBmcm9tICcuL2FpJztcbmltcG9ydCB7IGRyYXdfYm9hcmQsIGRyYXdfZ3JpZCwgZHJhd19waWVjZSwgZHJhd19waWVjZXMgfSBmcm9tICcuL2RyYXdlcic7XG5pbXBvcnQgeyBjcmVhdGVfZ2FtZSwgcHV0X2NhbmNlbF9idXR0b24sIHN0YXJ0X2xvb3AgfSBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHtcbiAgQm9hcmQsXG4gIGNhbGNfc2NvcmUsXG4gIGdlbmVyYXRlX2luaXRpYWxfYm9hcmQsXG4gIHN0cmluZ2lmeV9ib2FyZCxcbiAgcHV0X3N0b25lLFxuICBmbGlwX3N0b25lLFxuICBtb3ZlX3R1cm4sXG4gIHBhcnNlX2Nvb3JkLFxuICBpc192YWxpZF9tb3ZlLFxuICBhZGRfdmVjLFxuICBqdWRnZV9mbGlwXzFkLFxuICBESVJFQ1RJT05TLFxuICBhbGxfdmFsaWRfbW92ZXMsXG4gIG5leHRfc3RhdGUsXG4gIEdhbWVzdGF0dXMsXG4gIGZsaXBhYmxlX2FsbF9wbGFjZXMsXG59IGZyb20gJy4vb3RoZWxsbyc7XG5cbmNvbnN0IG1haW4gPSAoKSA9PiB7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgY29uc3QgbWVzc2FnZV9ob2xkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgY29uc3Qgc3RhcnRfYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgJ3N0YXJ0X2J1dHRvbidcbiAgKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3QgY2FuY2VsX2J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICdjYW5jZWxfYnV0dG9uJ1xuICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICBjb25zdCBzZWxlY3RfYmxhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnc2VsZWN0X2JsYWNrJ1xuICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICBjb25zdCBzZWxlY3Rfd2hpdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnc2VsZWN0X3doaXRlJ1xuICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG4gIHN0YXJ0X2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBjYW5jZWxfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgY29uc3QgZ2FtZSA9IGNyZWF0ZV9nYW1lKFxuICAgIGNhbnZhcyxcbiAgICBtZXNzYWdlX2hvbGRlcixcbiAgICBzdGFydF9idXR0b24sXG4gICAgY2FuY2VsX2J1dHRvbixcbiAgICBzZWxlY3RfYmxhY2ssXG4gICAgc2VsZWN0X3doaXRlXG4gICk7XG4gIHB1dF9jYW5jZWxfYnV0dG9uKGdhbWUsIGdhbWUuY2FuY2VsX2J1dHRvbik7XG4gIGRyYXdfYm9hcmQoZ2FtZS5ib2FyZCwgY2FudmFzKTtcbiAgc3RhcnRfbG9vcChnYW1lLCBjYW52YXMpO1xufTtcblxubWFpbigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9