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
/* harmony export */   "minimax_stone_count_agent": () => (/* binding */ minimax_stone_count_agent),
/* harmony export */   "alphabeta_stone_count_agent": () => (/* binding */ alphabeta_stone_count_agent)
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
function minimax_stone_count_agent() {
    return {
        next_move: minimax_stone_count_move,
    };
}
function minimax_stone_count_move(board) {
    const score = eval_by_search(board, 4);
    return score[1];
}
function eval_by_search(board, depth) {
    const scores = [];
    const is_black_turn = board.black_turn;
    if (depth <= 1) {
        const [b_score, w_score] = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.calc_score)(board);
        if (is_black_turn) {
            return [b_score, [0, 0]];
        }
        else {
            return [w_score, [0, 0]];
        }
    }
    else {
        const can_put_place = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.all_valid_moves)(board);
        for (const input_place of can_put_place) {
            const temporary_board = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.deep_copy_board)(board);
            const [next_board, status] = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.next_state)(temporary_board, input_place);
            if (status !== _othello__WEBPACK_IMPORTED_MODULE_0__.Gamestatus.Pass) {
                const score = eval_by_search(next_board, depth - 1);
                scores.push([-score[0], input_place]);
            }
            else {
                const score = eval_by_search(next_board, depth - 2);
                scores.push([score[0], input_place]);
            }
        }
        scores.sort(function (a, b) {
            if (a[0] > b[0])
                return -1;
            if (a[0] < b[0])
                return 1;
            return 0;
        });
        if (scores[0] !== undefined) {
            return scores[0];
        }
    }
    return [0, [0, 0]];
}
function alphabeta_stone_count_agent() {
    return {
        next_move: alphabeta_stone_count_move,
    };
}
function alphabeta_stone_count_move(board) {
    const score = alphabeta_eval_by_search(board, 6);
    return score[1];
}
function alphabeta_eval_by_search(board, depth) {
    const scores = [];
    const is_black_turn = board.black_turn;
    if (depth <= 1) {
        const [b_score, w_score] = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.calc_score)(board);
        if (is_black_turn) {
            return [b_score, [0, 0]];
        }
        else {
            return [w_score, [0, 0]];
        }
    }
    else {
        const can_put_place = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.all_valid_moves)(board);
        let alpha = -1;
        let beta = 65;
        for (const input_place of can_put_place) {
            const temporary_board = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.deep_copy_board)(board);
            const [next_board, status] = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.next_state)(temporary_board, input_place);
            if (status !== _othello__WEBPACK_IMPORTED_MODULE_0__.Gamestatus.Pass) {
                const score = alphabeta_eval_by_search(next_board, depth - 1);
                if (depth % 2 === 1 && score[0] > alpha) {
                    alpha = score[0];
                    scores.push([score[0], input_place]);
                }
                else if (depth % 2 === 0 && score[0] < beta) {
                    beta = score[0];
                    scores.push([score[0], input_place]);
                }
            }
            else {
                const score = alphabeta_eval_by_search(next_board, depth - 2);
                if (depth % 2 === 1 && score[0] > alpha) {
                    alpha = score[0];
                    scores.push([score[0], input_place]);
                }
                else if (depth % 2 === 0 && score[0] < beta) {
                    beta = score[0];
                    scores.push([score[0], input_place]);
                }
            }
        }
        if (depth % 2 === 1) {
            scores.sort(function (a, b) {
                if (a[0] > b[0])
                    return -1;
                if (a[0] < b[0])
                    return 1;
                return 0;
            });
            if (scores[0] !== undefined) {
                return scores[0];
            }
        }
        else if (depth % 2 === 0) {
            scores.sort(function (a, b) {
                if (a[0] < b[0])
                    return -1;
                if (a[0] > b[0])
                    return 1;
                return 0;
            });
            if (scores[0] !== undefined) {
                return scores[0];
            }
        }
    }
    return [0, [0, 0]];
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
        game.white_player = (0,_ai__WEBPACK_IMPORTED_MODULE_0__.alphabeta_stone_count_agent)();
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
        game.black_player = (0,_ai__WEBPACK_IMPORTED_MODULE_0__.alphabeta_stone_count_agent)();
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
        game.black_player = (0,_ai__WEBPACK_IMPORTED_MODULE_0__.minimax_stone_count_agent)();
        game.white_player = (0,_ai__WEBPACK_IMPORTED_MODULE_0__.alphabeta_stone_count_agent)();
        game.message_holder.innerText =
            '黒の手番です。';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL290aGVsbG8vLi9zcmMvYWkudHMiLCJ3ZWJwYWNrOi8vb3RoZWxsby8uL3NyYy9kcmF3ZXIudHMiLCJ3ZWJwYWNrOi8vb3RoZWxsby8uL3NyYy9nYW1lLnRzIiwid2VicGFjazovL290aGVsbG8vLi9zcmMvb3RoZWxsby50cyIsIndlYnBhY2s6Ly9vdGhlbGxvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL290aGVsbG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL290aGVsbG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vdGhlbGxvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3RoZWxsby8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBhbGxfdmFsaWRfbW92ZXMsXG4gIEJvYXJkLFxuICBjYWxjX3Njb3JlLFxuICBkZWVwX2NvcHlfYm9hcmQsXG4gIGRlZXBfY29weV9ib2FyZF9hcnJheSxcbiAgR2FtZXN0YXR1cyxcbiAgbmV4dF9zdGF0ZSxcbn0gZnJvbSAnLi9vdGhlbGxvJztcblxuZXhwb3J0IHR5cGUgQUlBZ2VudCA9IHtcbiAgbmV4dF9tb3ZlKGJvYXJkOiBSZWFkb25seTxCb2FyZD4pOiBbbnVtYmVyLCBudW1iZXJdO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld19yYW5kb21fcGxheWVyKCk6IEFJQWdlbnQge1xuICByZXR1cm4ge1xuICAgIG5leHRfbW92ZTogKGJvYXJkOiBSZWFkb25seTxCb2FyZD4pID0+IHtcbiAgICAgIGNvbnN0IGNhbl9wdXRfcGxhY2UgPSBhbGxfdmFsaWRfbW92ZXMoYm9hcmQpO1xuICAgICAgY29uc3QgcHV0X3BsYWNlID1cbiAgICAgICAgY2FuX3B1dF9wbGFjZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjYW5fcHV0X3BsYWNlLmxlbmd0aCldO1xuICAgICAgaWYgKHB1dF9wbGFjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBwdXRfcGxhY2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gWy0xLCAtMV07XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld193ZWFrX2FnZW50KCk6IEFJQWdlbnQge1xuICByZXR1cm4ge1xuICAgIG5leHRfbW92ZTogd2Vha19hZ2VudF9tb3ZlLFxuICB9O1xufVxuXG50eXBlIFNjb3JlID0gW251bWJlciwgW251bWJlciwgbnVtYmVyXV07XG5cbmZ1bmN0aW9uIHdlYWtfYWdlbnRfbW92ZShib2FyZDogUmVhZG9ubHk8Qm9hcmQ+KTogW251bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IGNhbl9wdXRfcGxhY2UgPSBhbGxfdmFsaWRfbW92ZXMoYm9hcmQpO1xuICBjb25zdCBpc19ibGFja190dXJuID0gYm9hcmQuYmxhY2tfdHVybjtcbiAgY29uc3Qgc2NvcmVzOiBTY29yZVtdID0gW107XG4gIGZvciAoY29uc3QgaW5wdXRfcGxhY2Ugb2YgY2FuX3B1dF9wbGFjZSkge1xuICAgIGNvbnN0IHRlbXBvcmFyeV9ib2FyZCA9IGRlZXBfY29weV9ib2FyZChib2FyZCk7XG4gICAgY29uc3QgW25leHRfYm9hcmQsIHN0YXR1c10gPSBuZXh0X3N0YXRlKHRlbXBvcmFyeV9ib2FyZCwgaW5wdXRfcGxhY2UpO1xuICAgIGNvbnN0IFtiX3Njb3JlLCB3X3Njb3JlXSA9IGNhbGNfc2NvcmUobmV4dF9ib2FyZCk7XG4gICAgaWYgKGlzX2JsYWNrX3R1cm4pIHtcbiAgICAgIHNjb3Jlcy5wdXNoKFtiX3Njb3JlLCBpbnB1dF9wbGFjZV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY29yZXMucHVzaChbd19zY29yZSwgaW5wdXRfcGxhY2VdKTtcbiAgICB9XG4gIH1cbiAgc2NvcmVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBpZiAoYVswXSA+IGJbMF0pIHJldHVybiAtMTtcbiAgICBpZiAoYVswXSA8IGJbMF0pIHJldHVybiAxO1xuICAgIHJldHVybiAwO1xuICB9KTtcbiAgcmV0dXJuIHNjb3Jlc1swXSFbMV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5pbWF4X3N0b25lX2NvdW50X2FnZW50KCk6IEFJQWdlbnQge1xuICByZXR1cm4ge1xuICAgIG5leHRfbW92ZTogbWluaW1heF9zdG9uZV9jb3VudF9tb3ZlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBtaW5pbWF4X3N0b25lX2NvdW50X21vdmUoYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPik6IFtudW1iZXIsIG51bWJlcl0ge1xuICBjb25zdCBzY29yZSA9IGV2YWxfYnlfc2VhcmNoKGJvYXJkLCA0KTtcbiAgcmV0dXJuIHNjb3JlWzFdO1xufVxuXG5mdW5jdGlvbiBldmFsX2J5X3NlYXJjaChib2FyZDogUmVhZG9ubHk8Qm9hcmQ+LCBkZXB0aDogbnVtYmVyKTogU2NvcmUge1xuICBjb25zdCBzY29yZXM6IFNjb3JlW10gPSBbXTtcbiAgY29uc3QgaXNfYmxhY2tfdHVybiA9IGJvYXJkLmJsYWNrX3R1cm47XG4gIGlmIChkZXB0aCA8PSAxKSB7XG4gICAgY29uc3QgW2Jfc2NvcmUsIHdfc2NvcmVdID0gY2FsY19zY29yZShib2FyZCk7XG4gICAgaWYgKGlzX2JsYWNrX3R1cm4pIHtcbiAgICAgIHJldHVybiBbYl9zY29yZSwgWzAsIDBdXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFt3X3Njb3JlLCBbMCwgMF1dO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBjYW5fcHV0X3BsYWNlID0gYWxsX3ZhbGlkX21vdmVzKGJvYXJkKTtcbiAgICBmb3IgKGNvbnN0IGlucHV0X3BsYWNlIG9mIGNhbl9wdXRfcGxhY2UpIHtcbiAgICAgIGNvbnN0IHRlbXBvcmFyeV9ib2FyZCA9IGRlZXBfY29weV9ib2FyZChib2FyZCk7XG4gICAgICBjb25zdCBbbmV4dF9ib2FyZCwgc3RhdHVzXSA9IG5leHRfc3RhdGUodGVtcG9yYXJ5X2JvYXJkLCBpbnB1dF9wbGFjZSk7XG5cbiAgICAgIGlmIChzdGF0dXMgIT09IEdhbWVzdGF0dXMuUGFzcykge1xuICAgICAgICBjb25zdCBzY29yZSA9IGV2YWxfYnlfc2VhcmNoKG5leHRfYm9hcmQsIGRlcHRoIC0gMSk7XG4gICAgICAgIHNjb3Jlcy5wdXNoKFstc2NvcmVbMF0sIGlucHV0X3BsYWNlXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzY29yZSA9IGV2YWxfYnlfc2VhcmNoKG5leHRfYm9hcmQsIGRlcHRoIC0gMik7XG4gICAgICAgIHNjb3Jlcy5wdXNoKFtzY29yZVswXSwgaW5wdXRfcGxhY2VdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2NvcmVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIGlmIChhWzBdID4gYlswXSkgcmV0dXJuIC0xO1xuICAgICAgaWYgKGFbMF0gPCBiWzBdKSByZXR1cm4gMTtcbiAgICAgIHJldHVybiAwO1xuICAgIH0pO1xuICAgIGlmIChzY29yZXNbMF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHNjb3Jlc1swXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFswLCBbMCwgMF1dO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxwaGFiZXRhX3N0b25lX2NvdW50X2FnZW50KCk6IEFJQWdlbnQge1xuICByZXR1cm4ge1xuICAgIG5leHRfbW92ZTogYWxwaGFiZXRhX3N0b25lX2NvdW50X21vdmUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGFscGhhYmV0YV9zdG9uZV9jb3VudF9tb3ZlKGJvYXJkOiBSZWFkb25seTxCb2FyZD4pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgY29uc3Qgc2NvcmUgPSBhbHBoYWJldGFfZXZhbF9ieV9zZWFyY2goYm9hcmQsIDYpO1xuICByZXR1cm4gc2NvcmVbMV07XG59XG5cbmZ1bmN0aW9uIGFscGhhYmV0YV9ldmFsX2J5X3NlYXJjaChcbiAgYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPixcbiAgZGVwdGg6IG51bWJlclxuKTogU2NvcmUge1xuICBjb25zdCBzY29yZXM6IFNjb3JlW10gPSBbXTtcbiAgY29uc3QgaXNfYmxhY2tfdHVybiA9IGJvYXJkLmJsYWNrX3R1cm47XG4gIGlmIChkZXB0aCA8PSAxKSB7XG4gICAgY29uc3QgW2Jfc2NvcmUsIHdfc2NvcmVdID0gY2FsY19zY29yZShib2FyZCk7XG4gICAgaWYgKGlzX2JsYWNrX3R1cm4pIHtcbiAgICAgIHJldHVybiBbYl9zY29yZSwgWzAsIDBdXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFt3X3Njb3JlLCBbMCwgMF1dO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBjYW5fcHV0X3BsYWNlID0gYWxsX3ZhbGlkX21vdmVzKGJvYXJkKTtcbiAgICBsZXQgYWxwaGEgPSAtMTtcbiAgICBsZXQgYmV0YSA9IDY1O1xuICAgIGZvciAoY29uc3QgaW5wdXRfcGxhY2Ugb2YgY2FuX3B1dF9wbGFjZSkge1xuICAgICAgY29uc3QgdGVtcG9yYXJ5X2JvYXJkID0gZGVlcF9jb3B5X2JvYXJkKGJvYXJkKTtcbiAgICAgIGNvbnN0IFtuZXh0X2JvYXJkLCBzdGF0dXNdID0gbmV4dF9zdGF0ZSh0ZW1wb3JhcnlfYm9hcmQsIGlucHV0X3BsYWNlKTtcblxuICAgICAgaWYgKHN0YXR1cyAhPT0gR2FtZXN0YXR1cy5QYXNzKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlID0gYWxwaGFiZXRhX2V2YWxfYnlfc2VhcmNoKG5leHRfYm9hcmQsIGRlcHRoIC0gMSk7XG4gICAgICAgIGlmIChkZXB0aCAlIDIgPT09IDEgJiYgc2NvcmVbMF0gPiBhbHBoYSkge1xuICAgICAgICAgIGFscGhhID0gc2NvcmVbMF07XG4gICAgICAgICAgc2NvcmVzLnB1c2goW3Njb3JlWzBdLCBpbnB1dF9wbGFjZV0pO1xuICAgICAgICB9IGVsc2UgaWYgKGRlcHRoICUgMiA9PT0gMCAmJiBzY29yZVswXSA8IGJldGEpIHtcbiAgICAgICAgICBiZXRhID0gc2NvcmVbMF07XG4gICAgICAgICAgc2NvcmVzLnB1c2goW3Njb3JlWzBdLCBpbnB1dF9wbGFjZV0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzY29yZSA9IGFscGhhYmV0YV9ldmFsX2J5X3NlYXJjaChuZXh0X2JvYXJkLCBkZXB0aCAtIDIpO1xuICAgICAgICBpZiAoZGVwdGggJSAyID09PSAxICYmIHNjb3JlWzBdID4gYWxwaGEpIHtcbiAgICAgICAgICBhbHBoYSA9IHNjb3JlWzBdO1xuICAgICAgICAgIHNjb3Jlcy5wdXNoKFtzY29yZVswXSwgaW5wdXRfcGxhY2VdKTtcbiAgICAgICAgfSBlbHNlIGlmIChkZXB0aCAlIDIgPT09IDAgJiYgc2NvcmVbMF0gPCBiZXRhKSB7XG4gICAgICAgICAgYmV0YSA9IHNjb3JlWzBdO1xuICAgICAgICAgIHNjb3Jlcy5wdXNoKFtzY29yZVswXSwgaW5wdXRfcGxhY2VdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkZXB0aCAlIDIgPT09IDEpIHtcbiAgICAgIHNjb3Jlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIGlmIChhWzBdID4gYlswXSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYVswXSA8IGJbMF0pIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0pO1xuICAgICAgaWYgKHNjb3Jlc1swXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBzY29yZXNbMF07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkZXB0aCAlIDIgPT09IDApIHtcbiAgICAgIHNjb3Jlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIGlmIChhWzBdIDwgYlswXSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYVswXSA+IGJbMF0pIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0pO1xuICAgICAgaWYgKHNjb3Jlc1swXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBzY29yZXNbMF07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBbMCwgWzAsIDBdXTtcbn1cbiIsImltcG9ydCB7XG4gIEJvYXJkLFxuICBjYWxjX3Njb3JlLFxuICBnZW5lcmF0ZV9pbml0aWFsX2JvYXJkLFxuICBzdHJpbmdpZnlfYm9hcmQsXG4gIHB1dF9zdG9uZSxcbiAgZmxpcF9zdG9uZSxcbiAgbW92ZV90dXJuLFxuICBwYXJzZV9jb29yZCxcbiAgaXNfdmFsaWRfbW92ZSxcbiAgYWRkX3ZlYyxcbiAganVkZ2VfZmxpcF8xZCxcbiAgRElSRUNUSU9OUyxcbiAgYWxsX3ZhbGlkX21vdmVzLFxuICBmbGlwYWJsZV9hbGxfcGxhY2VzLFxuICBuZXh0X3N0YXRlLFxuICBHYW1lc3RhdHVzLFxufSBmcm9tICcuL290aGVsbG8nO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydF92ZWMoXG4gIHg6IG51bWJlcixcbiAgeTogbnVtYmVyLFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG4pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgbGV0IGhpZ2h0X21hZyA9IGNhbnZhcy5oZWlnaHQgLyAxMDA7XG4gIGxldCB3aWR0aF9tYWcgPSBjYW52YXMud2lkdGggLyAxMDA7XG4gIHJldHVybiBbeCAqIGhpZ2h0X21hZywgeSAqIHdpZHRoX21hZ107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X3NjYWwoYTogbnVtYmVyLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogbnVtYmVyIHtcbiAgbGV0IHNjYWxfbWFnID0gY2FudmFzLmhlaWdodCAvIDEwMDtcbiAgcmV0dXJuIGEgKiBzY2FsX21hZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdfZ3JpZChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogdm9pZCB7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAvLyAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgbGV0IFtmaWVsZF9zcF94LCBmaWVsZF9zcF95XSA9IGNvbnZlcnRfdmVjKDAsIDAsIGNhbnZhcyk7XG4gIGxldCBmaWVsZF9zaXplX2xlbmd0aCA9IGNvbnZlcnRfc2NhbCgxMDAsIGNhbnZhcyk7XG5cbiAgaWYgKGN0eCAhPSB1bmRlZmluZWQpIHtcbiAgICAvLyDln7rnpI7jga7nm6TpnaLplbfmlrnlvaLjgavloZfjgorjgaTjgbbjgZlcbiAgICBjdHguZmlsbFN0eWxlID0gJ2dyZWVuJztcbiAgICBjdHguZmlsbFJlY3QoZmllbGRfc3BfeCwgZmllbGRfc3BfeSwgZmllbGRfc2l6ZV9sZW5ndGgsIGZpZWxkX3NpemVfbGVuZ3RoKTtcblxuICAgIC8vIOe4pue3muOCkuOBsuOBj1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdncmF5JztcbiAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhmaWVsZF9zcF94ICsgKGZpZWxkX3NpemVfbGVuZ3RoIC8gOCkgKiBpLCBmaWVsZF9zcF95KTtcbiAgICAgIGN0eC5saW5lVG8oXG4gICAgICAgIGZpZWxkX3NwX3ggKyAoZmllbGRfc2l6ZV9sZW5ndGggLyA4KSAqIGksXG4gICAgICAgIGZpZWxkX3NwX3kgKyBmaWVsZF9zaXplX2xlbmd0aFxuICAgICAgKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICAvLyDmqKrnt5rjgpLjgbLjgY9cbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnZ3JheSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oZmllbGRfc3BfeCwgZmllbGRfc3BfeSArIChmaWVsZF9zaXplX2xlbmd0aCAvIDgpICogaSk7XG4gICAgICBjdHgubGluZVRvKFxuICAgICAgICBmaWVsZF9zcF94ICsgZmllbGRfc2l6ZV9sZW5ndGgsXG4gICAgICAgIGZpZWxkX3NwX3kgKyAoZmllbGRfc2l6ZV9sZW5ndGggLyA4KSAqIGlcbiAgICAgICk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3X3BpZWNlKFxuICBpOiBudW1iZXIsXG4gIGo6IG51bWJlcixcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgY29sb3I6IGJvb2xlYW5cbik6IHZvaWQge1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgLy8gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuXG4gIGNvbnN0IFtjZW50ZXJfeCwgY2VudGVyX3ldID0gY29udmVydF92ZWMoXG4gICAgMTAwIC8gMTYgKyAoaiAqIDEwMCkgLyA4LFxuICAgIDEwMCAvIDE2ICsgKGkgKiAxMDApIC8gOCxcbiAgICBjYW52YXNcbiAgKTtcbiAgY29uc3QgciA9IGNvbnZlcnRfc2NhbCg1LCBjYW52YXMpO1xuXG4gIGlmIChjdHggIT0gdW5kZWZpbmVkKSB7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ2dyYXknO1xuICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgIGlmIChjb2xvciA9PT0gdHJ1ZSkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgIH1cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhjZW50ZXJfeCwgY2VudGVyX3ksIHIsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdfY2FuX3B1dF9wbGFjZShcbiAgaTogbnVtYmVyLFxuICBqOiBudW1iZXIsXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcbik6IHZvaWQge1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgLy8gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuXG4gIGNvbnN0IFtjZW50ZXJfeCwgY2VudGVyX3ldID0gY29udmVydF92ZWMoXG4gICAgMTAwIC8gMTYgKyAoaiAqIDEwMCkgLyA4LFxuICAgIDEwMCAvIDE2ICsgKGkgKiAxMDApIC8gOCxcbiAgICBjYW52YXNcbiAgKTtcbiAgY29uc3QgciA9IGNvbnZlcnRfc2NhbCgyLCBjYW52YXMpO1xuXG4gIGlmIChjdHggIT0gdW5kZWZpbmVkKSB7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ2dyYXknO1xuICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnZ3JheSc7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoY2VudGVyX3gsIGNlbnRlcl95LCByLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3X3BpZWNlcyhib2FyZDogQm9hcmQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgaWYgKGJvYXJkLmJsYWNrW2ldIVtqXSkge1xuICAgICAgICBkcmF3X3BpZWNlKGksIGosIGNhbnZhcywgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkLndoaXRlW2ldIVtqXSkge1xuICAgICAgICBkcmF3X3BpZWNlKGksIGosIGNhbnZhcywgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd19ib2FyZChib2FyZDogQm9hcmQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGNvbnN0IGZpZWxkX3NpemUgPSBbXG4gICAgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCxcbiAgICB3aW5kb3cuaW5uZXJIZWlnaHQgLSAxMDAsXG4gICAgNjAwLFxuICBdLnJlZHVjZSgoYSwgYikgPT4gTWF0aC5taW4oYSwgYikpO1xuICBjYW52YXMuaGVpZ2h0ID0gZmllbGRfc2l6ZTtcbiAgY2FudmFzLndpZHRoID0gZmllbGRfc2l6ZTtcblxuICBpZiAoY3R4ICE9IHVuZGVmaW5lZCkge1xuICAgIGN0eC5jbGVhclJlY3QoXG4gICAgICAuLi5jb252ZXJ0X3ZlYygwLCAwLCBjYW52YXMpLFxuICAgICAgLi4uY29udmVydF92ZWMoMTAwLCAxMDAsIGNhbnZhcylcbiAgICApO1xuICB9XG4gIGRyYXdfZ3JpZChjYW52YXMpO1xuICBkcmF3X3BpZWNlcyhib2FyZCwgY2FudmFzKTtcbiAgYWxsX3ZhbGlkX21vdmVzKGJvYXJkKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgZHJhd19jYW5fcHV0X3BsYWNlKGVsZW1lbnRbMF0sIGVsZW1lbnRbMV0sIGNhbnZhcyk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5wdXRfY29udmVydF9wbGFjZShcbiAgdXNlcl9pbnB1dDogW251bWJlciwgbnVtYmVyXSxcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxuKTogW251bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IHVzZXJfaW5wdXRfMTAwID0gW1xuICAgICh1c2VyX2lucHV0WzBdIC8gY2FudmFzLmhlaWdodCkgKiAxMDAsXG4gICAgKHVzZXJfaW5wdXRbMV0gLyBjYW52YXMud2lkdGgpICogMTAwLFxuICBdO1xuICBjb25zdCBpID0gTWF0aC5yb3VuZCgodXNlcl9pbnB1dF8xMDBbMF0hIC0gNi43NSkgLyAxMi41KTtcbiAgY29uc3QgaiA9IE1hdGgucm91bmQoKHVzZXJfaW5wdXRfMTAwWzFdISAtIDYuNzUpIC8gMTIuNSk7XG4gIHJldHVybiBbaSwgal07XG59XG4iLCJpbXBvcnQgeyBiYXNlbmFtZSB9IGZyb20gJ3BhdGgvcG9zaXgnO1xuaW1wb3J0IHsgZ2V0U3lzdGVtRXJyb3JNYXAgfSBmcm9tICd1dGlsJztcbmltcG9ydCB7XG4gIEFJQWdlbnQsXG4gIGFscGhhYmV0YV9zdG9uZV9jb3VudF9hZ2VudCxcbiAgbWluaW1heF9zdG9uZV9jb3VudF9hZ2VudCxcbiAgbmV3X3JhbmRvbV9wbGF5ZXIsXG4gIG5ld193ZWFrX2FnZW50LFxufSBmcm9tICcuL2FpJztcbmltcG9ydCB7IGRyYXdfYm9hcmQsIGRyYXdfcGllY2VzLCBpbnB1dF9jb252ZXJ0X3BsYWNlIH0gZnJvbSAnLi9kcmF3ZXInO1xuaW1wb3J0IHtcbiAgQm9hcmQsXG4gIGNhbGNfc2NvcmUsXG4gIGdlbmVyYXRlX2luaXRpYWxfYm9hcmQsXG4gIHN0cmluZ2lmeV9ib2FyZCxcbiAgcHV0X3N0b25lLFxuICBmbGlwX3N0b25lLFxuICBtb3ZlX3R1cm4sXG4gIHBhcnNlX2Nvb3JkLFxuICBpc192YWxpZF9tb3ZlLFxuICBhZGRfdmVjLFxuICBqdWRnZV9mbGlwXzFkLFxuICBESVJFQ1RJT05TLFxuICBhbGxfdmFsaWRfbW92ZXMsXG4gIG5leHRfc3RhdGUsXG4gIEdhbWVzdGF0dXMsXG4gIGZsaXBhYmxlX2FsbF9wbGFjZXMsXG4gIEJvYXJkX2hpc3RvcnksXG4gIGFkZF9ib2FyZF9oaXN0b3J5LFxuICBkZWVwX2NvcHlfYm9hcmQsXG4gIGRlbGV0ZV9sYXRlcl90dXJuLFxuICBkZWVwX2NvcHlfYm9hcmRfYXJyYXksXG4gIGJhY2tfdG9fbXlfdHVybixcbiAgdXBkYXRlX2hpc3RvcnksXG59IGZyb20gJy4vb3RoZWxsbyc7XG5cbmV4cG9ydCB0eXBlIEdhbWUgPSB7XG4gIGxhc3Q6IG51bWJlcjsgLy8g5pyA5b6M44Gr55uk6Z2i44Gu5pu05paw44KS44GX44Gf5pmC5Yi7IChtcylcbiAgaW50ZXJ2YWw6IG51bWJlcjsgLy8gKGludGVydmFsKW1zIOavjuOBq+ebpOmdouOBruabtOaWsOOCkuihjOOBhlxuICBib2FyZDogQm9hcmQ7XG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHVzZXJfaW5wdXQ6IFtudW1iZXIsIG51bWJlcl0gfCBudWxsO1xuICBtZXNzYWdlX2hvbGRlcjogSFRNTFNwYW5FbGVtZW50O1xuICBzdGFydF9idXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICBzZWxlY3RfYmxhY2s6IEhUTUxCdXR0b25FbGVtZW50O1xuICBzZWxlY3Rfd2hpdGU6IEhUTUxCdXR0b25FbGVtZW50O1xuICBzZWxlY3RfQUliYXR0bGU6IEhUTUxCdXR0b25FbGVtZW50O1xuICBjYW5jZWxfYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgbm93X2dhbWluZzogYm9vbGVhbjtcbiAgYmxhY2tfcGxheWVyOiBBSUFnZW50IHwgJ3VzZXInO1xuICB3aGl0ZV9wbGF5ZXI6IEFJQWdlbnQgfCAndXNlcic7XG4gIGJvYXJkX2hpc3Rvcnk6IEJvYXJkX2hpc3Rvcnk7XG4gIHR1cm5fbnVtYmVyOiBudW1iZXI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJfbW91c2VfaW5wdXRfbGlzdG5lcihnYW1lOiBHYW1lKTogdm9pZCB7XG4gIGdhbWUuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCByZWN0ID0gZ2FtZS5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgY29uc3QgW2ksIGpdID0gaW5wdXRfY29udmVydF9wbGFjZShbeCwgeV0sIGdhbWUuY2FudmFzKTtcbiAgICBnYW1lLnVzZXJfaW5wdXQgPSBbaiwgaV07XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHV0X3N0YXJ0X2J1dHRvbihcbiAgZ2FtZTogR2FtZSxcbiAgc3RhcnRfYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCxcbiAgY2FuY2VsX2J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQsXG4gIHNlbGVjdF9ibGFjazogSFRNTEJ1dHRvbkVsZW1lbnQsXG4gIHNlbGVjdF93aGl0ZTogSFRNTEJ1dHRvbkVsZW1lbnQsXG4gIHNlbGVjdF9BSWJhdHRsZTogSFRNTEJ1dHRvbkVsZW1lbnRcbik6IHZvaWQge1xuICBzdGFydF9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGdhbWUubm93X2dhbWluZyA9IHRydWU7XG4gICAgZ2FtZS5zdGFydF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF9ibGFjay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X3doaXRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfQUliYXR0bGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLmNhbmNlbF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgIGdhbWUuYm9hcmQgPSBnZW5lcmF0ZV9pbml0aWFsX2JvYXJkKCk7XG4gICAgZHJhd19ib2FyZChnYW1lLmJvYXJkLCBnYW1lLmNhbnZhcyk7XG4gICAgZ2FtZS5ibGFja19wbGF5ZXIgPSAndXNlcic7XG4gICAgZ2FtZS53aGl0ZV9wbGF5ZXIgPSAndXNlcic7XG4gICAgZ2FtZS5tZXNzYWdlX2hvbGRlci5pbm5lclRleHQgPVxuICAgICAgJ+OBiuS6kuOBhOmgkeW8teOBo+OBpuOBj+OBoOOBleOBhOOAgicgKyAnXFxuJyArICfpu5Ljga7miYvnlarjgafjgZnjgIInO1xuICB9KTtcbiAgc2VsZWN0X2JsYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBnYW1lLm5vd19nYW1pbmcgPSB0cnVlO1xuICAgIGdhbWUuc3RhcnRfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfYmxhY2suc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF93aGl0ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X0FJYmF0dGxlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5jYW5jZWxfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICBnYW1lLmJvYXJkID0gZ2VuZXJhdGVfaW5pdGlhbF9ib2FyZCgpO1xuICAgIGRyYXdfYm9hcmQoZ2FtZS5ib2FyZCwgZ2FtZS5jYW52YXMpO1xuICAgIGdhbWUuYmxhY2tfcGxheWVyID0gJ3VzZXInO1xuICAgIGdhbWUud2hpdGVfcGxheWVyID0gYWxwaGFiZXRhX3N0b25lX2NvdW50X2FnZW50KCk7XG4gICAgZ2FtZS5tZXNzYWdlX2hvbGRlci5pbm5lclRleHQgPVxuICAgICAgJ+OBleOBguOCsuODvOODoOOCkuWni+OCgeOBvuOBl+OCh+OBhuOAgicgKyAnXFxuJyArICfjgYLjgarjgZ8o6buSKeOBruaJi+eVquOBp+OBmeOAgic7XG4gIH0pO1xuICBzZWxlY3Rfd2hpdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGdhbWUubm93X2dhbWluZyA9IHRydWU7XG4gICAgZ2FtZS5zdGFydF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF9ibGFjay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X3doaXRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfQUliYXR0bGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLmNhbmNlbF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgIGdhbWUuYm9hcmQgPSBnZW5lcmF0ZV9pbml0aWFsX2JvYXJkKCk7XG4gICAgZHJhd19ib2FyZChnYW1lLmJvYXJkLCBnYW1lLmNhbnZhcyk7XG4gICAgZ2FtZS5ibGFja19wbGF5ZXIgPSBhbHBoYWJldGFfc3RvbmVfY291bnRfYWdlbnQoKTtcbiAgICBnYW1lLndoaXRlX3BsYXllciA9ICd1c2VyJztcbiAgICBnYW1lLm1lc3NhZ2VfaG9sZGVyLmlubmVyVGV4dCA9XG4gICAgICAn44GV44GC44Ky44O844Og44KS5aeL44KB44G+44GX44KH44GG44CCJyArICdcXG4nICsgJ+m7kuOBruaJi+eVquOBp+OBmeOAgic7XG4gIH0pO1xuICBzZWxlY3RfQUliYXR0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGdhbWUubm93X2dhbWluZyA9IHRydWU7XG4gICAgZ2FtZS5zdGFydF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF9ibGFjay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X3doaXRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfQUliYXR0bGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLmNhbmNlbF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgIGdhbWUuYm9hcmQgPSBnZW5lcmF0ZV9pbml0aWFsX2JvYXJkKCk7XG4gICAgZHJhd19ib2FyZChnYW1lLmJvYXJkLCBnYW1lLmNhbnZhcyk7XG4gICAgZ2FtZS5ibGFja19wbGF5ZXIgPSBtaW5pbWF4X3N0b25lX2NvdW50X2FnZW50KCk7XG4gICAgZ2FtZS53aGl0ZV9wbGF5ZXIgPSBhbHBoYWJldGFfc3RvbmVfY291bnRfYWdlbnQoKTtcbiAgICBnYW1lLm1lc3NhZ2VfaG9sZGVyLmlubmVyVGV4dCA9XG4gICAgJ+m7kuOBruaJi+eVquOBp+OBmeOAgic7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHV0X2NhbmNlbF9idXR0b24oXG4gIGdhbWU6IEdhbWUsXG4gIGNhbmNlbF9idXR0b246IEhUTUxCdXR0b25FbGVtZW50XG4pOiB2b2lkIHtcbiAgY2FuY2VsX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgZ2FtZS50dXJuX251bWJlciA9IGJhY2tfdG9fbXlfdHVybihnYW1lLmJvYXJkX2hpc3RvcnksIGdhbWUudHVybl9udW1iZXIpO1xuICAgIGNvbnN0IGJvYXJkID0gZ2FtZS5ib2FyZF9oaXN0b3J5W2dhbWUudHVybl9udW1iZXJdIVswXTtcbiAgICBnYW1lLmJvYXJkID0gYm9hcmQ7XG4gICAgZHJhd19ib2FyZChnYW1lLmJvYXJkLCBnYW1lLmNhbnZhcyk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlX2dhbWUoXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gIG1lc3NhZ2VfaG9sZGVyOiBIVE1MU3BhbkVsZW1lbnQsXG4gIHN0YXJ0X2J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQsXG4gIGNhbmNlbF9idXR0b246IEhUTUxCdXR0b25FbGVtZW50LFxuICBzZWxlY3RfYmxhY2s6IEhUTUxCdXR0b25FbGVtZW50LFxuICBzZWxlY3Rfd2hpdGU6IEhUTUxCdXR0b25FbGVtZW50LFxuICBzZWxlY3RfQUliYXR0bGU6IEhUTUxCdXR0b25FbGVtZW50XG4pOiBHYW1lIHtcbiAgY29uc3QgZ2FtZTogR2FtZSA9IHtcbiAgICBsYXN0OiBwZXJmb3JtYW5jZS5ub3coKSxcbiAgICBpbnRlcnZhbDogMTAwMCAvIDYwLCAvLyBtc1xuICAgIGJvYXJkOiBnZW5lcmF0ZV9pbml0aWFsX2JvYXJkKCksXG4gICAgY2FudmFzOiBjYW52YXMsXG4gICAgdXNlcl9pbnB1dDogbnVsbCxcbiAgICBtZXNzYWdlX2hvbGRlcjogbWVzc2FnZV9ob2xkZXIsXG4gICAgc3RhcnRfYnV0dG9uOiBzdGFydF9idXR0b24sXG4gICAgY2FuY2VsX2J1dHRvbjogY2FuY2VsX2J1dHRvbixcbiAgICBzZWxlY3RfYmxhY2s6IHNlbGVjdF9ibGFjayxcbiAgICBzZWxlY3Rfd2hpdGU6IHNlbGVjdF93aGl0ZSxcbiAgICBzZWxlY3RfQUliYXR0bGU6IHNlbGVjdF9BSWJhdHRsZSxcbiAgICBub3dfZ2FtaW5nOiBmYWxzZSxcbiAgICBibGFja19wbGF5ZXI6ICd1c2VyJyxcbiAgICB3aGl0ZV9wbGF5ZXI6ICd1c2VyJyxcbiAgICBib2FyZF9oaXN0b3J5OiBbW2dlbmVyYXRlX2luaXRpYWxfYm9hcmQoKSwgR2FtZXN0YXR1cy5Pa11dLFxuICAgIHR1cm5fbnVtYmVyOiAwLFxuICB9O1xuICBtZXNzYWdlX2hvbGRlci5pbm5lclRleHQgPSAn5a++5oim55u45omL44CB5YWI5pS75b6M5pS744KS6YG444KT44Gn44GP44Gg44GV44GE44CCJztcbiAgZ2FtZS5zdGFydF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICBnYW1lLnNlbGVjdF9ibGFjay5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gIGdhbWUuc2VsZWN0X3doaXRlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgZ2FtZS5zZWxlY3RfQUliYXR0bGUuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICByZWdpc3Rlcl9tb3VzZV9pbnB1dF9saXN0bmVyKGdhbWUpO1xuICBwdXRfc3RhcnRfYnV0dG9uKFxuICAgIGdhbWUsXG4gICAgZ2FtZS5zdGFydF9idXR0b24sXG4gICAgZ2FtZS5jYW5jZWxfYnV0dG9uLFxuICAgIGdhbWUuc2VsZWN0X2JsYWNrLFxuICAgIGdhbWUuc2VsZWN0X3doaXRlLFxuICAgIGdhbWUuc2VsZWN0X0FJYmF0dGxlXG4gICk7XG4gIHJldHVybiBnYW1lO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVfc3RhdGUoZ2FtZTogR2FtZSk6IGJvb2xlYW4ge1xuICBpZiAoZ2FtZS5ib2FyZC5ibGFja190dXJuKSB7XG4gICAgaWYgKGdhbWUuYmxhY2tfcGxheWVyID09PSAndXNlcicpIHtcbiAgICAgIHJldHVybiBpbnB1dF9zdGF0ZShnYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FtZS51c2VyX2lucHV0ID0gZ2FtZS5ibGFja19wbGF5ZXIubmV4dF9tb3ZlKGdhbWUuYm9hcmQpO1xuICAgICAgcmV0dXJuIGlucHV0X3N0YXRlKGdhbWUpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghZ2FtZS5ib2FyZC5ibGFja190dXJuKSB7XG4gICAgaWYgKGdhbWUud2hpdGVfcGxheWVyID09PSAndXNlcicpIHtcbiAgICAgIHJldHVybiBpbnB1dF9zdGF0ZShnYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FtZS51c2VyX2lucHV0ID0gZ2FtZS53aGl0ZV9wbGF5ZXIubmV4dF9tb3ZlKGdhbWUuYm9hcmQpO1xuICAgICAgcmV0dXJuIGlucHV0X3N0YXRlKGdhbWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlucHV0X3N0YXRlKGdhbWU6IEdhbWUpOiBib29sZWFuIHtcbiAgaWYgKCFnYW1lLm5vd19nYW1pbmcgJiYgZ2FtZS51c2VyX2lucHV0ICE9PSBudWxsKSB7XG4gICAgZ2FtZS51c2VyX2lucHV0ID0gbnVsbDtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGdhbWUubm93X2dhbWluZyAmJiBnYW1lLnVzZXJfaW5wdXQgIT09IG51bGwpIHtcbiAgICBnYW1lLnR1cm5fbnVtYmVyID0gdXBkYXRlX2hpc3RvcnkoXG4gICAgICBnYW1lLmJvYXJkX2hpc3RvcnksXG4gICAgICBnYW1lLnR1cm5fbnVtYmVyLFxuICAgICAgZ2FtZS51c2VyX2lucHV0XG4gICAgKTtcbiAgICBjb25zdCBbYm9hcmQsIHN0YXR1c10gPSBuZXh0X3N0YXRlKGdhbWUuYm9hcmQsIGdhbWUudXNlcl9pbnB1dCk7XG4gICAgZ2FtZS51c2VyX2lucHV0ID0gbnVsbDtcbiAgICBnYW1lLmJvYXJkID0gYm9hcmQ7XG4gICAgaWYgKHN0YXR1cyA9PT0gR2FtZXN0YXR1cy5FcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc3RhdHVzID09PSBHYW1lc3RhdHVzLkVuZCkge1xuICAgICAgZ2FtZS5tZXNzYWdlX2hvbGRlci5pbm5lclRleHQgPSBjcmVhdGVfbWVzc2FnZShnYW1lLCBzdGF0dXMpO1xuICAgICAgZ2FtZS5ub3dfZ2FtaW5nID0gZmFsc2U7XG4gICAgICBnYW1lLnN0YXJ0X2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICBnYW1lLnNlbGVjdF9ibGFjay5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICBnYW1lLnNlbGVjdF93aGl0ZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICBnYW1lLnNlbGVjdF9BSWJhdHRsZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FtZS5tZXNzYWdlX2hvbGRlci5pbm5lclRleHQgPSBjcmVhdGVfbWVzc2FnZShnYW1lLCBzdGF0dXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlX2dhbWUoZ2FtZTogR2FtZSk6IHZvaWQge1xuICBpZiAodXBkYXRlX3N0YXRlKGdhbWUpKSB7XG4gICAgZHJhd19ib2FyZChnYW1lLmJvYXJkLCBnYW1lLmNhbnZhcyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0X2xvb3AoZ2FtZTogR2FtZSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQge1xuICBjb25zdCBydW4gPSAobm93OiBudW1iZXIpID0+IHtcbiAgICBsZXQgZGVsdGEgPSBub3cgLSBnYW1lLmxhc3Q7XG4gICAgd2hpbGUgKGRlbHRhID49IGdhbWUuaW50ZXJ2YWwpIHtcbiAgICAgIGRlbHRhIC09IGdhbWUuaW50ZXJ2YWw7XG4gICAgICBnYW1lLmxhc3QgPSBub3cgLSBkZWx0YTtcbiAgICAgIHVwZGF0ZV9nYW1lKGdhbWUpO1xuICAgIH1cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocnVuKTtcbiAgfTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJ1bik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVfbWVzc2FnZShnYW1lOiBHYW1lLCBzdGF0dXM6IEdhbWVzdGF0dXMpOiBzdHJpbmcge1xuICBjb25zdCBib2FyZCA9IGdhbWUuYm9hcmQ7XG4gIGNvbnN0IGJfc2NvcmUgPSAn6buS77yaICcgKyBjYWxjX3Njb3JlKGJvYXJkKVswXTtcbiAgY29uc3Qgd19zY29yZSA9ICfnmb3vvJogJyArIGNhbGNfc2NvcmUoYm9hcmQpWzFdO1xuICBjb25zdCBzY29yZSA9IGJfc2NvcmUgKyAnXFxuJyArIHdfc2NvcmUgKyAnXFxuJztcbiAgaWYgKHN0YXR1cyA9PT0gR2FtZXN0YXR1cy5Paykge1xuICAgIGlmIChib2FyZC5ibGFja190dXJuKSB7XG4gICAgICByZXR1cm4gc2NvcmUgKyAn6buS44Gu5omL55Wq44Gn44GZJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNjb3JlICsgJ+eZveOBruaJi+eVquOBp+OBmSc7XG4gICAgfVxuICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gR2FtZXN0YXR1cy5FcnJvcikge1xuICAgIGlmIChib2FyZC5ibGFja190dXJuKSB7XG4gICAgICByZXR1cm4gc2NvcmUgKyAn44Gd44GT44Gr44Gv572u44GP44GT44Go44GM44Gn44GN44G+44Gb44KT44CC6buS44Gu5omL55Wq44Gn44GZ44CCJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNjb3JlICsgJ+OBneOBk+OBq+OBr+e9ruOBj+OBk+OBqOOBjOOBp+OBjeOBvuOBm+OCk+OAgueZveOBruaJi+eVquOBp+OBmeOAgic7XG4gICAgfVxuICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gR2FtZXN0YXR1cy5QYXNzKSB7XG4gICAgaWYgKGJvYXJkLmJsYWNrX3R1cm4pIHtcbiAgICAgIHJldHVybiBzY29yZSArICfnmb3jga/nva7jgY/jgajjgZPjgo3jgYzjgarjgYTjga7jgafjg5HjgrnjgafjgZnjgILlho3luqbpu5Ljga7miYvnlarjgafjgZnjgIInO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2NvcmUgKyAn6buS44Gv572u44GP44Go44GT44KN44GM44Gq44GE44Gu44Gn44OR44K544Gn44GZ44CC5YaN5bqm55m944Gu5omL55Wq44Gn44GZ44CCJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoc3RhdHVzID09PSBHYW1lc3RhdHVzLkVuZCkge1xuICAgIGlmIChjYWxjX3Njb3JlKGJvYXJkKVswXSA+IGNhbGNfc2NvcmUoYm9hcmQpWzFdKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBzY29yZSArXG4gICAgICAgICfjgrLjg7zjg6DntYLkuobjgafjgZnjgIInICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAn6buS44Gu5Yud44Gh44Gn44GZ44CCJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ+WGjeW6puOCsuODvOODoOOCkumWi+Wni+OBmeOCi+OBq+OBr+ODnOOCv+ODs+OCkuaKvOOBl+OBpuOBj+OBoOOBleOBhOOAgidcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChjYWxjX3Njb3JlKGJvYXJkKVswXSA8IGNhbGNfc2NvcmUoYm9hcmQpWzFdKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBzY29yZSArXG4gICAgICAgICfjgrLjg7zjg6DntYLkuobjgafjgZnjgIInICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAn55m944Gu5Yud44Gh44Gn44GZ44CCJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ+WGjeW6puOCsuODvOODoOOCkumWi+Wni+OBmeOCi+OBq+OBr+ODnOOCv+ODs+OCkuaKvOOBl+OBpuOBj+OBoOOBleOBhOOAgidcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICgoY2FsY19zY29yZShib2FyZClbMF0gPSBjYWxjX3Njb3JlKGJvYXJkKVsxXSkpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHNjb3JlICtcbiAgICAgICAgJ+OCsuODvOODoOe1guS6huOBp+OBmeOAgicgK1xuICAgICAgICAnXFxuJyArXG4gICAgICAgICflvJXjgY3liIbjgZHjgafjgZnjgIInICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAn5YaN5bqm44Ky44O844Og44KS6ZaL5aeL44GZ44KL44Gr44Gv44Oc44K/44Oz44KS5oq844GX44Gm44GP44Gg44GV44GE44CCJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICfjg5DjgrAnO1xufVxuZnVuY3Rpb24gd2Vha19hZ2VudF9tb3ZlKCk6IEFJQWdlbnQgfCAndXNlcicge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0Z1bmN0aW9uIG5vdCBpbXBsZW1lbnRlZC4nKTtcbn1cbiIsImV4cG9ydCB0eXBlIFJvdyA9IFtcbiAgYm9vbGVhbixcbiAgYm9vbGVhbixcbiAgYm9vbGVhbixcbiAgYm9vbGVhbixcbiAgYm9vbGVhbixcbiAgYm9vbGVhbixcbiAgYm9vbGVhbixcbiAgYm9vbGVhblxuXTtcblxuZXhwb3J0IHR5cGUgQm9hcmRBcnJheSA9IFtSb3csIFJvdywgUm93LCBSb3csIFJvdywgUm93LCBSb3csIFJvd107XG5cbmV4cG9ydCB0eXBlIEJvYXJkID0ge1xuICBibGFjazogQm9hcmRBcnJheTtcbiAgd2hpdGU6IEJvYXJkQXJyYXk7XG4gIGJsYWNrX3R1cm46IGJvb2xlYW47XG59O1xuXG4vL2V4cG9ydCB0eXBlIEJvYXJkX2hpc3RvcnkgPSBuZXcgQXJyYXkoNjQpLmZpbGwoQm9hcmQpXG5cbmV4cG9ydCB0eXBlIEJvYXJkX2hpc3RvcnkgPSBbQm9hcmQsIEdhbWVzdGF0dXNdW107XG5cbi8v55uk6Z2i5Yid5pyf5YyWXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVfaW5pdGlhbF9ib2FyZCgpOiBCb2FyZCB7XG4gIGNvbnN0IGJsYWNrID0gbmV3IEFycmF5KDgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGJsYWNrW2ldID0gbmV3IEFycmF5KDgpLmZpbGwoZmFsc2UpO1xuICB9XG4gIGJsYWNrWzRdWzNdID0gdHJ1ZTtcbiAgYmxhY2tbM11bNF0gPSB0cnVlO1xuXG4gIGNvbnN0IHdoaXRlID0gbmV3IEFycmF5KDgpO1xuICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgIHdoaXRlW2pdID0gbmV3IEFycmF5KDgpLmZpbGwoZmFsc2UpO1xuICB9XG4gIHdoaXRlWzNdWzNdID0gdHJ1ZTtcbiAgd2hpdGVbNF1bNF0gPSB0cnVlO1xuXG4gIGNvbnN0IGJsYWNrX3R1cm4gPSB0cnVlO1xuXG4gIGNvbnN0IGJvYXJkID0ge1xuICAgIGJsYWNrOiBibGFjayBhcyBCb2FyZEFycmF5LFxuICAgIHdoaXRlOiB3aGl0ZSBhcyBCb2FyZEFycmF5LFxuICAgIGJsYWNrX3R1cm46IGJsYWNrX3R1cm4sXG4gIH07XG5cbiAgcmV0dXJuIGJvYXJkO1xufVxuXG4vKlxuLy/jgZ3jga7mmYLjga7nm6TpnaLjgpLooajnpLpcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlfYm9hcmQoYm9hcmQ6IEJvYXJkKTogc3RyaW5nIHtcbiAgbGV0IEh5b3VqaSA9IGAgICBhIGIgYyBkIGUgZiBnIGhcbiAgIC0gLSAtIC0gLSAtIC0gLVxuYDtcbiAgYm9hcmQuYmxhY2suZm9yRWFjaCgociwgaSkgPT4ge1xuICAgIEh5b3VqaSA9IEh5b3VqaSArIFN0cmluZyhpICsgMSkgKyAnIHwnO1xuICAgIHIuZm9yRWFjaCgoYiwgaikgPT4ge1xuICAgICAgbGV0IGMgPSAnICc7XG4gICAgICBpZiAoYm9hcmQud2hpdGVbaV0hW2pdKSB7XG4gICAgICAgIGMgPSAnbyc7XG4gICAgICB9XG4gICAgICBpZiAoYikge1xuICAgICAgICBjID0gJ3gnO1xuICAgICAgfVxuICAgICAgSHlvdWppID0gSHlvdWppICsgYyArICd8JztcbiAgICB9KTtcbiAgICBIeW91amkgPSBIeW91amkgKyAnXFxuJztcbiAgfSk7XG4gIEh5b3VqaSA9IEh5b3VqaSArICcgICAtIC0gLSAtIC0gLSAtIC0nICsgJ1xcbic7XG4gIHJldHVybiBIeW91amk7XG59XG4qL1xuXG4vLyBb6buS44Gu55+z5pWwLCDnmb3jga7nn7PmlbBd44KS6L+U44GZXG5leHBvcnQgZnVuY3Rpb24gY2FsY19zY29yZShib2FyZDogQm9hcmQpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgbGV0IGJfc2NvcmUgPSAwO1xuICBsZXQgd19zY29yZSA9IDA7XG5cbiAgYm9hcmQuYmxhY2suZm9yRWFjaCgociwgaSkgPT4ge1xuICAgIHIuZm9yRWFjaCgoYiwgaikgPT4ge1xuICAgICAgaWYgKGIpIHtcbiAgICAgICAgYl9zY29yZSsrO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgYm9hcmQud2hpdGUuZm9yRWFjaCgociwgaSkgPT4ge1xuICAgIHIuZm9yRWFjaCgoYiwgaikgPT4ge1xuICAgICAgaWYgKGIpIHtcbiAgICAgICAgd19zY29yZSsrO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIFtiX3Njb3JlLCB3X3Njb3JlXTtcbn1cblxuLy9b6KGM55Wq5Y+3LCDliJfnlarlj7dd44CB6aCG55Wq44KS5Y+X44GR5Y+W44Gj44Gm44Gd44Gu5aC05omA44Gr55+z44KS572u44GPXG5leHBvcnQgZnVuY3Rpb24gcHV0X3N0b25lKFxuICBwb2ludDogW251bWJlciwgbnVtYmVyXSxcbiAgYmxhY2tfdHVybjogYm9vbGVhbixcbiAgYm9hcmQ6IEJvYXJkXG4pIHtcbiAgY29uc3Qgcm93X251bWJlciA9IHBvaW50WzBdO1xuICBjb25zdCBjb2x1bW5fbnVtYmVyID0gcG9pbnRbMV07XG5cbiAgaWYgKFxuICAgIHJvd19udW1iZXIgPj0gMCAmJlxuICAgIHJvd19udW1iZXIgPD0gNyAmJlxuICAgIGNvbHVtbl9udW1iZXIgPj0gMCAmJlxuICAgIGNvbHVtbl9udW1iZXIgPD0gN1xuICApIHtcbiAgICBpZiAoXG4gICAgICAhYm9hcmQuYmxhY2tbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdICYmXG4gICAgICAhYm9hcmQud2hpdGVbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdXG4gICAgKSB7XG4gICAgICBpZiAoYmxhY2tfdHVybikge1xuICAgICAgICBib2FyZC5ibGFja1tyb3dfbnVtYmVyXSFbY29sdW1uX251bWJlcl0gPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmQud2hpdGVbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vL1vooYznlarlj7csIOWIl+eVquWPt13jgpLlj5fjgZHlj5bjgaPjgabnn7PjgpLjgbLjgaPjgY/jgorov5TjgZlcbmV4cG9ydCBmdW5jdGlvbiBmbGlwX3N0b25lKHBvaW50OiBbbnVtYmVyLCBudW1iZXJdLCBib2FyZDogQm9hcmQpOiBib29sZWFuIHtcbiAgY29uc3Qgcm93X251bWJlciA9IHBvaW50WzBdO1xuICBjb25zdCBjb2x1bW5fbnVtYmVyID0gcG9pbnRbMV07XG5cbiAgaWYgKFxuICAgIHJvd19udW1iZXIgPj0gMCAmJlxuICAgIHJvd19udW1iZXIgPD0gNyAmJlxuICAgIGNvbHVtbl9udW1iZXIgPj0gMCAmJlxuICAgIGNvbHVtbl9udW1iZXIgPD0gN1xuICApIHtcbiAgICBpZiAoXG4gICAgICBib2FyZC5ibGFja1tyb3dfbnVtYmVyXSFbY29sdW1uX251bWJlcl0gfHxcbiAgICAgIGJvYXJkLndoaXRlW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXVxuICAgICkge1xuICAgICAgYm9hcmQuYmxhY2tbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdID1cbiAgICAgICAgIWJvYXJkLmJsYWNrW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXTtcbiAgICAgIGJvYXJkLndoaXRlW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXSA9XG4gICAgICAgICFib2FyZC53aGl0ZVtyb3dfbnVtYmVyXSFbY29sdW1uX251bWJlcl07XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy/miYvnlarjgpLpgLLjgoHjgotcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlX3R1cm4oYm9hcmQ6IEJvYXJkKTogQm9hcmQge1xuICBib2FyZC5ibGFja190dXJuID0gIWJvYXJkLmJsYWNrX3R1cm47XG4gIHJldHVybiBib2FyZDtcbn1cblxuLy9cIuiLseiqnuWwj+aWh+WtlyvmlbDlrZdcIuaDheWgseOCkuWPl+OBkeWPluOBo+OBpltudW1iZXIsIG51bWJlcl3jgavjgZnjgotcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9jb29yZChjb29yZF9zdHI6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlcl0ge1xuICBpZiAoY29vcmRfc3RyLmxlbmd0aCAhPT0gMikge1xuICAgIHJldHVybiBbLTEsIC0xXTtcbiAgfVxuXG4gIGNvbnN0IHJvd19zdHIgPSBjb29yZF9zdHIuc3BsaXQoJycpWzFdO1xuICBjb25zdCBjb2x1bW5fc3RyID0gY29vcmRfc3RyLnNwbGl0KCcnKVswXTtcbiAgbGV0IFtyb3dfbnVtYmVyLCBjb2x1bW5fbnVtYmVyXSA9IFstMSwgLTFdO1xuXG4gIGlmIChyb3dfc3RyID09PSAnMScpIHtcbiAgICByb3dfbnVtYmVyID0gMDtcbiAgfVxuICBpZiAocm93X3N0ciA9PT0gJzInKSB7XG4gICAgcm93X251bWJlciA9IDE7XG4gIH1cbiAgaWYgKHJvd19zdHIgPT09ICczJykge1xuICAgIHJvd19udW1iZXIgPSAyO1xuICB9XG4gIGlmIChyb3dfc3RyID09PSAnNCcpIHtcbiAgICByb3dfbnVtYmVyID0gMztcbiAgfVxuICBpZiAocm93X3N0ciA9PT0gJzUnKSB7XG4gICAgcm93X251bWJlciA9IDQ7XG4gIH1cbiAgaWYgKHJvd19zdHIgPT09ICc2Jykge1xuICAgIHJvd19udW1iZXIgPSA1O1xuICB9XG4gIGlmIChyb3dfc3RyID09PSAnNycpIHtcbiAgICByb3dfbnVtYmVyID0gNjtcbiAgfVxuICBpZiAocm93X3N0ciA9PT0gJzgnKSB7XG4gICAgcm93X251bWJlciA9IDc7XG4gIH1cblxuICBpZiAoY29sdW1uX3N0ciA9PT0gJ2EnKSB7XG4gICAgY29sdW1uX251bWJlciA9IDA7XG4gIH1cbiAgaWYgKGNvbHVtbl9zdHIgPT09ICdiJykge1xuICAgIGNvbHVtbl9udW1iZXIgPSAxO1xuICB9XG4gIGlmIChjb2x1bW5fc3RyID09PSAnYycpIHtcbiAgICBjb2x1bW5fbnVtYmVyID0gMjtcbiAgfVxuICBpZiAoY29sdW1uX3N0ciA9PT0gJ2QnKSB7XG4gICAgY29sdW1uX251bWJlciA9IDM7XG4gIH1cbiAgaWYgKGNvbHVtbl9zdHIgPT09ICdlJykge1xuICAgIGNvbHVtbl9udW1iZXIgPSA0O1xuICB9XG4gIGlmIChjb2x1bW5fc3RyID09PSAnZicpIHtcbiAgICBjb2x1bW5fbnVtYmVyID0gNTtcbiAgfVxuICBpZiAoY29sdW1uX3N0ciA9PT0gJ2cnKSB7XG4gICAgY29sdW1uX251bWJlciA9IDY7XG4gIH1cbiAgaWYgKGNvbHVtbl9zdHIgPT09ICdoJykge1xuICAgIGNvbHVtbl9udW1iZXIgPSA3O1xuICB9XG5cbiAgaWYgKHJvd19udW1iZXIgIT0gLTEgJiYgY29sdW1uX251bWJlciAhPSAtMSkge1xuICAgIHJldHVybiBbcm93X251bWJlciwgY29sdW1uX251bWJlcl07XG4gIH1cblxuICByZXR1cm4gWy0xLCAtMV07XG59XG5cbi8vW251bWJlciwgbnVtYmVyXeWIhuOBoOOBkVtudW1iZXIsIG51bWJlcl3jgYvjgonnp7vli5XjgZnjgotcbmV4cG9ydCBmdW5jdGlvbiBhZGRfdmVjKFxuICBwOiByZWFkb25seSBbbnVtYmVyLCBudW1iZXJdLFxuICBxOiByZWFkb25seSBbbnVtYmVyLCBudW1iZXJdXG4pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgY29uc3QgbmV3X3A6IFtudW1iZXIsIG51bWJlcl0gPSBbMCwgMF07XG4gIG5ld19wWzBdID0gcFswXSArIHFbMF07XG4gIG5ld19wWzFdID0gcFsxXSArIHFbMV07XG4gIHJldHVybiBuZXdfcDtcbn1cblxuZXhwb3J0IGNvbnN0IERJUkVDVElPTlMgPSB7XG4gIHVwOiBbLTEsIDBdLFxuICBkb3duOiBbMSwgMF0sXG4gIGxlZnQ6IFswLCAtMV0sXG4gIHJpZ2h0OiBbMCwgMV0sXG4gIHVsOiBbLTEsIC0xXSxcbiAgdXI6IFstMSwgMV0sXG4gIGRsOiBbMSwgLTFdLFxuICBkcjogWzEsIDFdLFxufSBhcyBjb25zdDtcblxuLy/kuIDlrprmlrnlkJHjgavjgbLjgaPjgY/jgorov5TjgZvjgovnn7PjgYzjgYLjgovjgYvliKTmlq3jgZnjgotcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZV9mbGlwXzFkKFxuICBwOiByZWFkb25seSBbbnVtYmVyLCBudW1iZXJdLFxuICBxOiByZWFkb25seSBbbnVtYmVyLCBudW1iZXJdLFxuICBib2FyZDogQm9hcmRcbik6IFtudW1iZXIsIG51bWJlcl1bXSB7XG4gIGxldCBmbGlwYWJsZV9zdG9uZXMgPSBbXTtcbiAgbGV0IG5ld19wOiBbbnVtYmVyLCBudW1iZXJdID0gYWRkX3ZlYyhwLCBxKTtcbiAgaWYgKGJvYXJkLmJsYWNrX3R1cm4pIHtcbiAgICBsZXQgd19yb3cgPSBib2FyZC53aGl0ZVtuZXdfcFswXV07XG4gICAgaWYgKHdfcm93ID09IHVuZGVmaW5lZCB8fCAhd19yb3dbbmV3X3BbMV1dKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHdoaWxlICh3X3JvdyAhPSB1bmRlZmluZWQgJiYgd19yb3dbbmV3X3BbMV1dKSB7XG4gICAgICBmbGlwYWJsZV9zdG9uZXMucHVzaChuZXdfcCk7XG4gICAgICBuZXdfcCA9IGFkZF92ZWMobmV3X3AsIHEpO1xuICAgICAgd19yb3cgPSBib2FyZC53aGl0ZVtuZXdfcFswXV07XG4gICAgfVxuICAgIGxldCBiX3JvdyA9IGJvYXJkLmJsYWNrW25ld19wWzBdXTtcbiAgICBpZiAoYl9yb3cgIT0gdW5kZWZpbmVkICYmIGJfcm93W25ld19wWzFdXSkge1xuICAgICAgcmV0dXJuIGZsaXBhYmxlX3N0b25lcztcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9IGVsc2Uge1xuICAgIGxldCBiX3JvdyA9IGJvYXJkLmJsYWNrW25ld19wWzBdXTtcbiAgICBpZiAoYl9yb3cgPT0gdW5kZWZpbmVkIHx8ICFiX3Jvd1tuZXdfcFsxXV0pIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgd2hpbGUgKGJfcm93ICE9IHVuZGVmaW5lZCAmJiBiX3Jvd1tuZXdfcFsxXV0pIHtcbiAgICAgIGZsaXBhYmxlX3N0b25lcy5wdXNoKG5ld19wKTtcbiAgICAgIG5ld19wID0gYWRkX3ZlYyhuZXdfcCwgcSk7XG4gICAgICBiX3JvdyA9IGJvYXJkLmJsYWNrW25ld19wWzBdXTtcbiAgICB9XG4gICAgbGV0IHdfcm93ID0gYm9hcmQud2hpdGVbbmV3X3BbMF1dO1xuICAgIGlmICh3X3JvdyAhPSB1bmRlZmluZWQgJiYgd19yb3dbbmV3X3BbMV1dKSB7XG4gICAgICByZXR1cm4gZmxpcGFibGVfc3RvbmVzO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuLy9bbnVtYmVyLCBudW1iZXJd44KS5Y+X44GR5Y+W44Gj44Gm5ZCI5rOV44GL44KS5Yik5pat44GZ44KLXG5leHBvcnQgZnVuY3Rpb24gaXNfdmFsaWRfbW92ZShwOiBbbnVtYmVyLCBudW1iZXJdLCBib2FyZDogQm9hcmQpOiBib29sZWFuIHtcbiAgbGV0IGp1ZGdlX251bWJlciA9IDA7XG5cbiAgY29uc3Qgd19yb3cgPSBib2FyZC53aGl0ZVtwWzBdXTtcbiAgY29uc3QgYl9yb3cgPSBib2FyZC5ibGFja1twWzBdXTtcblxuICBpZiAoYl9yb3cgPT0gdW5kZWZpbmVkIHx8IGJfcm93W3BbMV1dIHx8IHdfcm93ID09IHVuZGVmaW5lZCB8fCB3X3Jvd1twWzFdXSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIERJUkVDVElPTlMpIHtcbiAgICBpZiAoanVkZ2VfZmxpcF8xZChwLCBSZWZsZWN0LmdldChESVJFQ1RJT05TLCBwcm9wZXJ0eSksIGJvYXJkKS5sZW5ndGggPiAwKSB7XG4gICAgICBqdWRnZV9udW1iZXIrKztcbiAgICB9XG4gIH1cbiAgaWYgKGp1ZGdlX251bWJlciA+IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8v5ZCI5rOV5omL44KS5YWo6KGo56S644GZ44KLXG5leHBvcnQgZnVuY3Rpb24gYWxsX3ZhbGlkX21vdmVzKGJvYXJkOiBCb2FyZCk6IFtudW1iZXIsIG51bWJlcl1bXSB7XG4gIGNvbnN0IGNhbl9wdXRfcGxhY2U6IFtudW1iZXIsIG51bWJlcl1bXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICBpZiAoaXNfdmFsaWRfbW92ZShbaSwgal0sIGJvYXJkKSkge1xuICAgICAgICBjYW5fcHV0X3BsYWNlLnB1c2goW2ksIGpdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhbl9wdXRfcGxhY2U7XG59XG5cbi8v44Gd44Gu5pmC44Gu55uk6Z2i44KS6KGo56S6IOKAu+OBn+OBoOOBl+OBiuOBkeOCi+WgtOaJgOOCki3jgafooajnpLpcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlfYm9hcmQoYm9hcmQ6IEJvYXJkKTogc3RyaW5nIHtcbiAgbGV0IGNhbl9wdXRfcGxhY2U6IFtudW1iZXIsIG51bWJlcl1bXSA9IGFsbF92YWxpZF9tb3Zlcyhib2FyZCk7XG4gIGxldCBIeW91amkgPSBgICAgYSBiIGMgZCBlIGYgZyBoXG4gICAtIC0gLSAtIC0gLSAtIC1cbmA7XG4gIGJvYXJkLmJsYWNrLmZvckVhY2goKHIsIGkpID0+IHtcbiAgICBIeW91amkgPSBIeW91amkgKyBTdHJpbmcoaSArIDEpICsgJyB8JztcbiAgICByLmZvckVhY2goKGIsIGopID0+IHtcbiAgICAgIGxldCBjID0gJyAnO1xuICAgICAgaWYgKGJvYXJkLndoaXRlW2ldIVtqXSkge1xuICAgICAgICBjID0gJ28nO1xuICAgICAgfVxuICAgICAgaWYgKGIpIHtcbiAgICAgICAgYyA9ICd4JztcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBjYW5fcHV0X3BsYWNlKSB7XG4gICAgICAgIGlmIChlbGVtZW50WzBdID09PSBpICYmIGVsZW1lbnRbMV0gPT09IGopIHtcbiAgICAgICAgICBjID0gJy0nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBIeW91amkgPSBIeW91amkgKyBjICsgJ3wnO1xuICAgIH0pO1xuICAgIEh5b3VqaSA9IEh5b3VqaSArICdcXG4nO1xuICB9KTtcbiAgSHlvdWppID0gSHlvdWppICsgJyAgIC0gLSAtIC0gLSAtIC0gLScgKyAnXFxuJztcbiAgcmV0dXJuIEh5b3VqaTtcbn1cblxuLy/jgbLjgaPjgY/jgorov5TjgZvjgovjgajjgZPjgo3jgpLjgZnjgbnjgabjg6rjgrnjg4jljJbjgZnjgotcbmV4cG9ydCBmdW5jdGlvbiBmbGlwYWJsZV9hbGxfcGxhY2VzKFxuICBwOiBbbnVtYmVyLCBudW1iZXJdLFxuICBib2FyZDogQm9hcmRcbik6IFtudW1iZXIsIG51bWJlcl1bXSB7XG4gIGxldCBjYW5fZmxpcF9wbGFjZXM6IFtudW1iZXIsIG51bWJlcl1bXSA9IFtdO1xuICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIERJUkVDVElPTlMpIHtcbiAgICBjb25zdCBxOiBbbnVtYmVyLCBudW1iZXJdID0gUmVmbGVjdC5nZXQoRElSRUNUSU9OUywgcHJvcGVydHkpO1xuICAgIGNhbl9mbGlwX3BsYWNlcyA9IGNhbl9mbGlwX3BsYWNlcy5jb25jYXQoanVkZ2VfZmxpcF8xZChwLCBxLCBib2FyZCkpO1xuICB9XG4gIHJldHVybiBjYW5fZmxpcF9wbGFjZXM7XG59XG5cbmV4cG9ydCBlbnVtIEdhbWVzdGF0dXMge1xuICBPayxcbiAgUGFzcyxcbiAgRW5kLFxuICBFcnJvcixcbn1cblxuLy/nj77lnKjjga7nm6TpnaLjgajmrKHjga7nnYDmiYvjgYzkuI7jgYjjgonjgozjgabmrKHjga7nm6TpnaLjgpLov5TjgZlcbmV4cG9ydCBmdW5jdGlvbiBuZXh0X3N0YXRlKFxuICBpbnB1dF9ib2FyZDogUmVhZG9ubHk8Qm9hcmQ+LFxuICBwOiBbbnVtYmVyLCBudW1iZXJdXG4pOiBbQm9hcmQsIEdhbWVzdGF0dXNdIHtcbiAgY29uc3QgYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoaW5wdXRfYm9hcmQpO1xuICBpZiAoaXNfdmFsaWRfbW92ZShwLCBib2FyZCkgJiYgcHV0X3N0b25lKHAsIGJvYXJkLmJsYWNrX3R1cm4sIGJvYXJkKSkge1xuICAgIGNvbnN0IGNhbl9mbGlwX3BsYWNlcyA9IGZsaXBhYmxlX2FsbF9wbGFjZXMocCwgYm9hcmQpO1xuICAgIGZvciAoY29uc3QgZWxlbWVudHMgb2YgY2FuX2ZsaXBfcGxhY2VzKSB7XG4gICAgICBmbGlwX3N0b25lKGVsZW1lbnRzLCBib2FyZCk7XG4gICAgfVxuXG4gICAgbW92ZV90dXJuKGJvYXJkKTtcblxuICAgIGlmIChhbGxfdmFsaWRfbW92ZXMoYm9hcmQpLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBbYm9hcmQsIEdhbWVzdGF0dXMuT2tdO1xuICAgIH1cblxuICAgIGlmIChhbGxfdmFsaWRfbW92ZXMoYm9hcmQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbW92ZV90dXJuKGJvYXJkKTtcbiAgICAgIGlmIChhbGxfdmFsaWRfbW92ZXMoYm9hcmQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gW2JvYXJkLCBHYW1lc3RhdHVzLkVuZF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW2JvYXJkLCBHYW1lc3RhdHVzLlBhc3NdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gW2JvYXJkLCBHYW1lc3RhdHVzLkVycm9yXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZV9oaXN0b3J5KFxuICBib2FyZF9oaXN0b3J5OiBCb2FyZF9oaXN0b3J5LFxuICB0dXJuX251bWJlcjogbnVtYmVyLFxuICB1c2VyX2lucHV0OiBbbnVtYmVyLCBudW1iZXJdXG4pOiBudW1iZXIge1xuICBjb25zdCBib2FyZCA9IGJvYXJkX2hpc3RvcnlbdHVybl9udW1iZXJdIVswXTtcbiAgZGVsZXRlX2xhdGVyX3R1cm4oYm9hcmRfaGlzdG9yeSwgdHVybl9udW1iZXIpO1xuICBjb25zdCBbbmV4dF9ib2FyZCwgc3RhdHVzXSA9IG5leHRfc3RhdGUoYm9hcmQsIHVzZXJfaW5wdXQpO1xuICBib2FyZF9oaXN0b3J5LnB1c2goW25leHRfYm9hcmQsIHN0YXR1c10pO1xuICByZXR1cm4gdHVybl9udW1iZXIgKyAxO1xufVxuXG4vL+ePvuWcqOOBruebpOmdouOBqOasoeOBruedgOaJi+OBjOS4juOBiOOCieOCjOOBpuasoeOBruebpOmdouOCkmhpc3Rvcnnjgavkv53lrZjjgZnjgotcbi8qXG5leHBvcnQgZnVuY3Rpb24ga2VlcF9uZXh0X3N0YXRlKFxuICBib2FyZDogUmVhZG9ubHk8Qm9hcmQ+LFxuICBwOiBbbnVtYmVyLCBudW1iZXJdLFxuICBib2FyZF9oaXN0b3J5OiBCb2FyZF9oaXN0b3J5LFxuICB0dXJuX251bWJlcjogbnVtYmVyXG4pOm51bWJlcntcbiAgbGV0IHRlbXBvcmFyeV9ib2FyZCA9IGRlZXBfY29weV9ib2FyZChib2FyZF9oaXN0b3J5W3R1cm5fbnVtYmVyXSFbMF0pXG4gIGlmIChpc192YWxpZF9tb3ZlKHAsIHRlbXBvcmFyeV9ib2FyZCkgJiYgcHV0X3N0b25lKHAsIGJvYXJkLmJsYWNrX3R1cm4sIHRlbXBvcmFyeV9ib2FyZCkpIHtcbiAgICBjb25zdCBjYW5fZmxpcF9wbGFjZXMgPSBmbGlwYWJsZV9hbGxfcGxhY2VzKHAsIGJvYXJkKTtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnRzIG9mIGNhbl9mbGlwX3BsYWNlcykge1xuICAgICAgZmxpcF9zdG9uZShlbGVtZW50cywgdGVtcG9yYXJ5X2JvYXJkKTtcbiAgICB9XG4gICAgdGVtcG9yYXJ5X2JvYXJkID0gbW92ZV90dXJuKHRlbXBvcmFyeV9ib2FyZCk7XG4gICAgaWYgKGFsbF92YWxpZF9tb3Zlcyh0ZW1wb3JhcnlfYm9hcmQpLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHB1dF9udW1iZXIgPSBhZGRfYm9hcmRfaGlzdG9yeShkZWVwX2NvcHlfYm9hcmQodGVtcG9yYXJ5X2JvYXJkKSwgYm9hcmRfaGlzdG9yeSwgR2FtZXN0YXR1cy5PaywgdHVybl9udW1iZXIpO1xuICAgICAgcmV0dXJuIHB1dF9udW1iZXJcbiAgICB9XG5cbiAgICBpZiAoYWxsX3ZhbGlkX21vdmVzKHRlbXBvcmFyeV9ib2FyZCkubGVuZ3RoID09PSAwKSB7XG4gICAgICB0ZW1wb3JhcnlfYm9hcmQgPSBtb3ZlX3R1cm4odGVtcG9yYXJ5X2JvYXJkKTtcbiAgICAgIGlmIChhbGxfdmFsaWRfbW92ZXModGVtcG9yYXJ5X2JvYXJkKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc3QgcHV0X251bWJlciA9IGFkZF9ib2FyZF9oaXN0b3J5KGRlZXBfY29weV9ib2FyZCh0ZW1wb3JhcnlfYm9hcmQpLCBib2FyZF9oaXN0b3J5LCBHYW1lc3RhdHVzLkVuZCwgdHVybl9udW1iZXIpO1xuICAgICAgICByZXR1cm4gcHV0X251bWJlclxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHV0X251bWJlciA9IGFkZF9ib2FyZF9oaXN0b3J5KGRlZXBfY29weV9ib2FyZCh0ZW1wb3JhcnlfYm9hcmQpLCBib2FyZF9oaXN0b3J5LCBHYW1lc3RhdHVzLlBhc3MsIHR1cm5fbnVtYmVyKTtcbiAgICAgICAgcmV0dXJuIHB1dF9udW1iZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0dXJuX251bWJlclxufVxuKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBfY29weV9ib2FyZF9hcnJheShcbiAgYm9hcmRfYXJyYXk6IFJlYWRvbmx5PEJvYXJkQXJyYXk+XG4pOiBCb2FyZEFycmF5IHtcbiAgcmV0dXJuIGJvYXJkX2FycmF5Lm1hcCgocikgPT4gWy4uLnJdKSBhcyBCb2FyZEFycmF5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcF9jb3B5X2JvYXJkKGJvYXJkOiBSZWFkb25seTxCb2FyZD4pOiBCb2FyZCB7XG4gIHJldHVybiB7XG4gICAgLi4uYm9hcmQsXG4gICAgYmxhY2s6IGRlZXBfY29weV9ib2FyZF9hcnJheShib2FyZC5ibGFjayksXG4gICAgd2hpdGU6IGRlZXBfY29weV9ib2FyZF9hcnJheShib2FyZC53aGl0ZSksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRfYm9hcmRfaGlzdG9yeShcbiAgYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPixcbiAgYm9hcmRfaGlzdG9yeTogQm9hcmRfaGlzdG9yeSxcbiAgc3RhdHVzOiBHYW1lc3RhdHVzLFxuICB0dXJuX251bWJlcjogbnVtYmVyXG4pOiBudW1iZXIge1xuICBib2FyZF9oaXN0b3J5LnB1c2goW2RlZXBfY29weV9ib2FyZChib2FyZCksIHN0YXR1c10pO1xuICBjb25zdCBwdXRfdHVybl9udW1iZXIgPSB0dXJuX251bWJlciArIDE7XG4gIHJldHVybiBwdXRfdHVybl9udW1iZXI7XG59XG5cbi8vaGlzdG9yeeOBr+a2iOOBleOBmuOBq2JvYWVk44GMMeOCv+ODvOODs+aIu+OCi1xuZXhwb3J0IGZ1bmN0aW9uIHJldHVybl9vbmVfdHVybihcbiAgYm9hcmRfaGlzdG9yeTogQm9hcmRfaGlzdG9yeSxcbiAgdHVybl9udW1iZXI6IG51bWJlclxuKTogQm9hcmQge1xuICBpZiAodHVybl9udW1iZXIgPj0gMSkge1xuICAgIGNvbnN0IGJvYXJkID0gZGVlcF9jb3B5X2JvYXJkKGJvYXJkX2hpc3RvcnlbdHVybl9udW1iZXIgLSAxXSFbMF0pO1xuICAgIHR1cm5fbnVtYmVyID0gdHVybl9udW1iZXIgLSAxO1xuICAgIHJldHVybiBib2FyZDtcbiAgfVxuICByZXR1cm4gZGVlcF9jb3B5X2JvYXJkKGJvYXJkX2hpc3RvcnlbdHVybl9udW1iZXJdIVswXSk7XG59XG5cbi8vaGlzdG9yeeOBr+a2iOOBleOBmuOBq2JvYWVk44GMMeOCv+ODvOODs+mAsuOCgFxuZXhwb3J0IGZ1bmN0aW9uIG5leHRfb25lX3R1cm4oXG4gIGJvYXJkX2hpc3Rvcnk6IEJvYXJkX2hpc3RvcnksXG4gIHR1cm5fbnVtYmVyOiBudW1iZXJcbik6IEJvYXJkIHtcbiAgaWYgKHR1cm5fbnVtYmVyIDwgYm9hcmRfaGlzdG9yeS5sZW5ndGggLSAxKSB7XG4gICAgY29uc3QgYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoYm9hcmRfaGlzdG9yeVt0dXJuX251bWJlciArIDFdIVswXSk7XG4gICAgdHVybl9udW1iZXIrKztcbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cbiAgcmV0dXJuIGRlZXBfY29weV9ib2FyZChib2FyZF9oaXN0b3J5W3R1cm5fbnVtYmVyXSFbMF0pO1xufVxuXG4vL+OBneOBrmJvYXJk5Lul6ZmN44GuaGlzdG9yeeOCkua2iOOBmVxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZV9sYXRlcl90dXJuKFxuICBib2FyZF9oaXN0b3J5OiBCb2FyZF9oaXN0b3J5LFxuICB0dXJuX251bWJlcjogbnVtYmVyXG4pOiBCb2FyZF9oaXN0b3J5IHtcbiAgaWYgKGJvYXJkX2hpc3RvcnkubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IG51bWJlcl9vZl9kZWxldGUgPSBib2FyZF9oaXN0b3J5Lmxlbmd0aCAtIHR1cm5fbnVtYmVyIC0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlcl9vZl9kZWxldGU7IGkrKykge1xuICAgICAgYm9hcmRfaGlzdG9yeS5wb3AoKTtcbiAgICB9XG4gICAgcmV0dXJuIGJvYXJkX2hpc3Rvcnk7XG4gIH1cbiAgcmV0dXJuIGJvYXJkX2hpc3Rvcnk7XG59XG5cbi8v5YmN5Zue44Gu44Gd44Gu6Imy44Gu44K/44O844Oz44G+44Gn5oi744KLXG5leHBvcnQgZnVuY3Rpb24gYmFja190b19teV90dXJuKFxuICBib2FyZF9oaXN0b3J5OiBCb2FyZF9oaXN0b3J5LFxuICB0dXJuX251bWJlcjogbnVtYmVyXG4pOiBudW1iZXIge1xuICBpZiAodHVybl9udW1iZXIgPiAxKSB7XG4gICAgY29uc3QgaXNfYmxhY2tfdHVybiA9IGJvYXJkX2hpc3RvcnlbdHVybl9udW1iZXJdIVswXS5ibGFja190dXJuO1xuICAgIHR1cm5fbnVtYmVyLS07XG4gICAgbGV0IGJlZm9yZV9ib2FyZCA9IGRlZXBfY29weV9ib2FyZChib2FyZF9oaXN0b3J5W3R1cm5fbnVtYmVyXSFbMF0pO1xuICAgIHdoaWxlIChpc19ibGFja190dXJuICE9PSBiZWZvcmVfYm9hcmQuYmxhY2tfdHVybikge1xuICAgICAgdHVybl9udW1iZXItLTtcbiAgICAgIGJlZm9yZV9ib2FyZCA9IGRlZXBfY29weV9ib2FyZChib2FyZF9oaXN0b3J5W3R1cm5fbnVtYmVyXSFbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gdHVybl9udW1iZXI7XG4gIH1cbiAgcmV0dXJuIHR1cm5fbnVtYmVyO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBuZXdfcmFuZG9tX3BsYXllciB9IGZyb20gJy4vYWknO1xuaW1wb3J0IHsgZHJhd19ib2FyZCwgZHJhd19ncmlkLCBkcmF3X3BpZWNlLCBkcmF3X3BpZWNlcyB9IGZyb20gJy4vZHJhd2VyJztcbmltcG9ydCB7IGNyZWF0ZV9nYW1lLCBwdXRfY2FuY2VsX2J1dHRvbiwgc3RhcnRfbG9vcCB9IGZyb20gJy4vZ2FtZSc7XG5pbXBvcnQge1xuICBCb2FyZCxcbiAgY2FsY19zY29yZSxcbiAgZ2VuZXJhdGVfaW5pdGlhbF9ib2FyZCxcbiAgc3RyaW5naWZ5X2JvYXJkLFxuICBwdXRfc3RvbmUsXG4gIGZsaXBfc3RvbmUsXG4gIG1vdmVfdHVybixcbiAgcGFyc2VfY29vcmQsXG4gIGlzX3ZhbGlkX21vdmUsXG4gIGFkZF92ZWMsXG4gIGp1ZGdlX2ZsaXBfMWQsXG4gIERJUkVDVElPTlMsXG4gIGFsbF92YWxpZF9tb3ZlcyxcbiAgbmV4dF9zdGF0ZSxcbiAgR2FtZXN0YXR1cyxcbiAgZmxpcGFibGVfYWxsX3BsYWNlcyxcbn0gZnJvbSAnLi9vdGhlbGxvJztcblxuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICBjb25zdCBtZXNzYWdlX2hvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICBjb25zdCBzdGFydF9idXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnc3RhcnRfYnV0dG9uJ1xuICApIGFzIEhUTUxCdXR0b25FbGVtZW50O1xuICBjb25zdCBjYW5jZWxfYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgJ2NhbmNlbF9idXR0b24nXG4gICkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGNvbnN0IHNlbGVjdF9ibGFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICdzZWxlY3RfYmxhY2snXG4gICkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGNvbnN0IHNlbGVjdF93aGl0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICdzZWxlY3Rfd2hpdGUnXG4gICkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGNvbnN0IHNlbGVjdF9BSWJhdHRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICdzZWxlY3RfQUliYXR0bGUnXG4gICkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgc3RhcnRfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGNhbmNlbF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICBjb25zdCBnYW1lID0gY3JlYXRlX2dhbWUoXG4gICAgY2FudmFzLFxuICAgIG1lc3NhZ2VfaG9sZGVyLFxuICAgIHN0YXJ0X2J1dHRvbixcbiAgICBjYW5jZWxfYnV0dG9uLFxuICAgIHNlbGVjdF9ibGFjayxcbiAgICBzZWxlY3Rfd2hpdGUsXG4gICAgc2VsZWN0X0FJYmF0dGxlXG4gICk7XG4gIHB1dF9jYW5jZWxfYnV0dG9uKGdhbWUsIGdhbWUuY2FuY2VsX2J1dHRvbik7XG4gIGRyYXdfYm9hcmQoZ2FtZS5ib2FyZCwgY2FudmFzKTtcbiAgc3RhcnRfbG9vcChnYW1lLCBjYW52YXMpO1xufTtcblxubWFpbigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9