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
/* harmony export */   "new_random_player": () => (/* binding */ new_random_player),
/* harmony export */   "new_weak_agent": () => (/* binding */ new_weak_agent),
/* harmony export */   "minimax_agent": () => (/* binding */ minimax_agent),
/* harmony export */   "alphabeta_agent": () => (/* binding */ alphabeta_agent)
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
function new_weak_agent() {
    return {
        next_move: weak_agent_move,
    };
}
function weak_agent_move(board) {
    const can_put_place = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.all_valid_moves)(board);
    const is_black_turn = board.black_turn;
    const scores = [];
    for (const input_place of can_put_place) {
        const temporary_board = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.deep_copy_board)(board);
        const [next_board, status] = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.next_state)(temporary_board, input_place);
        const [b_score, w_score] = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.calc_score)(next_board);
        if (is_black_turn) {
            scores.push([b_score, input_place]);
        }
        else {
            scores.push([w_score, input_place]);
        }
    }
    scores.sort(function (a, b) {
        if (a[0] > b[0])
            return -1;
        if (a[0] < b[0])
            return 1;
        return 0;
    });
    return scores[0][1];
}
function minimax_agent() {
    return {
        next_move: minimax_move,
    };
}
function minimax_move(board) {
    const score = eval_by_search(board, 6);
    return score[1];
}
function eval_by_search(board, depth) {
    if (depth <= 1) {
        return stone_count_for_eval(board);
    }
    else {
        const can_put_place = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.all_valid_moves)(board);
        let best_score = -64;
        let best_move = [0, 0];
        for (const input_place of can_put_place) {
            const temporary_board = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.deep_copy_board)(board);
            const [next_board, status] = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.next_state)(temporary_board, input_place);
            if (status !== _othello__WEBPACK_IMPORTED_MODULE_0__.Gamestatus.Pass) {
                const score = eval_by_search(next_board, depth - 1);
                if (-score[0] > best_score) {
                    [best_score, best_move] = [-score[0], input_place];
                }
            }
            else {
                const score = eval_by_search(next_board, depth - 2);
                if (score[0] > best_score) {
                    [best_score, best_move] = [score[0], input_place];
                }
            }
        }
        return [best_score, best_move];
    }
}
function alphabeta_agent() {
    return {
        next_move: alphabeta_move,
    };
}
function alphabeta_move(board) {
    const score = alphabeta_eval_by_search(board, 6, 100000000, -100000000);
    return score[1];
}
function alphabeta_eval_by_search(board, depth, max_score, min_score) {
    if (depth <= 1) {
        return stone_count_for_eval(board);
    }
    else {
        const can_put_place = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.all_valid_moves)(board);
        let best_score = -100000000;
        let best_move = [0, 0];
        if ((0,_othello__WEBPACK_IMPORTED_MODULE_0__.all_valid_moves)(board).length <= 0) {
            const cannot_put_board = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.deep_copy_board)(board);
            (0,_othello__WEBPACK_IMPORTED_MODULE_0__.move_turn)(cannot_put_board);
            return alphabeta_eval_by_search(cannot_put_board, depth - 1, -min_score, -max_score);
        }
        for (const input_place of can_put_place) {
            const temporary_board = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.deep_copy_board)(board);
            const next_board = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.next_state_for_minimax)(temporary_board, input_place);
            const score = alphabeta_eval_by_search(next_board, depth - 1, -best_score, -max_score);
            if (-score[0] > max_score) {
                return [-score[0], input_place];
            }
            if (-score[0] > best_score) {
                [best_score, best_move] = [-score[0], input_place];
            }
        }
        return [best_score, best_move];
    }
}
function stone_count_for_eval(board) {
    const is_black_turn = board.black_turn;
    const [b_score, w_score] = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.calc_score)(board);
    if (is_black_turn) {
        return [b_score, [0, 0]];
    }
    else {
        return [w_score, [0, 0]];
    }
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
function put_start_button(game, start_button, cancel_button, select_black, select_white, select_AIbattle) {
    start_button.addEventListener('click', (e) => {
        game.now_gaming = true;
        game.start_button.style.display = 'none';
        game.select_black.style.display = 'none';
        game.select_white.style.display = 'none';
        game.select_AIbattle.style.display = 'none';
        game.cancel_button.style.display = 'inline';
        game.board = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.generate_initial_board)();
        (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.draw_board)(game.board, game.canvas);
        game.black_player = 'user';
        game.white_player = 'user';
        game.message_holder.innerText =
            'お互い頑張ってください。' + '\n' + '黒の手番です。';
    });
    select_black.addEventListener('click', (e) => {
        game.now_gaming = true;
        game.start_button.style.display = 'none';
        game.select_black.style.display = 'none';
        game.select_white.style.display = 'none';
        game.select_AIbattle.style.display = 'none';
        game.cancel_button.style.display = 'inline';
        game.board = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.generate_initial_board)();
        (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.draw_board)(game.board, game.canvas);
        game.black_player = 'user';
        game.white_player = (0,_ai__WEBPACK_IMPORTED_MODULE_0__.alphabeta_agent)();
        game.message_holder.innerText =
            'さあゲームを始めましょう。' + '\n' + 'あなた(黒)の手番です。';
    });
    select_white.addEventListener('click', (e) => {
        game.now_gaming = true;
        game.start_button.style.display = 'none';
        game.select_black.style.display = 'none';
        game.select_white.style.display = 'none';
        game.select_AIbattle.style.display = 'none';
        game.cancel_button.style.display = 'inline';
        game.board = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.generate_initial_board)();
        (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.draw_board)(game.board, game.canvas);
        game.black_player = (0,_ai__WEBPACK_IMPORTED_MODULE_0__.alphabeta_agent)();
        game.white_player = 'user';
        game.message_holder.innerText =
            'さあゲームを始めましょう。' + '\n' + '黒の手番です。';
    });
    select_AIbattle.addEventListener('click', (e) => {
        game.now_gaming = true;
        game.start_button.style.display = 'none';
        game.select_black.style.display = 'none';
        game.select_white.style.display = 'none';
        game.select_AIbattle.style.display = 'none';
        game.cancel_button.style.display = 'inline';
        game.board = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.generate_initial_board)();
        (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.draw_board)(game.board, game.canvas);
        game.black_player = (0,_ai__WEBPACK_IMPORTED_MODULE_0__.alphabeta_agent)();
        game.white_player = (0,_ai__WEBPACK_IMPORTED_MODULE_0__.alphabeta_agent)();
        game.message_holder.innerText = '黒の手番です。';
    });
}
function put_cancel_button(game, cancel_button) {
    cancel_button.addEventListener('click', (e) => {
        game.turn_number = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.back_to_my_turn)(game.board_history, game.turn_number);
        const board = game.board_history[game.turn_number][0];
        game.board = board;
        game.now_gaming = true;
        game.start_button.style.display = 'none';
        game.select_black.style.display = 'none';
        game.select_white.style.display = 'none';
        game.select_AIbattle.style.display = 'none';
        game.message_holder.innerText = create_message(game, _othello__WEBPACK_IMPORTED_MODULE_2__.Gamestatus.Ok);
        (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.draw_board)(game.board, game.canvas);
    });
}
function create_game(canvas, message_holder, start_button, cancel_button, select_black, select_white, select_AIbattle) {
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
        select_AIbattle: select_AIbattle,
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
    game.select_AIbattle.style.display = 'inline';
    register_mouse_input_listner(game);
    put_start_button(game, game.start_button, game.cancel_button, game.select_black, game.select_white, game.select_AIbattle);
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
            game.select_AIbattle.style.display = 'inline';
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
    const score = b_score + '\n' + w_score + '\n';
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
function weak_agent_move() {
    throw new Error('Function not implemented.');
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
/* harmony export */   "next_state_for_minimax": () => (/* binding */ next_state_for_minimax),
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
                move_turn(board);
                return [board, Gamestatus.End];
            }
            else {
                return [board, Gamestatus.Pass];
            }
        }
    }
    return [board, Gamestatus.Error];
}
function next_state_for_minimax(input_board, p) {
    const board = deep_copy_board(input_board);
    if (is_valid_move(p, board) && put_stone(p, board.black_turn, board)) {
        const can_flip_places = flipable_all_places(p, board);
        for (const elements of can_flip_places) {
            flip_stone(elements, board);
        }
        move_turn(board);
        return board;
    }
    move_turn(board);
    return board;
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
    const select_AIbattle = document.getElementById('select_AIbattle');
    start_button.style.display = 'none';
    cancel_button.style.display = 'none';
    const game = (0,_game__WEBPACK_IMPORTED_MODULE_1__.create_game)(canvas, message_holder, start_button, cancel_button, select_black, select_white, select_AIbattle);
    (0,_game__WEBPACK_IMPORTED_MODULE_1__.put_cancel_button)(game, game.cancel_button);
    (0,_drawer__WEBPACK_IMPORTED_MODULE_0__.draw_board)(game.board, canvas);
    (0,_game__WEBPACK_IMPORTED_MODULE_1__.start_loop)(game, canvas);
};
main();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQ1osWUFBWSxFQUNaLGVBQWUsQ0FDaEIsQ0FBQztJQUNGLHdEQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUMsbURBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLGlEQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQztBQUVGLElBQUksRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3RoZWxsby8uL3NyYy9haS50cyIsIndlYnBhY2s6Ly9vdGhlbGxvLy4vc3JjL2RyYXdlci50cyIsIndlYnBhY2s6Ly9vdGhlbGxvLy4vc3JjL2dhbWUudHMiLCJ3ZWJwYWNrOi8vb3RoZWxsby8uL3NyYy9vdGhlbGxvLnRzIiwid2VicGFjazovL290aGVsbG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3RoZWxsby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3RoZWxsby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL290aGVsbG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vdGhlbGxvLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGFsbF92YWxpZF9tb3ZlcyxcbiAgQm9hcmQsXG4gIGNhbGNfc2NvcmUsXG4gIGRlZXBfY29weV9ib2FyZCxcbiAgZGVlcF9jb3B5X2JvYXJkX2FycmF5LFxuICBHYW1lc3RhdHVzLFxuICBtb3ZlX3R1cm4sXG4gIG5leHRfc3RhdGUsXG4gIG5leHRfc3RhdGVfZm9yX21pbmltYXgsXG59IGZyb20gJy4vb3RoZWxsbyc7XG5cbmV4cG9ydCB0eXBlIEFJQWdlbnQgPSB7XG4gIG5leHRfbW92ZShib2FyZDogUmVhZG9ubHk8Qm9hcmQ+KTogW251bWJlciwgbnVtYmVyXTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdfcmFuZG9tX3BsYXllcigpOiBBSUFnZW50IHtcbiAgcmV0dXJuIHtcbiAgICBuZXh0X21vdmU6IChib2FyZDogUmVhZG9ubHk8Qm9hcmQ+KSA9PiB7XG4gICAgICBjb25zdCBjYW5fcHV0X3BsYWNlID0gYWxsX3ZhbGlkX21vdmVzKGJvYXJkKTtcbiAgICAgIGNvbnN0IHB1dF9wbGFjZSA9XG4gICAgICAgIGNhbl9wdXRfcGxhY2VbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2FuX3B1dF9wbGFjZS5sZW5ndGgpXTtcbiAgICAgIGlmIChwdXRfcGxhY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gcHV0X3BsYWNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFstMSwgLTFdO1xuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdfd2Vha19hZ2VudCgpOiBBSUFnZW50IHtcbiAgcmV0dXJuIHtcbiAgICBuZXh0X21vdmU6IHdlYWtfYWdlbnRfbW92ZSxcbiAgfTtcbn1cblxudHlwZSBTY29yZSA9IFtudW1iZXIsIFtudW1iZXIsIG51bWJlcl1dO1xuXG5mdW5jdGlvbiB3ZWFrX2FnZW50X21vdmUoYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPik6IFtudW1iZXIsIG51bWJlcl0ge1xuICBjb25zdCBjYW5fcHV0X3BsYWNlID0gYWxsX3ZhbGlkX21vdmVzKGJvYXJkKTtcbiAgY29uc3QgaXNfYmxhY2tfdHVybiA9IGJvYXJkLmJsYWNrX3R1cm47XG4gIGNvbnN0IHNjb3JlczogU2NvcmVbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGlucHV0X3BsYWNlIG9mIGNhbl9wdXRfcGxhY2UpIHtcbiAgICBjb25zdCB0ZW1wb3JhcnlfYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoYm9hcmQpO1xuICAgIGNvbnN0IFtuZXh0X2JvYXJkLCBzdGF0dXNdID0gbmV4dF9zdGF0ZSh0ZW1wb3JhcnlfYm9hcmQsIGlucHV0X3BsYWNlKTtcbiAgICBjb25zdCBbYl9zY29yZSwgd19zY29yZV0gPSBjYWxjX3Njb3JlKG5leHRfYm9hcmQpO1xuICAgIGlmIChpc19ibGFja190dXJuKSB7XG4gICAgICBzY29yZXMucHVzaChbYl9zY29yZSwgaW5wdXRfcGxhY2VdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NvcmVzLnB1c2goW3dfc2NvcmUsIGlucHV0X3BsYWNlXSk7XG4gICAgfVxuICB9XG4gIHNjb3Jlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgaWYgKGFbMF0gPiBiWzBdKSByZXR1cm4gLTE7XG4gICAgaWYgKGFbMF0gPCBiWzBdKSByZXR1cm4gMTtcbiAgICByZXR1cm4gMDtcbiAgfSk7XG4gIHJldHVybiBzY29yZXNbMF0hWzFdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWluaW1heF9hZ2VudCgpOiBBSUFnZW50IHtcbiAgcmV0dXJuIHtcbiAgICBuZXh0X21vdmU6IG1pbmltYXhfbW92ZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWluaW1heF9tb3ZlKGJvYXJkOiBSZWFkb25seTxCb2FyZD4pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgY29uc3Qgc2NvcmUgPSBldmFsX2J5X3NlYXJjaChib2FyZCwgNik7XG4gIHJldHVybiBzY29yZVsxXTtcbn1cblxuZnVuY3Rpb24gZXZhbF9ieV9zZWFyY2goYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPiwgZGVwdGg6IG51bWJlcik6IFNjb3JlIHtcbiAgaWYgKGRlcHRoIDw9IDEpIHtcbiAgICByZXR1cm4gc3RvbmVfY291bnRfZm9yX2V2YWwoYm9hcmQpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGNhbl9wdXRfcGxhY2UgPSBhbGxfdmFsaWRfbW92ZXMoYm9hcmQpO1xuICAgIGxldCBiZXN0X3Njb3JlOiBudW1iZXIgPSAtNjQ7XG4gICAgbGV0IGJlc3RfbW92ZTogW251bWJlciwgbnVtYmVyXSA9IFswLCAwXTtcblxuICAgIGZvciAoY29uc3QgaW5wdXRfcGxhY2Ugb2YgY2FuX3B1dF9wbGFjZSkge1xuICAgICAgY29uc3QgdGVtcG9yYXJ5X2JvYXJkID0gZGVlcF9jb3B5X2JvYXJkKGJvYXJkKTtcbiAgICAgIGNvbnN0IFtuZXh0X2JvYXJkLCBzdGF0dXNdID0gbmV4dF9zdGF0ZSh0ZW1wb3JhcnlfYm9hcmQsIGlucHV0X3BsYWNlKTtcblxuICAgICAgaWYgKHN0YXR1cyAhPT0gR2FtZXN0YXR1cy5QYXNzKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlID0gZXZhbF9ieV9zZWFyY2gobmV4dF9ib2FyZCwgZGVwdGggLSAxKTtcbiAgICAgICAgaWYgKC1zY29yZVswXSA+IGJlc3Rfc2NvcmUpIHtcbiAgICAgICAgICBbYmVzdF9zY29yZSwgYmVzdF9tb3ZlXSA9IFstc2NvcmVbMF0sIGlucHV0X3BsYWNlXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc2NvcmUgPSBldmFsX2J5X3NlYXJjaChuZXh0X2JvYXJkLCBkZXB0aCAtIDIpO1xuICAgICAgICBpZiAoc2NvcmVbMF0gPiBiZXN0X3Njb3JlKSB7XG4gICAgICAgICAgW2Jlc3Rfc2NvcmUsIGJlc3RfbW92ZV0gPSBbc2NvcmVbMF0sIGlucHV0X3BsYWNlXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW2Jlc3Rfc2NvcmUsIGJlc3RfbW92ZV07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFscGhhYmV0YV9hZ2VudCgpOiBBSUFnZW50IHtcbiAgcmV0dXJuIHtcbiAgICBuZXh0X21vdmU6IGFscGhhYmV0YV9tb3ZlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBhbHBoYWJldGFfbW92ZShib2FyZDogUmVhZG9ubHk8Qm9hcmQ+KTogW251bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IHNjb3JlID0gYWxwaGFiZXRhX2V2YWxfYnlfc2VhcmNoKGJvYXJkLCA2LCAxMDAwMDAwMDAsIC0xMDAwMDAwMDApO1xuICByZXR1cm4gc2NvcmVbMV07XG59XG5cbmZ1bmN0aW9uIGFscGhhYmV0YV9ldmFsX2J5X3NlYXJjaChcbiAgYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPixcbiAgZGVwdGg6IG51bWJlcixcbiAgbWF4X3Njb3JlOiBudW1iZXIsXG4gIG1pbl9zY29yZTogbnVtYmVyXG4pOiBTY29yZSB7XG4gIGlmIChkZXB0aCA8PSAxKSB7XG4gICAgcmV0dXJuIHN0b25lX2NvdW50X2Zvcl9ldmFsKGJvYXJkKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBjYW5fcHV0X3BsYWNlID0gYWxsX3ZhbGlkX21vdmVzKGJvYXJkKTtcbiAgICBsZXQgYmVzdF9zY29yZTogbnVtYmVyID0gLTEwMDAwMDAwMDtcbiAgICBsZXQgYmVzdF9tb3ZlOiBbbnVtYmVyLCBudW1iZXJdID0gWzAsIDBdO1xuXG4gICAgaWYgKGFsbF92YWxpZF9tb3Zlcyhib2FyZCkubGVuZ3RoIDw9IDApIHtcbiAgICAgIGNvbnN0IGNhbm5vdF9wdXRfYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoYm9hcmQpO1xuICAgICAgbW92ZV90dXJuKGNhbm5vdF9wdXRfYm9hcmQpO1xuICAgICAgcmV0dXJuIGFscGhhYmV0YV9ldmFsX2J5X3NlYXJjaChcbiAgICAgICAgY2Fubm90X3B1dF9ib2FyZCxcbiAgICAgICAgZGVwdGggLSAxLFxuICAgICAgICAtbWluX3Njb3JlLFxuICAgICAgICAtbWF4X3Njb3JlXG4gICAgICApO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgaW5wdXRfcGxhY2Ugb2YgY2FuX3B1dF9wbGFjZSkge1xuICAgICAgY29uc3QgdGVtcG9yYXJ5X2JvYXJkID0gZGVlcF9jb3B5X2JvYXJkKGJvYXJkKTtcbiAgICAgIGNvbnN0IG5leHRfYm9hcmQgPSBuZXh0X3N0YXRlX2Zvcl9taW5pbWF4KHRlbXBvcmFyeV9ib2FyZCwgaW5wdXRfcGxhY2UpO1xuICAgICAgY29uc3Qgc2NvcmUgPSBhbHBoYWJldGFfZXZhbF9ieV9zZWFyY2goXG4gICAgICAgIG5leHRfYm9hcmQsXG4gICAgICAgIGRlcHRoIC0gMSxcbiAgICAgICAgLWJlc3Rfc2NvcmUsXG4gICAgICAgIC1tYXhfc2NvcmVcbiAgICAgICk7XG4gICAgICBpZiAoLXNjb3JlWzBdID4gbWF4X3Njb3JlKSB7XG4gICAgICAgIHJldHVybiBbLXNjb3JlWzBdLCBpbnB1dF9wbGFjZV07XG4gICAgICB9XG4gICAgICBpZiAoLXNjb3JlWzBdID4gYmVzdF9zY29yZSkge1xuICAgICAgICBbYmVzdF9zY29yZSwgYmVzdF9tb3ZlXSA9IFstc2NvcmVbMF0sIGlucHV0X3BsYWNlXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtiZXN0X3Njb3JlLCBiZXN0X21vdmVdO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0b25lX2NvdW50X2Zvcl9ldmFsKGJvYXJkOiBSZWFkb25seTxCb2FyZD4pOiBTY29yZSB7XG4gIGNvbnN0IGlzX2JsYWNrX3R1cm4gPSBib2FyZC5ibGFja190dXJuO1xuICBjb25zdCBbYl9zY29yZSwgd19zY29yZV0gPSBjYWxjX3Njb3JlKGJvYXJkKTtcbiAgaWYgKGlzX2JsYWNrX3R1cm4pIHtcbiAgICByZXR1cm4gW2Jfc2NvcmUsIFswLCAwXV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFt3X3Njb3JlLCBbMCwgMF1dO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBCb2FyZCxcbiAgY2FsY19zY29yZSxcbiAgZ2VuZXJhdGVfaW5pdGlhbF9ib2FyZCxcbiAgc3RyaW5naWZ5X2JvYXJkLFxuICBwdXRfc3RvbmUsXG4gIGZsaXBfc3RvbmUsXG4gIG1vdmVfdHVybixcbiAgcGFyc2VfY29vcmQsXG4gIGlzX3ZhbGlkX21vdmUsXG4gIGFkZF92ZWMsXG4gIGp1ZGdlX2ZsaXBfMWQsXG4gIERJUkVDVElPTlMsXG4gIGFsbF92YWxpZF9tb3ZlcyxcbiAgZmxpcGFibGVfYWxsX3BsYWNlcyxcbiAgbmV4dF9zdGF0ZSxcbiAgR2FtZXN0YXR1cyxcbn0gZnJvbSAnLi9vdGhlbGxvJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfdmVjKFxuICB4OiBudW1iZXIsXG4gIHk6IG51bWJlcixcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxuKTogW251bWJlciwgbnVtYmVyXSB7XG4gIGxldCBoaWdodF9tYWcgPSBjYW52YXMuaGVpZ2h0IC8gMTAwO1xuICBsZXQgd2lkdGhfbWFnID0gY2FudmFzLndpZHRoIC8gMTAwO1xuICByZXR1cm4gW3ggKiBoaWdodF9tYWcsIHkgKiB3aWR0aF9tYWddO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF9zY2FsKGE6IG51bWJlciwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IG51bWJlciB7XG4gIGxldCBzY2FsX21hZyA9IGNhbnZhcy5oZWlnaHQgLyAxMDA7XG4gIHJldHVybiBhICogc2NhbF9tYWc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3X2dyaWQoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQge1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgLy8gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuXG4gIGxldCBbZmllbGRfc3BfeCwgZmllbGRfc3BfeV0gPSBjb252ZXJ0X3ZlYygwLCAwLCBjYW52YXMpO1xuICBsZXQgZmllbGRfc2l6ZV9sZW5ndGggPSBjb252ZXJ0X3NjYWwoMTAwLCBjYW52YXMpO1xuXG4gIGlmIChjdHggIT0gdW5kZWZpbmVkKSB7XG4gICAgLy8g5Z+656SO44Gu55uk6Z2i6ZW35pa55b2i44Gr5aGX44KK44Gk44G244GZXG4gICAgY3R4LmZpbGxTdHlsZSA9ICdncmVlbic7XG4gICAgY3R4LmZpbGxSZWN0KGZpZWxkX3NwX3gsIGZpZWxkX3NwX3ksIGZpZWxkX3NpemVfbGVuZ3RoLCBmaWVsZF9zaXplX2xlbmd0aCk7XG5cbiAgICAvLyDnuKbnt5rjgpLjgbLjgY9cbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnZ3JheSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oZmllbGRfc3BfeCArIChmaWVsZF9zaXplX2xlbmd0aCAvIDgpICogaSwgZmllbGRfc3BfeSk7XG4gICAgICBjdHgubGluZVRvKFxuICAgICAgICBmaWVsZF9zcF94ICsgKGZpZWxkX3NpemVfbGVuZ3RoIC8gOCkgKiBpLFxuICAgICAgICBmaWVsZF9zcF95ICsgZmllbGRfc2l6ZV9sZW5ndGhcbiAgICAgICk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgLy8g5qiq57ea44KS44Gy44GPXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ2dyYXknO1xuICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKGZpZWxkX3NwX3gsIGZpZWxkX3NwX3kgKyAoZmllbGRfc2l6ZV9sZW5ndGggLyA4KSAqIGkpO1xuICAgICAgY3R4LmxpbmVUbyhcbiAgICAgICAgZmllbGRfc3BfeCArIGZpZWxkX3NpemVfbGVuZ3RoLFxuICAgICAgICBmaWVsZF9zcF95ICsgKGZpZWxkX3NpemVfbGVuZ3RoIC8gOCkgKiBpXG4gICAgICApO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd19waWVjZShcbiAgaTogbnVtYmVyLFxuICBqOiBudW1iZXIsXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gIGNvbG9yOiBib29sZWFuXG4pOiB2b2lkIHtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIC8vICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcblxuICBjb25zdCBbY2VudGVyX3gsIGNlbnRlcl95XSA9IGNvbnZlcnRfdmVjKFxuICAgIDEwMCAvIDE2ICsgKGogKiAxMDApIC8gOCxcbiAgICAxMDAgLyAxNiArIChpICogMTAwKSAvIDgsXG4gICAgY2FudmFzXG4gICk7XG4gIGNvbnN0IHIgPSBjb252ZXJ0X3NjYWwoNSwgY2FudmFzKTtcblxuICBpZiAoY3R4ICE9IHVuZGVmaW5lZCkge1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdncmF5JztcbiAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICBpZiAoY29sb3IgPT09IHRydWUpIHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICB9XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoY2VudGVyX3gsIGNlbnRlcl95LCByLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3X2Nhbl9wdXRfcGxhY2UoXG4gIGk6IG51bWJlcixcbiAgajogbnVtYmVyLFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG4pOiB2b2lkIHtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIC8vICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcblxuICBjb25zdCBbY2VudGVyX3gsIGNlbnRlcl95XSA9IGNvbnZlcnRfdmVjKFxuICAgIDEwMCAvIDE2ICsgKGogKiAxMDApIC8gOCxcbiAgICAxMDAgLyAxNiArIChpICogMTAwKSAvIDgsXG4gICAgY2FudmFzXG4gICk7XG4gIGNvbnN0IHIgPSBjb252ZXJ0X3NjYWwoMiwgY2FudmFzKTtcblxuICBpZiAoY3R4ICE9IHVuZGVmaW5lZCkge1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdncmF5JztcbiAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICBjdHguZmlsbFN0eWxlID0gJ2dyYXknO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKGNlbnRlcl94LCBjZW50ZXJfeSwgciwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd19waWVjZXMoYm9hcmQ6IEJvYXJkLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZCB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgIGlmIChib2FyZC5ibGFja1tpXSFbal0pIHtcbiAgICAgICAgZHJhd19waWVjZShpLCBqLCBjYW52YXMsIHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChib2FyZC53aGl0ZVtpXSFbal0pIHtcbiAgICAgICAgZHJhd19waWVjZShpLCBqLCBjYW52YXMsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdfYm9hcmQoYm9hcmQ6IEJvYXJkLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZCB7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICBjb25zdCBmaWVsZF9zaXplID0gW1xuICAgIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsXG4gICAgd2luZG93LmlubmVySGVpZ2h0IC0gMTAwLFxuICAgIDYwMCxcbiAgXS5yZWR1Y2UoKGEsIGIpID0+IE1hdGgubWluKGEsIGIpKTtcbiAgY2FudmFzLmhlaWdodCA9IGZpZWxkX3NpemU7XG4gIGNhbnZhcy53aWR0aCA9IGZpZWxkX3NpemU7XG5cbiAgaWYgKGN0eCAhPSB1bmRlZmluZWQpIHtcbiAgICBjdHguY2xlYXJSZWN0KFxuICAgICAgLi4uY29udmVydF92ZWMoMCwgMCwgY2FudmFzKSxcbiAgICAgIC4uLmNvbnZlcnRfdmVjKDEwMCwgMTAwLCBjYW52YXMpXG4gICAgKTtcbiAgfVxuICBkcmF3X2dyaWQoY2FudmFzKTtcbiAgZHJhd19waWVjZXMoYm9hcmQsIGNhbnZhcyk7XG4gIGFsbF92YWxpZF9tb3Zlcyhib2FyZCkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGRyYXdfY2FuX3B1dF9wbGFjZShlbGVtZW50WzBdLCBlbGVtZW50WzFdLCBjYW52YXMpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlucHV0X2NvbnZlcnRfcGxhY2UoXG4gIHVzZXJfaW5wdXQ6IFtudW1iZXIsIG51bWJlcl0sXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcbik6IFtudW1iZXIsIG51bWJlcl0ge1xuICBjb25zdCB1c2VyX2lucHV0XzEwMCA9IFtcbiAgICAodXNlcl9pbnB1dFswXSAvIGNhbnZhcy5oZWlnaHQpICogMTAwLFxuICAgICh1c2VyX2lucHV0WzFdIC8gY2FudmFzLndpZHRoKSAqIDEwMCxcbiAgXTtcbiAgY29uc3QgaSA9IE1hdGgucm91bmQoKHVzZXJfaW5wdXRfMTAwWzBdISAtIDYuNzUpIC8gMTIuNSk7XG4gIGNvbnN0IGogPSBNYXRoLnJvdW5kKCh1c2VyX2lucHV0XzEwMFsxXSEgLSA2Ljc1KSAvIDEyLjUpO1xuICByZXR1cm4gW2ksIGpdO1xufVxuIiwiaW1wb3J0IHsgYmFzZW5hbWUgfSBmcm9tICdwYXRoL3Bvc2l4JztcbmltcG9ydCB7IGdldFN5c3RlbUVycm9yTWFwIH0gZnJvbSAndXRpbCc7XG5pbXBvcnQge1xuICBBSUFnZW50LFxuICBhbHBoYWJldGFfYWdlbnQsXG4gIG1pbmltYXhfYWdlbnQsXG4gIG5ld19yYW5kb21fcGxheWVyLFxuICBuZXdfd2Vha19hZ2VudCxcbn0gZnJvbSAnLi9haSc7XG5pbXBvcnQgeyBkcmF3X2JvYXJkLCBkcmF3X3BpZWNlcywgaW5wdXRfY29udmVydF9wbGFjZSB9IGZyb20gJy4vZHJhd2VyJztcbmltcG9ydCB7XG4gIEJvYXJkLFxuICBjYWxjX3Njb3JlLFxuICBnZW5lcmF0ZV9pbml0aWFsX2JvYXJkLFxuICBzdHJpbmdpZnlfYm9hcmQsXG4gIHB1dF9zdG9uZSxcbiAgZmxpcF9zdG9uZSxcbiAgbW92ZV90dXJuLFxuICBwYXJzZV9jb29yZCxcbiAgaXNfdmFsaWRfbW92ZSxcbiAgYWRkX3ZlYyxcbiAganVkZ2VfZmxpcF8xZCxcbiAgRElSRUNUSU9OUyxcbiAgYWxsX3ZhbGlkX21vdmVzLFxuICBuZXh0X3N0YXRlLFxuICBHYW1lc3RhdHVzLFxuICBmbGlwYWJsZV9hbGxfcGxhY2VzLFxuICBCb2FyZF9oaXN0b3J5LFxuICBhZGRfYm9hcmRfaGlzdG9yeSxcbiAgZGVlcF9jb3B5X2JvYXJkLFxuICBkZWxldGVfbGF0ZXJfdHVybixcbiAgZGVlcF9jb3B5X2JvYXJkX2FycmF5LFxuICBiYWNrX3RvX215X3R1cm4sXG4gIHVwZGF0ZV9oaXN0b3J5LFxufSBmcm9tICcuL290aGVsbG8nO1xuXG5leHBvcnQgdHlwZSBHYW1lID0ge1xuICBsYXN0OiBudW1iZXI7IC8vIOacgOW+jOOBq+ebpOmdouOBruabtOaWsOOCkuOBl+OBn+aZguWIuyAobXMpXG4gIGludGVydmFsOiBudW1iZXI7IC8vIChpbnRlcnZhbCltcyDmr47jgavnm6TpnaLjga7mm7TmlrDjgpLooYzjgYZcbiAgYm9hcmQ6IEJvYXJkO1xuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICB1c2VyX2lucHV0OiBbbnVtYmVyLCBudW1iZXJdIHwgbnVsbDtcbiAgbWVzc2FnZV9ob2xkZXI6IEhUTUxTcGFuRWxlbWVudDtcbiAgc3RhcnRfYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgc2VsZWN0X2JsYWNrOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgc2VsZWN0X3doaXRlOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgc2VsZWN0X0FJYmF0dGxlOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY2FuY2VsX2J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIG5vd19nYW1pbmc6IGJvb2xlYW47XG4gIGJsYWNrX3BsYXllcjogQUlBZ2VudCB8ICd1c2VyJztcbiAgd2hpdGVfcGxheWVyOiBBSUFnZW50IHwgJ3VzZXInO1xuICBib2FyZF9oaXN0b3J5OiBCb2FyZF9oaXN0b3J5O1xuICB0dXJuX251bWJlcjogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyX21vdXNlX2lucHV0X2xpc3RuZXIoZ2FtZTogR2FtZSk6IHZvaWQge1xuICBnYW1lLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgcmVjdCA9IGdhbWUuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgY29uc3QgeSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgIGNvbnN0IFtpLCBqXSA9IGlucHV0X2NvbnZlcnRfcGxhY2UoW3gsIHldLCBnYW1lLmNhbnZhcyk7XG4gICAgZ2FtZS51c2VyX2lucHV0ID0gW2osIGldO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1dF9zdGFydF9idXR0b24oXG4gIGdhbWU6IEdhbWUsXG4gIHN0YXJ0X2J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQsXG4gIGNhbmNlbF9idXR0b246IEhUTUxCdXR0b25FbGVtZW50LFxuICBzZWxlY3RfYmxhY2s6IEhUTUxCdXR0b25FbGVtZW50LFxuICBzZWxlY3Rfd2hpdGU6IEhUTUxCdXR0b25FbGVtZW50LFxuICBzZWxlY3RfQUliYXR0bGU6IEhUTUxCdXR0b25FbGVtZW50XG4pOiB2b2lkIHtcbiAgc3RhcnRfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBnYW1lLm5vd19nYW1pbmcgPSB0cnVlO1xuICAgIGdhbWUuc3RhcnRfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfYmxhY2suc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF93aGl0ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X0FJYmF0dGxlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5jYW5jZWxfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICBnYW1lLmJvYXJkID0gZ2VuZXJhdGVfaW5pdGlhbF9ib2FyZCgpO1xuICAgIGRyYXdfYm9hcmQoZ2FtZS5ib2FyZCwgZ2FtZS5jYW52YXMpO1xuICAgIGdhbWUuYmxhY2tfcGxheWVyID0gJ3VzZXInO1xuICAgIGdhbWUud2hpdGVfcGxheWVyID0gJ3VzZXInO1xuICAgIGdhbWUubWVzc2FnZV9ob2xkZXIuaW5uZXJUZXh0ID1cbiAgICAgICfjgYrkupLjgYTpoJHlvLXjgaPjgabjgY/jgaDjgZXjgYTjgIInICsgJ1xcbicgKyAn6buS44Gu5omL55Wq44Gn44GZ44CCJztcbiAgfSk7XG4gIHNlbGVjdF9ibGFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgZ2FtZS5ub3dfZ2FtaW5nID0gdHJ1ZTtcbiAgICBnYW1lLnN0YXJ0X2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X2JsYWNrLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3Rfd2hpdGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF9BSWJhdHRsZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuY2FuY2VsX2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgZ2FtZS5ib2FyZCA9IGdlbmVyYXRlX2luaXRpYWxfYm9hcmQoKTtcbiAgICBkcmF3X2JvYXJkKGdhbWUuYm9hcmQsIGdhbWUuY2FudmFzKTtcbiAgICBnYW1lLmJsYWNrX3BsYXllciA9ICd1c2VyJztcbiAgICBnYW1lLndoaXRlX3BsYXllciA9IGFscGhhYmV0YV9hZ2VudCgpO1xuICAgIGdhbWUubWVzc2FnZV9ob2xkZXIuaW5uZXJUZXh0ID1cbiAgICAgICfjgZXjgYLjgrLjg7zjg6DjgpLlp4vjgoHjgb7jgZfjgofjgYbjgIInICsgJ1xcbicgKyAn44GC44Gq44GfKOm7kinjga7miYvnlarjgafjgZnjgIInO1xuICB9KTtcbiAgc2VsZWN0X3doaXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBnYW1lLm5vd19nYW1pbmcgPSB0cnVlO1xuICAgIGdhbWUuc3RhcnRfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfYmxhY2suc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF93aGl0ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X0FJYmF0dGxlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5jYW5jZWxfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICBnYW1lLmJvYXJkID0gZ2VuZXJhdGVfaW5pdGlhbF9ib2FyZCgpO1xuICAgIGRyYXdfYm9hcmQoZ2FtZS5ib2FyZCwgZ2FtZS5jYW52YXMpO1xuICAgIGdhbWUuYmxhY2tfcGxheWVyID0gYWxwaGFiZXRhX2FnZW50KCk7XG4gICAgZ2FtZS53aGl0ZV9wbGF5ZXIgPSAndXNlcic7XG4gICAgZ2FtZS5tZXNzYWdlX2hvbGRlci5pbm5lclRleHQgPVxuICAgICAgJ+OBleOBguOCsuODvOODoOOCkuWni+OCgeOBvuOBl+OCh+OBhuOAgicgKyAnXFxuJyArICfpu5Ljga7miYvnlarjgafjgZnjgIInO1xuICB9KTtcbiAgc2VsZWN0X0FJYmF0dGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBnYW1lLm5vd19nYW1pbmcgPSB0cnVlO1xuICAgIGdhbWUuc3RhcnRfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfYmxhY2suc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF93aGl0ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X0FJYmF0dGxlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5jYW5jZWxfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICBnYW1lLmJvYXJkID0gZ2VuZXJhdGVfaW5pdGlhbF9ib2FyZCgpO1xuICAgIGRyYXdfYm9hcmQoZ2FtZS5ib2FyZCwgZ2FtZS5jYW52YXMpO1xuICAgIGdhbWUuYmxhY2tfcGxheWVyID0gYWxwaGFiZXRhX2FnZW50KCk7XG4gICAgZ2FtZS53aGl0ZV9wbGF5ZXIgPSBhbHBoYWJldGFfYWdlbnQoKTtcbiAgICBnYW1lLm1lc3NhZ2VfaG9sZGVyLmlubmVyVGV4dCA9ICfpu5Ljga7miYvnlarjgafjgZnjgIInO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1dF9jYW5jZWxfYnV0dG9uKFxuICBnYW1lOiBHYW1lLFxuICBjYW5jZWxfYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudFxuKTogdm9pZCB7XG4gIGNhbmNlbF9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGdhbWUudHVybl9udW1iZXIgPSBiYWNrX3RvX215X3R1cm4oZ2FtZS5ib2FyZF9oaXN0b3J5LCBnYW1lLnR1cm5fbnVtYmVyKTtcbiAgICBjb25zdCBib2FyZCA9IGdhbWUuYm9hcmRfaGlzdG9yeVtnYW1lLnR1cm5fbnVtYmVyXSFbMF07XG4gICAgZ2FtZS5ib2FyZCA9IGJvYXJkO1xuICAgIGdhbWUubm93X2dhbWluZyA9IHRydWU7XG4gICAgZ2FtZS5zdGFydF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF9ibGFjay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X3doaXRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfQUliYXR0bGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLm1lc3NhZ2VfaG9sZGVyLmlubmVyVGV4dCA9IGNyZWF0ZV9tZXNzYWdlKGdhbWUsIEdhbWVzdGF0dXMuT2spO1xuICAgIGRyYXdfYm9hcmQoZ2FtZS5ib2FyZCwgZ2FtZS5jYW52YXMpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9nYW1lKFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICBtZXNzYWdlX2hvbGRlcjogSFRNTFNwYW5FbGVtZW50LFxuICBzdGFydF9idXR0b246IEhUTUxCdXR0b25FbGVtZW50LFxuICBjYW5jZWxfYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCxcbiAgc2VsZWN0X2JsYWNrOiBIVE1MQnV0dG9uRWxlbWVudCxcbiAgc2VsZWN0X3doaXRlOiBIVE1MQnV0dG9uRWxlbWVudCxcbiAgc2VsZWN0X0FJYmF0dGxlOiBIVE1MQnV0dG9uRWxlbWVudFxuKTogR2FtZSB7XG4gIGNvbnN0IGdhbWU6IEdhbWUgPSB7XG4gICAgbGFzdDogcGVyZm9ybWFuY2Uubm93KCksXG4gICAgaW50ZXJ2YWw6IDEwMDAgLyA2MCwgLy8gbXNcbiAgICBib2FyZDogZ2VuZXJhdGVfaW5pdGlhbF9ib2FyZCgpLFxuICAgIGNhbnZhczogY2FudmFzLFxuICAgIHVzZXJfaW5wdXQ6IG51bGwsXG4gICAgbWVzc2FnZV9ob2xkZXI6IG1lc3NhZ2VfaG9sZGVyLFxuICAgIHN0YXJ0X2J1dHRvbjogc3RhcnRfYnV0dG9uLFxuICAgIGNhbmNlbF9idXR0b246IGNhbmNlbF9idXR0b24sXG4gICAgc2VsZWN0X2JsYWNrOiBzZWxlY3RfYmxhY2ssXG4gICAgc2VsZWN0X3doaXRlOiBzZWxlY3Rfd2hpdGUsXG4gICAgc2VsZWN0X0FJYmF0dGxlOiBzZWxlY3RfQUliYXR0bGUsXG4gICAgbm93X2dhbWluZzogZmFsc2UsXG4gICAgYmxhY2tfcGxheWVyOiAndXNlcicsXG4gICAgd2hpdGVfcGxheWVyOiAndXNlcicsXG4gICAgYm9hcmRfaGlzdG9yeTogW1tnZW5lcmF0ZV9pbml0aWFsX2JvYXJkKCksIEdhbWVzdGF0dXMuT2tdXSxcbiAgICB0dXJuX251bWJlcjogMCxcbiAgfTtcbiAgbWVzc2FnZV9ob2xkZXIuaW5uZXJUZXh0ID0gJ+WvvuaIpuebuOaJi+OAgeWFiOaUu+W+jOaUu+OCkumBuOOCk+OBp+OBj+OBoOOBleOBhOOAgic7XG4gIGdhbWUuc3RhcnRfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgZ2FtZS5zZWxlY3RfYmxhY2suc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICBnYW1lLnNlbGVjdF93aGl0ZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gIGdhbWUuc2VsZWN0X0FJYmF0dGxlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgcmVnaXN0ZXJfbW91c2VfaW5wdXRfbGlzdG5lcihnYW1lKTtcbiAgcHV0X3N0YXJ0X2J1dHRvbihcbiAgICBnYW1lLFxuICAgIGdhbWUuc3RhcnRfYnV0dG9uLFxuICAgIGdhbWUuY2FuY2VsX2J1dHRvbixcbiAgICBnYW1lLnNlbGVjdF9ibGFjayxcbiAgICBnYW1lLnNlbGVjdF93aGl0ZSxcbiAgICBnYW1lLnNlbGVjdF9BSWJhdHRsZVxuICApO1xuICByZXR1cm4gZ2FtZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlX3N0YXRlKGdhbWU6IEdhbWUpOiBib29sZWFuIHtcbiAgaWYgKGdhbWUuYm9hcmQuYmxhY2tfdHVybikge1xuICAgIGlmIChnYW1lLmJsYWNrX3BsYXllciA9PT0gJ3VzZXInKSB7XG4gICAgICByZXR1cm4gaW5wdXRfc3RhdGUoZ2FtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdhbWUudXNlcl9pbnB1dCA9IGdhbWUuYmxhY2tfcGxheWVyLm5leHRfbW92ZShnYW1lLmJvYXJkKTtcbiAgICAgIHJldHVybiBpbnB1dF9zdGF0ZShnYW1lKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWdhbWUuYm9hcmQuYmxhY2tfdHVybikge1xuICAgIGlmIChnYW1lLndoaXRlX3BsYXllciA9PT0gJ3VzZXInKSB7XG4gICAgICByZXR1cm4gaW5wdXRfc3RhdGUoZ2FtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdhbWUudXNlcl9pbnB1dCA9IGdhbWUud2hpdGVfcGxheWVyLm5leHRfbW92ZShnYW1lLmJvYXJkKTtcbiAgICAgIHJldHVybiBpbnB1dF9zdGF0ZShnYW1lKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpbnB1dF9zdGF0ZShnYW1lOiBHYW1lKTogYm9vbGVhbiB7XG4gIGlmICghZ2FtZS5ub3dfZ2FtaW5nICYmIGdhbWUudXNlcl9pbnB1dCAhPT0gbnVsbCkge1xuICAgIGdhbWUudXNlcl9pbnB1dCA9IG51bGw7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChnYW1lLm5vd19nYW1pbmcgJiYgZ2FtZS51c2VyX2lucHV0ICE9PSBudWxsKSB7XG4gICAgZ2FtZS50dXJuX251bWJlciA9IHVwZGF0ZV9oaXN0b3J5KFxuICAgICAgZ2FtZS5ib2FyZF9oaXN0b3J5LFxuICAgICAgZ2FtZS50dXJuX251bWJlcixcbiAgICAgIGdhbWUudXNlcl9pbnB1dFxuICAgICk7XG4gICAgY29uc3QgW2JvYXJkLCBzdGF0dXNdID0gbmV4dF9zdGF0ZShnYW1lLmJvYXJkLCBnYW1lLnVzZXJfaW5wdXQpO1xuICAgIGdhbWUudXNlcl9pbnB1dCA9IG51bGw7XG4gICAgZ2FtZS5ib2FyZCA9IGJvYXJkO1xuICAgIGlmIChzdGF0dXMgPT09IEdhbWVzdGF0dXMuRXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHN0YXR1cyA9PT0gR2FtZXN0YXR1cy5FbmQpIHtcbiAgICAgIGdhbWUubWVzc2FnZV9ob2xkZXIuaW5uZXJUZXh0ID0gY3JlYXRlX21lc3NhZ2UoZ2FtZSwgc3RhdHVzKTtcbiAgICAgIGdhbWUubm93X2dhbWluZyA9IGZhbHNlO1xuICAgICAgZ2FtZS5zdGFydF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgICAgZ2FtZS5zZWxlY3RfYmxhY2suc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgICAgZ2FtZS5zZWxlY3Rfd2hpdGUuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgICAgZ2FtZS5zZWxlY3RfQUliYXR0bGUuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdhbWUubWVzc2FnZV9ob2xkZXIuaW5uZXJUZXh0ID0gY3JlYXRlX21lc3NhZ2UoZ2FtZSwgc3RhdHVzKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZV9nYW1lKGdhbWU6IEdhbWUpOiB2b2lkIHtcbiAgaWYgKHVwZGF0ZV9zdGF0ZShnYW1lKSkge1xuICAgIGRyYXdfYm9hcmQoZ2FtZS5ib2FyZCwgZ2FtZS5jYW52YXMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydF9sb29wKGdhbWU6IEdhbWUsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcbiAgY29uc3QgcnVuID0gKG5vdzogbnVtYmVyKSA9PiB7XG4gICAgbGV0IGRlbHRhID0gbm93IC0gZ2FtZS5sYXN0O1xuICAgIHdoaWxlIChkZWx0YSA+PSBnYW1lLmludGVydmFsKSB7XG4gICAgICBkZWx0YSAtPSBnYW1lLmludGVydmFsO1xuICAgICAgZ2FtZS5sYXN0ID0gbm93IC0gZGVsdGE7XG4gICAgICB1cGRhdGVfZ2FtZShnYW1lKTtcbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJ1bik7XG4gIH07XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShydW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlX21lc3NhZ2UoZ2FtZTogR2FtZSwgc3RhdHVzOiBHYW1lc3RhdHVzKTogc3RyaW5nIHtcbiAgY29uc3QgYm9hcmQgPSBnYW1lLmJvYXJkO1xuICBjb25zdCBiX3Njb3JlID0gJ+m7ku+8miAnICsgY2FsY19zY29yZShib2FyZClbMF07XG4gIGNvbnN0IHdfc2NvcmUgPSAn55m977yaICcgKyBjYWxjX3Njb3JlKGJvYXJkKVsxXTtcbiAgY29uc3Qgc2NvcmUgPSBiX3Njb3JlICsgJ1xcbicgKyB3X3Njb3JlICsgJ1xcbic7XG4gIGlmIChzdGF0dXMgPT09IEdhbWVzdGF0dXMuT2spIHtcbiAgICBpZiAoYm9hcmQuYmxhY2tfdHVybikge1xuICAgICAgcmV0dXJuIHNjb3JlICsgJ+m7kuOBruaJi+eVquOBp+OBmSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzY29yZSArICfnmb3jga7miYvnlarjgafjgZknO1xuICAgIH1cbiAgfSBlbHNlIGlmIChzdGF0dXMgPT09IEdhbWVzdGF0dXMuRXJyb3IpIHtcbiAgICBpZiAoYm9hcmQuYmxhY2tfdHVybikge1xuICAgICAgcmV0dXJuIHNjb3JlICsgJ+OBneOBk+OBq+OBr+e9ruOBj+OBk+OBqOOBjOOBp+OBjeOBvuOBm+OCk+OAgum7kuOBruaJi+eVquOBp+OBmeOAgic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzY29yZSArICfjgZ3jgZPjgavjga/nva7jgY/jgZPjgajjgYzjgafjgY3jgb7jgZvjgpPjgILnmb3jga7miYvnlarjgafjgZnjgIInO1xuICAgIH1cbiAgfSBlbHNlIGlmIChzdGF0dXMgPT09IEdhbWVzdGF0dXMuUGFzcykge1xuICAgIGlmIChib2FyZC5ibGFja190dXJuKSB7XG4gICAgICByZXR1cm4gc2NvcmUgKyAn55m944Gv572u44GP44Go44GT44KN44GM44Gq44GE44Gu44Gn44OR44K544Gn44GZ44CC5YaN5bqm6buS44Gu5omL55Wq44Gn44GZ44CCJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNjb3JlICsgJ+m7kuOBr+e9ruOBj+OBqOOBk+OCjeOBjOOBquOBhOOBruOBp+ODkeOCueOBp+OBmeOAguWGjeW6pueZveOBruaJi+eVquOBp+OBmeOAgic7XG4gICAgfVxuICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gR2FtZXN0YXR1cy5FbmQpIHtcbiAgICBpZiAoY2FsY19zY29yZShib2FyZClbMF0gPiBjYWxjX3Njb3JlKGJvYXJkKVsxXSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgc2NvcmUgK1xuICAgICAgICAn44Ky44O844Og57WC5LqG44Gn44GZ44CCJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ+m7kuOBruWLneOBoeOBp+OBmeOAgicgK1xuICAgICAgICAnXFxuJyArXG4gICAgICAgICflho3luqbjgrLjg7zjg6DjgpLplovlp4vjgZnjgovjgavjga/jg5zjgr/jg7PjgpLmirzjgZfjgabjgY/jgaDjgZXjgYTjgIInXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoY2FsY19zY29yZShib2FyZClbMF0gPCBjYWxjX3Njb3JlKGJvYXJkKVsxXSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgc2NvcmUgK1xuICAgICAgICAn44Ky44O844Og57WC5LqG44Gn44GZ44CCJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ+eZveOBruWLneOBoeOBp+OBmeOAgicgK1xuICAgICAgICAnXFxuJyArXG4gICAgICAgICflho3luqbjgrLjg7zjg6DjgpLplovlp4vjgZnjgovjgavjga/jg5zjgr/jg7PjgpLmirzjgZfjgabjgY/jgaDjgZXjgYTjgIInXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoKGNhbGNfc2NvcmUoYm9hcmQpWzBdID0gY2FsY19zY29yZShib2FyZClbMV0pKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBzY29yZSArXG4gICAgICAgICfjgrLjg7zjg6DntYLkuobjgafjgZnjgIInICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAn5byV44GN5YiG44GR44Gn44GZ44CCJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ+WGjeW6puOCsuODvOODoOOCkumWi+Wni+OBmeOCi+OBq+OBr+ODnOOCv+ODs+OCkuaKvOOBl+OBpuOBj+OBoOOBleOBhOOAgidcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJldHVybiAn44OQ44KwJztcbn1cbmZ1bmN0aW9uIHdlYWtfYWdlbnRfbW92ZSgpOiBBSUFnZW50IHwgJ3VzZXInIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBub3QgaW1wbGVtZW50ZWQuJyk7XG59XG4iLCJleHBvcnQgdHlwZSBSb3cgPSBbXG4gIGJvb2xlYW4sXG4gIGJvb2xlYW4sXG4gIGJvb2xlYW4sXG4gIGJvb2xlYW4sXG4gIGJvb2xlYW4sXG4gIGJvb2xlYW4sXG4gIGJvb2xlYW4sXG4gIGJvb2xlYW5cbl07XG5cbmV4cG9ydCB0eXBlIEJvYXJkQXJyYXkgPSBbUm93LCBSb3csIFJvdywgUm93LCBSb3csIFJvdywgUm93LCBSb3ddO1xuXG5leHBvcnQgdHlwZSBCb2FyZCA9IHtcbiAgYmxhY2s6IEJvYXJkQXJyYXk7XG4gIHdoaXRlOiBCb2FyZEFycmF5O1xuICBibGFja190dXJuOiBib29sZWFuO1xufTtcblxuLy9leHBvcnQgdHlwZSBCb2FyZF9oaXN0b3J5ID0gbmV3IEFycmF5KDY0KS5maWxsKEJvYXJkKVxuXG5leHBvcnQgdHlwZSBCb2FyZF9oaXN0b3J5ID0gW0JvYXJkLCBHYW1lc3RhdHVzXVtdO1xuXG4vL+ebpOmdouWIneacn+WMllxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlX2luaXRpYWxfYm9hcmQoKTogQm9hcmQge1xuICBjb25zdCBibGFjayA9IG5ldyBBcnJheSg4KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBibGFja1tpXSA9IG5ldyBBcnJheSg4KS5maWxsKGZhbHNlKTtcbiAgfVxuICBibGFja1s0XVszXSA9IHRydWU7XG4gIGJsYWNrWzNdWzRdID0gdHJ1ZTtcblxuICBjb25zdCB3aGl0ZSA9IG5ldyBBcnJheSg4KTtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICB3aGl0ZVtqXSA9IG5ldyBBcnJheSg4KS5maWxsKGZhbHNlKTtcbiAgfVxuICB3aGl0ZVszXVszXSA9IHRydWU7XG4gIHdoaXRlWzRdWzRdID0gdHJ1ZTtcblxuICBjb25zdCBibGFja190dXJuID0gdHJ1ZTtcblxuICBjb25zdCBib2FyZCA9IHtcbiAgICBibGFjazogYmxhY2sgYXMgQm9hcmRBcnJheSxcbiAgICB3aGl0ZTogd2hpdGUgYXMgQm9hcmRBcnJheSxcbiAgICBibGFja190dXJuOiBibGFja190dXJuLFxuICB9O1xuXG4gIHJldHVybiBib2FyZDtcbn1cblxuLypcbi8v44Gd44Gu5pmC44Gu55uk6Z2i44KS6KGo56S6XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5X2JvYXJkKGJvYXJkOiBCb2FyZCk6IHN0cmluZyB7XG4gIGxldCBIeW91amkgPSBgICAgYSBiIGMgZCBlIGYgZyBoXG4gICAtIC0gLSAtIC0gLSAtIC1cbmA7XG4gIGJvYXJkLmJsYWNrLmZvckVhY2goKHIsIGkpID0+IHtcbiAgICBIeW91amkgPSBIeW91amkgKyBTdHJpbmcoaSArIDEpICsgJyB8JztcbiAgICByLmZvckVhY2goKGIsIGopID0+IHtcbiAgICAgIGxldCBjID0gJyAnO1xuICAgICAgaWYgKGJvYXJkLndoaXRlW2ldIVtqXSkge1xuICAgICAgICBjID0gJ28nO1xuICAgICAgfVxuICAgICAgaWYgKGIpIHtcbiAgICAgICAgYyA9ICd4JztcbiAgICAgIH1cbiAgICAgIEh5b3VqaSA9IEh5b3VqaSArIGMgKyAnfCc7XG4gICAgfSk7XG4gICAgSHlvdWppID0gSHlvdWppICsgJ1xcbic7XG4gIH0pO1xuICBIeW91amkgPSBIeW91amkgKyAnICAgLSAtIC0gLSAtIC0gLSAtJyArICdcXG4nO1xuICByZXR1cm4gSHlvdWppO1xufVxuKi9cblxuLy8gW+m7kuOBruefs+aVsCwg55m944Gu55+z5pWwXeOCkui/lOOBmVxuZXhwb3J0IGZ1bmN0aW9uIGNhbGNfc2NvcmUoYm9hcmQ6IEJvYXJkKTogW251bWJlciwgbnVtYmVyXSB7XG4gIGxldCBiX3Njb3JlID0gMDtcbiAgbGV0IHdfc2NvcmUgPSAwO1xuXG4gIGJvYXJkLmJsYWNrLmZvckVhY2goKHIsIGkpID0+IHtcbiAgICByLmZvckVhY2goKGIsIGopID0+IHtcbiAgICAgIGlmIChiKSB7XG4gICAgICAgIGJfc2NvcmUrKztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIGJvYXJkLndoaXRlLmZvckVhY2goKHIsIGkpID0+IHtcbiAgICByLmZvckVhY2goKGIsIGopID0+IHtcbiAgICAgIGlmIChiKSB7XG4gICAgICAgIHdfc2NvcmUrKztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBbYl9zY29yZSwgd19zY29yZV07XG59XG5cbi8vW+ihjOeVquWPtywg5YiX55Wq5Y+3XeOAgemghueVquOCkuWPl+OBkeWPluOBo+OBpuOBneOBruWgtOaJgOOBq+efs+OCkue9ruOBj1xuZXhwb3J0IGZ1bmN0aW9uIHB1dF9zdG9uZShcbiAgcG9pbnQ6IFtudW1iZXIsIG51bWJlcl0sXG4gIGJsYWNrX3R1cm46IGJvb2xlYW4sXG4gIGJvYXJkOiBCb2FyZFxuKSB7XG4gIGNvbnN0IHJvd19udW1iZXIgPSBwb2ludFswXTtcbiAgY29uc3QgY29sdW1uX251bWJlciA9IHBvaW50WzFdO1xuXG4gIGlmIChcbiAgICByb3dfbnVtYmVyID49IDAgJiZcbiAgICByb3dfbnVtYmVyIDw9IDcgJiZcbiAgICBjb2x1bW5fbnVtYmVyID49IDAgJiZcbiAgICBjb2x1bW5fbnVtYmVyIDw9IDdcbiAgKSB7XG4gICAgaWYgKFxuICAgICAgIWJvYXJkLmJsYWNrW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXSAmJlxuICAgICAgIWJvYXJkLndoaXRlW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXVxuICAgICkge1xuICAgICAgaWYgKGJsYWNrX3R1cm4pIHtcbiAgICAgICAgYm9hcmQuYmxhY2tbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJvYXJkLndoaXRlW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy9b6KGM55Wq5Y+3LCDliJfnlarlj7dd44KS5Y+X44GR5Y+W44Gj44Gm55+z44KS44Gy44Gj44GP44KK6L+U44GZXG5leHBvcnQgZnVuY3Rpb24gZmxpcF9zdG9uZShwb2ludDogW251bWJlciwgbnVtYmVyXSwgYm9hcmQ6IEJvYXJkKTogYm9vbGVhbiB7XG4gIGNvbnN0IHJvd19udW1iZXIgPSBwb2ludFswXTtcbiAgY29uc3QgY29sdW1uX251bWJlciA9IHBvaW50WzFdO1xuXG4gIGlmIChcbiAgICByb3dfbnVtYmVyID49IDAgJiZcbiAgICByb3dfbnVtYmVyIDw9IDcgJiZcbiAgICBjb2x1bW5fbnVtYmVyID49IDAgJiZcbiAgICBjb2x1bW5fbnVtYmVyIDw9IDdcbiAgKSB7XG4gICAgaWYgKFxuICAgICAgYm9hcmQuYmxhY2tbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdIHx8XG4gICAgICBib2FyZC53aGl0ZVtyb3dfbnVtYmVyXSFbY29sdW1uX251bWJlcl1cbiAgICApIHtcbiAgICAgIGJvYXJkLmJsYWNrW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXSA9XG4gICAgICAgICFib2FyZC5ibGFja1tyb3dfbnVtYmVyXSFbY29sdW1uX251bWJlcl07XG4gICAgICBib2FyZC53aGl0ZVtyb3dfbnVtYmVyXSFbY29sdW1uX251bWJlcl0gPVxuICAgICAgICAhYm9hcmQud2hpdGVbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8v5omL55Wq44KS6YCy44KB44KLXG5leHBvcnQgZnVuY3Rpb24gbW92ZV90dXJuKGJvYXJkOiBCb2FyZCk6IEJvYXJkIHtcbiAgYm9hcmQuYmxhY2tfdHVybiA9ICFib2FyZC5ibGFja190dXJuO1xuICByZXR1cm4gYm9hcmQ7XG59XG5cbi8vXCLoi7Hoqp7lsI/mloflrZcr5pWw5a2XXCLmg4XloLHjgpLlj5fjgZHlj5bjgaPjgaZbbnVtYmVyLCBudW1iZXJd44Gr44GZ44KLXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VfY29vcmQoY29vcmRfc3RyOiBzdHJpbmcpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgaWYgKGNvb3JkX3N0ci5sZW5ndGggIT09IDIpIHtcbiAgICByZXR1cm4gWy0xLCAtMV07XG4gIH1cblxuICBjb25zdCByb3dfc3RyID0gY29vcmRfc3RyLnNwbGl0KCcnKVsxXTtcbiAgY29uc3QgY29sdW1uX3N0ciA9IGNvb3JkX3N0ci5zcGxpdCgnJylbMF07XG4gIGxldCBbcm93X251bWJlciwgY29sdW1uX251bWJlcl0gPSBbLTEsIC0xXTtcblxuICBpZiAocm93X3N0ciA9PT0gJzEnKSB7XG4gICAgcm93X251bWJlciA9IDA7XG4gIH1cbiAgaWYgKHJvd19zdHIgPT09ICcyJykge1xuICAgIHJvd19udW1iZXIgPSAxO1xuICB9XG4gIGlmIChyb3dfc3RyID09PSAnMycpIHtcbiAgICByb3dfbnVtYmVyID0gMjtcbiAgfVxuICBpZiAocm93X3N0ciA9PT0gJzQnKSB7XG4gICAgcm93X251bWJlciA9IDM7XG4gIH1cbiAgaWYgKHJvd19zdHIgPT09ICc1Jykge1xuICAgIHJvd19udW1iZXIgPSA0O1xuICB9XG4gIGlmIChyb3dfc3RyID09PSAnNicpIHtcbiAgICByb3dfbnVtYmVyID0gNTtcbiAgfVxuICBpZiAocm93X3N0ciA9PT0gJzcnKSB7XG4gICAgcm93X251bWJlciA9IDY7XG4gIH1cbiAgaWYgKHJvd19zdHIgPT09ICc4Jykge1xuICAgIHJvd19udW1iZXIgPSA3O1xuICB9XG5cbiAgaWYgKGNvbHVtbl9zdHIgPT09ICdhJykge1xuICAgIGNvbHVtbl9udW1iZXIgPSAwO1xuICB9XG4gIGlmIChjb2x1bW5fc3RyID09PSAnYicpIHtcbiAgICBjb2x1bW5fbnVtYmVyID0gMTtcbiAgfVxuICBpZiAoY29sdW1uX3N0ciA9PT0gJ2MnKSB7XG4gICAgY29sdW1uX251bWJlciA9IDI7XG4gIH1cbiAgaWYgKGNvbHVtbl9zdHIgPT09ICdkJykge1xuICAgIGNvbHVtbl9udW1iZXIgPSAzO1xuICB9XG4gIGlmIChjb2x1bW5fc3RyID09PSAnZScpIHtcbiAgICBjb2x1bW5fbnVtYmVyID0gNDtcbiAgfVxuICBpZiAoY29sdW1uX3N0ciA9PT0gJ2YnKSB7XG4gICAgY29sdW1uX251bWJlciA9IDU7XG4gIH1cbiAgaWYgKGNvbHVtbl9zdHIgPT09ICdnJykge1xuICAgIGNvbHVtbl9udW1iZXIgPSA2O1xuICB9XG4gIGlmIChjb2x1bW5fc3RyID09PSAnaCcpIHtcbiAgICBjb2x1bW5fbnVtYmVyID0gNztcbiAgfVxuXG4gIGlmIChyb3dfbnVtYmVyICE9IC0xICYmIGNvbHVtbl9udW1iZXIgIT0gLTEpIHtcbiAgICByZXR1cm4gW3Jvd19udW1iZXIsIGNvbHVtbl9udW1iZXJdO1xuICB9XG5cbiAgcmV0dXJuIFstMSwgLTFdO1xufVxuXG4vL1tudW1iZXIsIG51bWJlcl3liIbjgaDjgZFbbnVtYmVyLCBudW1iZXJd44GL44KJ56e75YuV44GZ44KLXG5leHBvcnQgZnVuY3Rpb24gYWRkX3ZlYyhcbiAgcDogcmVhZG9ubHkgW251bWJlciwgbnVtYmVyXSxcbiAgcTogcmVhZG9ubHkgW251bWJlciwgbnVtYmVyXVxuKTogW251bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IG5ld19wOiBbbnVtYmVyLCBudW1iZXJdID0gWzAsIDBdO1xuICBuZXdfcFswXSA9IHBbMF0gKyBxWzBdO1xuICBuZXdfcFsxXSA9IHBbMV0gKyBxWzFdO1xuICByZXR1cm4gbmV3X3A7XG59XG5cbmV4cG9ydCBjb25zdCBESVJFQ1RJT05TID0ge1xuICB1cDogWy0xLCAwXSxcbiAgZG93bjogWzEsIDBdLFxuICBsZWZ0OiBbMCwgLTFdLFxuICByaWdodDogWzAsIDFdLFxuICB1bDogWy0xLCAtMV0sXG4gIHVyOiBbLTEsIDFdLFxuICBkbDogWzEsIC0xXSxcbiAgZHI6IFsxLCAxXSxcbn0gYXMgY29uc3Q7XG5cbi8v5LiA5a6a5pa55ZCR44Gr44Gy44Gj44GP44KK6L+U44Gb44KL55+z44GM44GC44KL44GL5Yik5pat44GZ44KLXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VfZmxpcF8xZChcbiAgcDogcmVhZG9ubHkgW251bWJlciwgbnVtYmVyXSxcbiAgcTogcmVhZG9ubHkgW251bWJlciwgbnVtYmVyXSxcbiAgYm9hcmQ6IEJvYXJkXG4pOiBbbnVtYmVyLCBudW1iZXJdW10ge1xuICBsZXQgZmxpcGFibGVfc3RvbmVzID0gW107XG4gIGxldCBuZXdfcDogW251bWJlciwgbnVtYmVyXSA9IGFkZF92ZWMocCwgcSk7XG4gIGlmIChib2FyZC5ibGFja190dXJuKSB7XG4gICAgbGV0IHdfcm93ID0gYm9hcmQud2hpdGVbbmV3X3BbMF1dO1xuICAgIGlmICh3X3JvdyA9PSB1bmRlZmluZWQgfHwgIXdfcm93W25ld19wWzFdXSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICB3aGlsZSAod19yb3cgIT0gdW5kZWZpbmVkICYmIHdfcm93W25ld19wWzFdXSkge1xuICAgICAgZmxpcGFibGVfc3RvbmVzLnB1c2gobmV3X3ApO1xuICAgICAgbmV3X3AgPSBhZGRfdmVjKG5ld19wLCBxKTtcbiAgICAgIHdfcm93ID0gYm9hcmQud2hpdGVbbmV3X3BbMF1dO1xuICAgIH1cbiAgICBsZXQgYl9yb3cgPSBib2FyZC5ibGFja1tuZXdfcFswXV07XG4gICAgaWYgKGJfcm93ICE9IHVuZGVmaW5lZCAmJiBiX3Jvd1tuZXdfcFsxXV0pIHtcbiAgICAgIHJldHVybiBmbGlwYWJsZV9zdG9uZXM7XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgYl9yb3cgPSBib2FyZC5ibGFja1tuZXdfcFswXV07XG4gICAgaWYgKGJfcm93ID09IHVuZGVmaW5lZCB8fCAhYl9yb3dbbmV3X3BbMV1dKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHdoaWxlIChiX3JvdyAhPSB1bmRlZmluZWQgJiYgYl9yb3dbbmV3X3BbMV1dKSB7XG4gICAgICBmbGlwYWJsZV9zdG9uZXMucHVzaChuZXdfcCk7XG4gICAgICBuZXdfcCA9IGFkZF92ZWMobmV3X3AsIHEpO1xuICAgICAgYl9yb3cgPSBib2FyZC5ibGFja1tuZXdfcFswXV07XG4gICAgfVxuICAgIGxldCB3X3JvdyA9IGJvYXJkLndoaXRlW25ld19wWzBdXTtcbiAgICBpZiAod19yb3cgIT0gdW5kZWZpbmVkICYmIHdfcm93W25ld19wWzFdXSkge1xuICAgICAgcmV0dXJuIGZsaXBhYmxlX3N0b25lcztcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG5cbi8vW251bWJlciwgbnVtYmVyXeOCkuWPl+OBkeWPluOBo+OBpuWQiOazleOBi+OCkuWIpOaWreOBmeOCi1xuZXhwb3J0IGZ1bmN0aW9uIGlzX3ZhbGlkX21vdmUocDogW251bWJlciwgbnVtYmVyXSwgYm9hcmQ6IEJvYXJkKTogYm9vbGVhbiB7XG4gIGxldCBqdWRnZV9udW1iZXIgPSAwO1xuXG4gIGNvbnN0IHdfcm93ID0gYm9hcmQud2hpdGVbcFswXV07XG4gIGNvbnN0IGJfcm93ID0gYm9hcmQuYmxhY2tbcFswXV07XG5cbiAgaWYgKGJfcm93ID09IHVuZGVmaW5lZCB8fCBiX3Jvd1twWzFdXSB8fCB3X3JvdyA9PSB1bmRlZmluZWQgfHwgd19yb3dbcFsxXV0pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBESVJFQ1RJT05TKSB7XG4gICAgaWYgKGp1ZGdlX2ZsaXBfMWQocCwgUmVmbGVjdC5nZXQoRElSRUNUSU9OUywgcHJvcGVydHkpLCBib2FyZCkubGVuZ3RoID4gMCkge1xuICAgICAganVkZ2VfbnVtYmVyKys7XG4gICAgfVxuICB9XG4gIGlmIChqdWRnZV9udW1iZXIgPiAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vL+WQiOazleaJi+OCkuWFqOihqOekuuOBmeOCi1xuZXhwb3J0IGZ1bmN0aW9uIGFsbF92YWxpZF9tb3Zlcyhib2FyZDogQm9hcmQpOiBbbnVtYmVyLCBudW1iZXJdW10ge1xuICBjb25zdCBjYW5fcHV0X3BsYWNlOiBbbnVtYmVyLCBudW1iZXJdW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgaWYgKGlzX3ZhbGlkX21vdmUoW2ksIGpdLCBib2FyZCkpIHtcbiAgICAgICAgY2FuX3B1dF9wbGFjZS5wdXNoKFtpLCBqXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjYW5fcHV0X3BsYWNlO1xufVxuXG4vL+OBneOBruaZguOBruebpOmdouOCkuihqOekuiDigLvjgZ/jgaDjgZfjgYrjgZHjgovloLTmiYDjgpIt44Gn6KGo56S6XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5X2JvYXJkKGJvYXJkOiBCb2FyZCk6IHN0cmluZyB7XG4gIGxldCBjYW5fcHV0X3BsYWNlOiBbbnVtYmVyLCBudW1iZXJdW10gPSBhbGxfdmFsaWRfbW92ZXMoYm9hcmQpO1xuICBsZXQgSHlvdWppID0gYCAgIGEgYiBjIGQgZSBmIGcgaFxuICAgLSAtIC0gLSAtIC0gLSAtXG5gO1xuICBib2FyZC5ibGFjay5mb3JFYWNoKChyLCBpKSA9PiB7XG4gICAgSHlvdWppID0gSHlvdWppICsgU3RyaW5nKGkgKyAxKSArICcgfCc7XG4gICAgci5mb3JFYWNoKChiLCBqKSA9PiB7XG4gICAgICBsZXQgYyA9ICcgJztcbiAgICAgIGlmIChib2FyZC53aGl0ZVtpXSFbal0pIHtcbiAgICAgICAgYyA9ICdvJztcbiAgICAgIH1cbiAgICAgIGlmIChiKSB7XG4gICAgICAgIGMgPSAneCc7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgY2FuX3B1dF9wbGFjZSkge1xuICAgICAgICBpZiAoZWxlbWVudFswXSA9PT0gaSAmJiBlbGVtZW50WzFdID09PSBqKSB7XG4gICAgICAgICAgYyA9ICctJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgSHlvdWppID0gSHlvdWppICsgYyArICd8JztcbiAgICB9KTtcbiAgICBIeW91amkgPSBIeW91amkgKyAnXFxuJztcbiAgfSk7XG4gIEh5b3VqaSA9IEh5b3VqaSArICcgICAtIC0gLSAtIC0gLSAtIC0nICsgJ1xcbic7XG4gIHJldHVybiBIeW91amk7XG59XG5cbi8v44Gy44Gj44GP44KK6L+U44Gb44KL44Go44GT44KN44KS44GZ44G544Gm44Oq44K544OI5YyW44GZ44KLXG5leHBvcnQgZnVuY3Rpb24gZmxpcGFibGVfYWxsX3BsYWNlcyhcbiAgcDogW251bWJlciwgbnVtYmVyXSxcbiAgYm9hcmQ6IEJvYXJkXG4pOiBbbnVtYmVyLCBudW1iZXJdW10ge1xuICBsZXQgY2FuX2ZsaXBfcGxhY2VzOiBbbnVtYmVyLCBudW1iZXJdW10gPSBbXTtcbiAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBESVJFQ1RJT05TKSB7XG4gICAgY29uc3QgcTogW251bWJlciwgbnVtYmVyXSA9IFJlZmxlY3QuZ2V0KERJUkVDVElPTlMsIHByb3BlcnR5KTtcbiAgICBjYW5fZmxpcF9wbGFjZXMgPSBjYW5fZmxpcF9wbGFjZXMuY29uY2F0KGp1ZGdlX2ZsaXBfMWQocCwgcSwgYm9hcmQpKTtcbiAgfVxuICByZXR1cm4gY2FuX2ZsaXBfcGxhY2VzO1xufVxuXG5leHBvcnQgZW51bSBHYW1lc3RhdHVzIHtcbiAgT2ssXG4gIFBhc3MsXG4gIEVuZCxcbiAgRXJyb3IsXG59XG5cbi8v54++5Zyo44Gu55uk6Z2i44Go5qyh44Gu552A5omL44GM5LiO44GI44KJ44KM44Gm5qyh44Gu55uk6Z2i44KS6L+U44GZXG5leHBvcnQgZnVuY3Rpb24gbmV4dF9zdGF0ZShcbiAgaW5wdXRfYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPixcbiAgcDogW251bWJlciwgbnVtYmVyXVxuKTogW0JvYXJkLCBHYW1lc3RhdHVzXSB7XG4gIGNvbnN0IGJvYXJkID0gZGVlcF9jb3B5X2JvYXJkKGlucHV0X2JvYXJkKTtcbiAgaWYgKGlzX3ZhbGlkX21vdmUocCwgYm9hcmQpICYmIHB1dF9zdG9uZShwLCBib2FyZC5ibGFja190dXJuLCBib2FyZCkpIHtcbiAgICBjb25zdCBjYW5fZmxpcF9wbGFjZXMgPSBmbGlwYWJsZV9hbGxfcGxhY2VzKHAsIGJvYXJkKTtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnRzIG9mIGNhbl9mbGlwX3BsYWNlcykge1xuICAgICAgZmxpcF9zdG9uZShlbGVtZW50cywgYm9hcmQpO1xuICAgIH1cblxuICAgIG1vdmVfdHVybihib2FyZCk7XG5cbiAgICBpZiAoYWxsX3ZhbGlkX21vdmVzKGJvYXJkKS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gW2JvYXJkLCBHYW1lc3RhdHVzLk9rXTtcbiAgICB9XG5cbiAgICBpZiAoYWxsX3ZhbGlkX21vdmVzKGJvYXJkKS5sZW5ndGggPT09IDApIHtcbiAgICAgIG1vdmVfdHVybihib2FyZCk7XG4gICAgICBpZiAoYWxsX3ZhbGlkX21vdmVzKGJvYXJkKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbW92ZV90dXJuKGJvYXJkKTtcbiAgICAgICAgcmV0dXJuIFtib2FyZCwgR2FtZXN0YXR1cy5FbmRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtib2FyZCwgR2FtZXN0YXR1cy5QYXNzXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtib2FyZCwgR2FtZXN0YXR1cy5FcnJvcl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXh0X3N0YXRlX2Zvcl9taW5pbWF4KFxuICBpbnB1dF9ib2FyZDogUmVhZG9ubHk8Qm9hcmQ+LFxuICBwOiBbbnVtYmVyLCBudW1iZXJdXG4pOiBCb2FyZCB7XG4gIGNvbnN0IGJvYXJkID0gZGVlcF9jb3B5X2JvYXJkKGlucHV0X2JvYXJkKTtcbiAgaWYgKGlzX3ZhbGlkX21vdmUocCwgYm9hcmQpICYmIHB1dF9zdG9uZShwLCBib2FyZC5ibGFja190dXJuLCBib2FyZCkpIHtcbiAgICBjb25zdCBjYW5fZmxpcF9wbGFjZXMgPSBmbGlwYWJsZV9hbGxfcGxhY2VzKHAsIGJvYXJkKTtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnRzIG9mIGNhbl9mbGlwX3BsYWNlcykge1xuICAgICAgZmxpcF9zdG9uZShlbGVtZW50cywgYm9hcmQpO1xuICAgIH1cbiAgICBtb3ZlX3R1cm4oYm9hcmQpO1xuICAgIHJldHVybiBib2FyZDtcbiAgfVxuICBtb3ZlX3R1cm4oYm9hcmQpO1xuICByZXR1cm4gYm9hcmQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVfaGlzdG9yeShcbiAgYm9hcmRfaGlzdG9yeTogQm9hcmRfaGlzdG9yeSxcbiAgdHVybl9udW1iZXI6IG51bWJlcixcbiAgdXNlcl9pbnB1dDogW251bWJlciwgbnVtYmVyXVxuKTogbnVtYmVyIHtcbiAgY29uc3QgYm9hcmQgPSBib2FyZF9oaXN0b3J5W3R1cm5fbnVtYmVyXSFbMF07XG4gIGRlbGV0ZV9sYXRlcl90dXJuKGJvYXJkX2hpc3RvcnksIHR1cm5fbnVtYmVyKTtcbiAgY29uc3QgW25leHRfYm9hcmQsIHN0YXR1c10gPSBuZXh0X3N0YXRlKGJvYXJkLCB1c2VyX2lucHV0KTtcbiAgYm9hcmRfaGlzdG9yeS5wdXNoKFtuZXh0X2JvYXJkLCBzdGF0dXNdKTtcbiAgcmV0dXJuIHR1cm5fbnVtYmVyICsgMTtcbn1cblxuLy/nj77lnKjjga7nm6TpnaLjgajmrKHjga7nnYDmiYvjgYzkuI7jgYjjgonjgozjgabmrKHjga7nm6TpnaLjgpJoaXN0b3J544Gr5L+d5a2Y44GZ44KLXG4vKlxuZXhwb3J0IGZ1bmN0aW9uIGtlZXBfbmV4dF9zdGF0ZShcbiAgYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPixcbiAgcDogW251bWJlciwgbnVtYmVyXSxcbiAgYm9hcmRfaGlzdG9yeTogQm9hcmRfaGlzdG9yeSxcbiAgdHVybl9udW1iZXI6IG51bWJlclxuKTpudW1iZXJ7XG4gIGxldCB0ZW1wb3JhcnlfYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoYm9hcmRfaGlzdG9yeVt0dXJuX251bWJlcl0hWzBdKVxuICBpZiAoaXNfdmFsaWRfbW92ZShwLCB0ZW1wb3JhcnlfYm9hcmQpICYmIHB1dF9zdG9uZShwLCBib2FyZC5ibGFja190dXJuLCB0ZW1wb3JhcnlfYm9hcmQpKSB7XG4gICAgY29uc3QgY2FuX2ZsaXBfcGxhY2VzID0gZmxpcGFibGVfYWxsX3BsYWNlcyhwLCBib2FyZCk7XG4gICAgZm9yIChjb25zdCBlbGVtZW50cyBvZiBjYW5fZmxpcF9wbGFjZXMpIHtcbiAgICAgIGZsaXBfc3RvbmUoZWxlbWVudHMsIHRlbXBvcmFyeV9ib2FyZCk7XG4gICAgfVxuICAgIHRlbXBvcmFyeV9ib2FyZCA9IG1vdmVfdHVybih0ZW1wb3JhcnlfYm9hcmQpO1xuICAgIGlmIChhbGxfdmFsaWRfbW92ZXModGVtcG9yYXJ5X2JvYXJkKS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBwdXRfbnVtYmVyID0gYWRkX2JvYXJkX2hpc3RvcnkoZGVlcF9jb3B5X2JvYXJkKHRlbXBvcmFyeV9ib2FyZCksIGJvYXJkX2hpc3RvcnksIEdhbWVzdGF0dXMuT2ssIHR1cm5fbnVtYmVyKTtcbiAgICAgIHJldHVybiBwdXRfbnVtYmVyXG4gICAgfVxuXG4gICAgaWYgKGFsbF92YWxpZF9tb3Zlcyh0ZW1wb3JhcnlfYm9hcmQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGVtcG9yYXJ5X2JvYXJkID0gbW92ZV90dXJuKHRlbXBvcmFyeV9ib2FyZCk7XG4gICAgICBpZiAoYWxsX3ZhbGlkX21vdmVzKHRlbXBvcmFyeV9ib2FyZCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHB1dF9udW1iZXIgPSBhZGRfYm9hcmRfaGlzdG9yeShkZWVwX2NvcHlfYm9hcmQodGVtcG9yYXJ5X2JvYXJkKSwgYm9hcmRfaGlzdG9yeSwgR2FtZXN0YXR1cy5FbmQsIHR1cm5fbnVtYmVyKTtcbiAgICAgICAgcmV0dXJuIHB1dF9udW1iZXJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHB1dF9udW1iZXIgPSBhZGRfYm9hcmRfaGlzdG9yeShkZWVwX2NvcHlfYm9hcmQodGVtcG9yYXJ5X2JvYXJkKSwgYm9hcmRfaGlzdG9yeSwgR2FtZXN0YXR1cy5QYXNzLCB0dXJuX251bWJlcik7XG4gICAgICAgIHJldHVybiBwdXRfbnVtYmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHVybl9udW1iZXJcbn1cbiovXG5cbmV4cG9ydCBmdW5jdGlvbiBkZWVwX2NvcHlfYm9hcmRfYXJyYXkoXG4gIGJvYXJkX2FycmF5OiBSZWFkb25seTxCb2FyZEFycmF5PlxuKTogQm9hcmRBcnJheSB7XG4gIHJldHVybiBib2FyZF9hcnJheS5tYXAoKHIpID0+IFsuLi5yXSkgYXMgQm9hcmRBcnJheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBfY29weV9ib2FyZChib2FyZDogUmVhZG9ubHk8Qm9hcmQ+KTogQm9hcmQge1xuICByZXR1cm4ge1xuICAgIC4uLmJvYXJkLFxuICAgIGJsYWNrOiBkZWVwX2NvcHlfYm9hcmRfYXJyYXkoYm9hcmQuYmxhY2spLFxuICAgIHdoaXRlOiBkZWVwX2NvcHlfYm9hcmRfYXJyYXkoYm9hcmQud2hpdGUpLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkX2JvYXJkX2hpc3RvcnkoXG4gIGJvYXJkOiBSZWFkb25seTxCb2FyZD4sXG4gIGJvYXJkX2hpc3Rvcnk6IEJvYXJkX2hpc3RvcnksXG4gIHN0YXR1czogR2FtZXN0YXR1cyxcbiAgdHVybl9udW1iZXI6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgYm9hcmRfaGlzdG9yeS5wdXNoKFtkZWVwX2NvcHlfYm9hcmQoYm9hcmQpLCBzdGF0dXNdKTtcbiAgY29uc3QgcHV0X3R1cm5fbnVtYmVyID0gdHVybl9udW1iZXIgKyAxO1xuICByZXR1cm4gcHV0X3R1cm5fbnVtYmVyO1xufVxuXG4vL2hpc3Rvcnnjga/mtojjgZXjgZrjgatib2FlZOOBjDHjgr/jg7zjg7PmiLvjgotcbmV4cG9ydCBmdW5jdGlvbiByZXR1cm5fb25lX3R1cm4oXG4gIGJvYXJkX2hpc3Rvcnk6IEJvYXJkX2hpc3RvcnksXG4gIHR1cm5fbnVtYmVyOiBudW1iZXJcbik6IEJvYXJkIHtcbiAgaWYgKHR1cm5fbnVtYmVyID49IDEpIHtcbiAgICBjb25zdCBib2FyZCA9IGRlZXBfY29weV9ib2FyZChib2FyZF9oaXN0b3J5W3R1cm5fbnVtYmVyIC0gMV0hWzBdKTtcbiAgICB0dXJuX251bWJlciA9IHR1cm5fbnVtYmVyIC0gMTtcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cbiAgcmV0dXJuIGRlZXBfY29weV9ib2FyZChib2FyZF9oaXN0b3J5W3R1cm5fbnVtYmVyXSFbMF0pO1xufVxuXG4vL2hpc3Rvcnnjga/mtojjgZXjgZrjgatib2FlZOOBjDHjgr/jg7zjg7PpgLLjgoBcbmV4cG9ydCBmdW5jdGlvbiBuZXh0X29uZV90dXJuKFxuICBib2FyZF9oaXN0b3J5OiBCb2FyZF9oaXN0b3J5LFxuICB0dXJuX251bWJlcjogbnVtYmVyXG4pOiBCb2FyZCB7XG4gIGlmICh0dXJuX251bWJlciA8IGJvYXJkX2hpc3RvcnkubGVuZ3RoIC0gMSkge1xuICAgIGNvbnN0IGJvYXJkID0gZGVlcF9jb3B5X2JvYXJkKGJvYXJkX2hpc3RvcnlbdHVybl9udW1iZXIgKyAxXSFbMF0pO1xuICAgIHR1cm5fbnVtYmVyKys7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG4gIHJldHVybiBkZWVwX2NvcHlfYm9hcmQoYm9hcmRfaGlzdG9yeVt0dXJuX251bWJlcl0hWzBdKTtcbn1cblxuLy/jgZ3jga5ib2FyZOS7pemZjeOBrmhpc3RvcnnjgpLmtojjgZlcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVfbGF0ZXJfdHVybihcbiAgYm9hcmRfaGlzdG9yeTogQm9hcmRfaGlzdG9yeSxcbiAgdHVybl9udW1iZXI6IG51bWJlclxuKTogQm9hcmRfaGlzdG9yeSB7XG4gIGlmIChib2FyZF9oaXN0b3J5Lmxlbmd0aCA+IDEpIHtcbiAgICBjb25zdCBudW1iZXJfb2ZfZGVsZXRlID0gYm9hcmRfaGlzdG9yeS5sZW5ndGggLSB0dXJuX251bWJlciAtIDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJfb2ZfZGVsZXRlOyBpKyspIHtcbiAgICAgIGJvYXJkX2hpc3RvcnkucG9wKCk7XG4gICAgfVxuICAgIHJldHVybiBib2FyZF9oaXN0b3J5O1xuICB9XG4gIHJldHVybiBib2FyZF9oaXN0b3J5O1xufVxuXG4vL+WJjeWbnuOBruOBneOBruiJsuOBruOCv+ODvOODs+OBvuOBp+aIu+OCi1xuZXhwb3J0IGZ1bmN0aW9uIGJhY2tfdG9fbXlfdHVybihcbiAgYm9hcmRfaGlzdG9yeTogQm9hcmRfaGlzdG9yeSxcbiAgdHVybl9udW1iZXI6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgaWYgKHR1cm5fbnVtYmVyID4gMSkge1xuICAgIGNvbnN0IGlzX2JsYWNrX3R1cm4gPSBib2FyZF9oaXN0b3J5W3R1cm5fbnVtYmVyXSFbMF0uYmxhY2tfdHVybjtcbiAgICB0dXJuX251bWJlci0tO1xuICAgIGxldCBiZWZvcmVfYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoYm9hcmRfaGlzdG9yeVt0dXJuX251bWJlcl0hWzBdKTtcbiAgICB3aGlsZSAoaXNfYmxhY2tfdHVybiAhPT0gYmVmb3JlX2JvYXJkLmJsYWNrX3R1cm4pIHtcbiAgICAgIHR1cm5fbnVtYmVyLS07XG4gICAgICBiZWZvcmVfYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoYm9hcmRfaGlzdG9yeVt0dXJuX251bWJlcl0hWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHR1cm5fbnVtYmVyO1xuICB9XG4gIHJldHVybiB0dXJuX251bWJlcjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbmV3X3JhbmRvbV9wbGF5ZXIgfSBmcm9tICcuL2FpJztcbmltcG9ydCB7IGRyYXdfYm9hcmQsIGRyYXdfZ3JpZCwgZHJhd19waWVjZSwgZHJhd19waWVjZXMgfSBmcm9tICcuL2RyYXdlcic7XG5pbXBvcnQgeyBjcmVhdGVfZ2FtZSwgcHV0X2NhbmNlbF9idXR0b24sIHN0YXJ0X2xvb3AgfSBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHtcbiAgQm9hcmQsXG4gIGNhbGNfc2NvcmUsXG4gIGdlbmVyYXRlX2luaXRpYWxfYm9hcmQsXG4gIHN0cmluZ2lmeV9ib2FyZCxcbiAgcHV0X3N0b25lLFxuICBmbGlwX3N0b25lLFxuICBtb3ZlX3R1cm4sXG4gIHBhcnNlX2Nvb3JkLFxuICBpc192YWxpZF9tb3ZlLFxuICBhZGRfdmVjLFxuICBqdWRnZV9mbGlwXzFkLFxuICBESVJFQ1RJT05TLFxuICBhbGxfdmFsaWRfbW92ZXMsXG4gIG5leHRfc3RhdGUsXG4gIEdhbWVzdGF0dXMsXG4gIGZsaXBhYmxlX2FsbF9wbGFjZXMsXG59IGZyb20gJy4vb3RoZWxsbyc7XG5cbmNvbnN0IG1haW4gPSAoKSA9PiB7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgY29uc3QgbWVzc2FnZV9ob2xkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZScpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgY29uc3Qgc3RhcnRfYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgJ3N0YXJ0X2J1dHRvbidcbiAgKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3QgY2FuY2VsX2J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICdjYW5jZWxfYnV0dG9uJ1xuICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICBjb25zdCBzZWxlY3RfYmxhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnc2VsZWN0X2JsYWNrJ1xuICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICBjb25zdCBzZWxlY3Rfd2hpdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnc2VsZWN0X3doaXRlJ1xuICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICBjb25zdCBzZWxlY3RfQUliYXR0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnc2VsZWN0X0FJYmF0dGxlJ1xuICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuXG4gIHN0YXJ0X2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBjYW5jZWxfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgY29uc3QgZ2FtZSA9IGNyZWF0ZV9nYW1lKFxuICAgIGNhbnZhcyxcbiAgICBtZXNzYWdlX2hvbGRlcixcbiAgICBzdGFydF9idXR0b24sXG4gICAgY2FuY2VsX2J1dHRvbixcbiAgICBzZWxlY3RfYmxhY2ssXG4gICAgc2VsZWN0X3doaXRlLFxuICAgIHNlbGVjdF9BSWJhdHRsZVxuICApO1xuICBwdXRfY2FuY2VsX2J1dHRvbihnYW1lLCBnYW1lLmNhbmNlbF9idXR0b24pO1xuICBkcmF3X2JvYXJkKGdhbWUuYm9hcmQsIGNhbnZhcyk7XG4gIHN0YXJ0X2xvb3AoZ2FtZSwgY2FudmFzKTtcbn07XG5cbm1haW4oKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==