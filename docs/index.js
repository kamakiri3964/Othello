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
/* harmony export */   "alphabeta_agent_stone_count": () => (/* binding */ alphabeta_agent_stone_count),
/* harmony export */   "alphabeta_agent_enemy_CPP": () => (/* binding */ alphabeta_agent_enemy_CPP),
/* harmony export */   "alphabeta_agent_score_count_1": () => (/* binding */ alphabeta_agent_score_count_1)
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
function alphabeta_agent_stone_count() {
    return {
        next_move: alphabeta_move_stone_count,
    };
}
function alphabeta_move_stone_count(board) {
    const score = alphabeta_eval_by_search(board, 6, 100000000, -100000000, stone_count_for_eval);
    return score[1];
}
function alphabeta_eval_by_search(board, depth, max_score, min_score, input_function) {
    if (depth <= 1) {
        return input_function(board);
    }
    else {
        const can_put_place = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.all_valid_moves)(board);
        let best_score = -100000000;
        let best_move = [0, 0];
        if ((0,_othello__WEBPACK_IMPORTED_MODULE_0__.all_valid_moves)(board).length <= 0) {
            const cannot_put_board = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.deep_copy_board)(board);
            (0,_othello__WEBPACK_IMPORTED_MODULE_0__.move_turn)(cannot_put_board);
            return alphabeta_eval_by_search(cannot_put_board, depth - 1, -min_score, -max_score, input_function);
        }
        for (const input_place of can_put_place) {
            const temporary_board = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.deep_copy_board)(board);
            const next_board = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.next_state_for_minimax)(temporary_board, input_place);
            const score = alphabeta_eval_by_search(next_board, depth - 1, -best_score, -max_score, input_function);
            if (-score[0] >= max_score) {
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
function enemy_CPP_minimam(board) {
    const score = (0,_othello__WEBPACK_IMPORTED_MODULE_0__.all_valid_moves)(board).length;
    return [score, [0, 0]];
}
function alphabeta_agent_enemy_CPP() {
    return {
        next_move: alphabeta_move_enemy_CPP,
    };
}
function alphabeta_move_enemy_CPP(board) {
    const score = alphabeta_eval_by_search(board, 5, 100000000, -100000000, enemy_CPP_minimam);
    return score[1];
}
const eval_score_1 = [
    [200, -50, 40, 5, 5, 40, -50, 200],
    [-50, -90, -10, -5, -5, -10, -90, -50],
    [40, -10, -2, -2, -2, -2, -10, 40],
    [5, -5, -2, 1, 1, -2, -5, 5],
    [5, -5, -2, 1, 1, -2, -5, 5],
    [40, -10, -2, -2, -2, -2, -10, 40],
    [-50, -90, -10, -5, -5, -10, -90, -50],
    [200, -50, 40, 5, 5, 40, -50, 200],
];
function eval_score_count_1(board) {
    const is_black_turn = board.black_turn;
    let b_score = 0;
    let w_score = 0;
    board.black.forEach((r, i) => {
        r.forEach((b, j) => {
            if (b) {
                b_score = b_score + eval_score_1[i][j];
            }
        });
    });
    board.white.forEach((r, i) => {
        r.forEach((b, j) => {
            if (b) {
                w_score = w_score + eval_score_1[i][j];
            }
        });
    });
    if (is_black_turn) {
        return [b_score - w_score, [0, 0]];
    }
    else {
        return [w_score - b_score, [0, 0]];
    }
}
function alphabeta_agent_score_count_1() {
    return {
        next_move: alphabeta_move_score_count_1,
    };
}
function alphabeta_move_score_count_1(board) {
    const score = alphabeta_eval_by_search(board, 6, 100000000, -100000000, eval_score_count_1);
    return score[1];
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
/* harmony export */   "choice_AI": () => (/* binding */ choice_AI),
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
function choice_AI(computer) {
    if (computer === 'CP1') {
        return (0,_ai__WEBPACK_IMPORTED_MODULE_0__.new_random_player)();
    }
    if (computer === 'CP2') {
        return (0,_ai__WEBPACK_IMPORTED_MODULE_0__.alphabeta_agent_stone_count)();
    }
    if (computer === 'CP3') {
        return (0,_ai__WEBPACK_IMPORTED_MODULE_0__.alphabeta_agent_enemy_CPP)();
    }
    if (computer === 'CP4') {
        return (0,_ai__WEBPACK_IMPORTED_MODULE_0__.alphabeta_agent_score_count_1)();
    }
    return (0,_ai__WEBPACK_IMPORTED_MODULE_0__.new_random_player)();
}
function put_start_button(game, start_button, cancel_button, select_black, select_white, select_AIbattle, first_AIselect_box, first_AIselect_form, second_AIselect_box, second_AIselect_form, fix_AI) {
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
        game.start_button.style.display = 'none';
        game.select_black.style.display = 'none';
        game.select_white.style.display = 'none';
        game.select_AIbattle.style.display = 'none';
        game.cancel_button.style.display = 'none';
        game.fix_AI.style.display = 'inline';
        game.second_AIselect_form.style.display = 'inline';
        fix_AI.addEventListener('click', (e) => {
            game.now_gaming = true;
            game.cancel_button.style.display = 'inline';
            game.second_AIselect_form.style.display = 'none';
            game.fix_AI.style.display = 'none';
            game.board = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.generate_initial_board)();
            (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.draw_board)(game.board, game.canvas);
            game.black_player = 'user';
            game.white_player = choice_AI(second_AIselect_box.value);
            game.message_holder.innerText =
                'さあゲームを始めましょう。' + '\n' + 'あなた(黒)の手番です。';
        });
    });
    select_white.addEventListener('click', (e) => {
        game.start_button.style.display = 'none';
        game.select_black.style.display = 'none';
        game.select_white.style.display = 'none';
        game.select_AIbattle.style.display = 'none';
        game.cancel_button.style.display = 'none';
        game.fix_AI.style.display = 'inline';
        game.first_AIselect_form.style.display = 'inline';
        fix_AI.addEventListener('click', (e) => {
            game.now_gaming = true;
            game.cancel_button.style.display = 'inline';
            game.first_AIselect_form.style.display = 'none';
            game.fix_AI.style.display = 'none';
            game.board = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.generate_initial_board)();
            (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.draw_board)(game.board, game.canvas);
            game.black_player = choice_AI(first_AIselect_box.value);
            game.white_player = 'user';
            game.message_holder.innerText = '黒の手番です。';
        });
    });
    select_AIbattle.addEventListener('click', (e) => {
        game.start_button.style.display = 'none';
        game.select_black.style.display = 'none';
        game.select_white.style.display = 'none';
        game.select_AIbattle.style.display = 'none';
        game.cancel_button.style.display = 'none';
        game.fix_AI.style.display = 'inline';
        game.first_AIselect_form.style.display = 'inline';
        game.second_AIselect_form.style.display = 'inline';
        fix_AI.addEventListener('click', (e) => {
            game.now_gaming = true;
            game.cancel_button.style.display = 'inline';
            game.first_AIselect_form.style.display = 'none';
            game.second_AIselect_form.style.display = 'none';
            game.fix_AI.style.display = 'none';
            game.board = (0,_othello__WEBPACK_IMPORTED_MODULE_2__.generate_initial_board)();
            (0,_drawer__WEBPACK_IMPORTED_MODULE_1__.draw_board)(game.board, game.canvas);
            game.black_player = choice_AI(first_AIselect_box.value);
            game.white_player = choice_AI(second_AIselect_box.value);
            game.message_holder.innerText = '黒の手番です。';
        });
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
function create_game(canvas, message_holder, start_button, cancel_button, select_black, select_white, select_AIbattle, first_AIselect_box, first_AIselect_form, second_AIselect_box, second_AIselect_form, fix_AI) {
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
        first_AIselect_box: first_AIselect_box,
        first_AIselect_form: first_AIselect_form,
        second_AIselect_box: second_AIselect_box,
        second_AIselect_form: second_AIselect_form,
        fix_AI: fix_AI,
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
    put_start_button(game, game.start_button, game.cancel_button, game.select_black, game.select_white, game.select_AIbattle, game.first_AIselect_box, game.first_AIselect_form, game.second_AIselect_box, game.second_AIselect_form, game.fix_AI);
    return game;
}
function wait(sec) {
    let start_time = performance.now();
    while (performance.now() - start_time < sec) { }
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
    const first_AIselect_form = document.getElementById('first_AIselect_form');
    const second_AIselect_form = document.getElementById('second_AIselect_form');
    const first_AIselect_box = document.getElementById('first_AIselect_box');
    const second_AIselect_box = document.getElementById('second_AIselect_box');
    const fix_AI = document.getElementById('fix_AI');
    cancel_button.style.display = 'none';
    fix_AI.style.display = 'none';
    first_AIselect_form.style.display = 'none';
    second_AIselect_form.style.display = 'none';
    const game = (0,_game__WEBPACK_IMPORTED_MODULE_1__.create_game)(canvas, message_holder, start_button, cancel_button, select_black, select_white, select_AIbattle, first_AIselect_box, first_AIselect_form, second_AIselect_box, second_AIselect_form, fix_AI);
    (0,_game__WEBPACK_IMPORTED_MODULE_1__.put_cancel_button)(game, game.cancel_button);
    (0,_drawer__WEBPACK_IMPORTED_MODULE_0__.draw_board)(game.board, canvas);
    (0,_game__WEBPACK_IMPORTED_MODULE_1__.start_loop)(game, canvas);
};
main();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ2xCLENBQUM7QUFFRCxNQUFNLFlBQVksR0FBZTtJQUMvQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNsQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3RDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUs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QixNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQ2pELHFCQUFxQixDQUNELENBQUM7SUFDdkIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQXNCLENBQUM7SUFFdEUsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3JDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUM5QixtQkFBbUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMzQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUU1QyxNQUFNLElBQUksR0FBRyxrREFBVyxDQUN0QixNQUFNLEVBQ04sY0FBYyxFQUNkLFlBQVksRUFDWixhQUFhLEVBQ2IsWUFBWSxFQUNaLFlBQVksRUFDWixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsb0JBQW9CLEVBQ3BCLE1BQU0sQ0FDUCxDQUFDO0lBQ0Ysd0RBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QyxtREFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0IsaURBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFDO0FBRUYsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vdGhlbGxvLy4vc3JjL2FpLnRzIiwid2VicGFjazovL290aGVsbG8vLi9zcmMvZHJhd2VyLnRzIiwid2VicGFjazovL290aGVsbG8vLi9zcmMvZ2FtZS50cyIsIndlYnBhY2s6Ly9vdGhlbGxvLy4vc3JjL290aGVsbG8udHMiLCJ3ZWJwYWNrOi8vb3RoZWxsby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vdGhlbGxvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vdGhlbGxvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3RoZWxsby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL290aGVsbG8vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYWxsX3ZhbGlkX21vdmVzLFxuICBCb2FyZCxcbiAgY2FsY19zY29yZSxcbiAgZGVlcF9jb3B5X2JvYXJkLFxuICBkZWVwX2NvcHlfYm9hcmRfYXJyYXksXG4gIEdhbWVzdGF0dXMsXG4gIG1vdmVfdHVybixcbiAgbmV4dF9zdGF0ZSxcbiAgbmV4dF9zdGF0ZV9mb3JfbWluaW1heCxcbn0gZnJvbSAnLi9vdGhlbGxvJztcblxuZXhwb3J0IHR5cGUgQUlBZ2VudCA9IHtcbiAgbmV4dF9tb3ZlKGJvYXJkOiBSZWFkb25seTxCb2FyZD4pOiBbbnVtYmVyLCBudW1iZXJdO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld19yYW5kb21fcGxheWVyKCk6IEFJQWdlbnQge1xuICByZXR1cm4ge1xuICAgIG5leHRfbW92ZTogKGJvYXJkOiBSZWFkb25seTxCb2FyZD4pID0+IHtcbiAgICAgIGNvbnN0IGNhbl9wdXRfcGxhY2UgPSBhbGxfdmFsaWRfbW92ZXMoYm9hcmQpO1xuICAgICAgY29uc3QgcHV0X3BsYWNlID1cbiAgICAgICAgY2FuX3B1dF9wbGFjZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjYW5fcHV0X3BsYWNlLmxlbmd0aCldO1xuICAgICAgaWYgKHB1dF9wbGFjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBwdXRfcGxhY2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gWy0xLCAtMV07XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld193ZWFrX2FnZW50KCk6IEFJQWdlbnQge1xuICByZXR1cm4ge1xuICAgIG5leHRfbW92ZTogd2Vha19hZ2VudF9tb3ZlLFxuICB9O1xufVxuXG50eXBlIFNjb3JlID0gW251bWJlciwgW251bWJlciwgbnVtYmVyXV07XG5cbmZ1bmN0aW9uIHdlYWtfYWdlbnRfbW92ZShib2FyZDogUmVhZG9ubHk8Qm9hcmQ+KTogW251bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IGNhbl9wdXRfcGxhY2UgPSBhbGxfdmFsaWRfbW92ZXMoYm9hcmQpO1xuICBjb25zdCBpc19ibGFja190dXJuID0gYm9hcmQuYmxhY2tfdHVybjtcbiAgY29uc3Qgc2NvcmVzOiBTY29yZVtdID0gW107XG4gIGZvciAoY29uc3QgaW5wdXRfcGxhY2Ugb2YgY2FuX3B1dF9wbGFjZSkge1xuICAgIGNvbnN0IHRlbXBvcmFyeV9ib2FyZCA9IGRlZXBfY29weV9ib2FyZChib2FyZCk7XG4gICAgY29uc3QgW25leHRfYm9hcmQsIHN0YXR1c10gPSBuZXh0X3N0YXRlKHRlbXBvcmFyeV9ib2FyZCwgaW5wdXRfcGxhY2UpO1xuICAgIGNvbnN0IFtiX3Njb3JlLCB3X3Njb3JlXSA9IGNhbGNfc2NvcmUobmV4dF9ib2FyZCk7XG4gICAgaWYgKGlzX2JsYWNrX3R1cm4pIHtcbiAgICAgIHNjb3Jlcy5wdXNoKFtiX3Njb3JlLCBpbnB1dF9wbGFjZV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY29yZXMucHVzaChbd19zY29yZSwgaW5wdXRfcGxhY2VdKTtcbiAgICB9XG4gIH1cbiAgc2NvcmVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBpZiAoYVswXSA+IGJbMF0pIHJldHVybiAtMTtcbiAgICBpZiAoYVswXSA8IGJbMF0pIHJldHVybiAxO1xuICAgIHJldHVybiAwO1xuICB9KTtcbiAgcmV0dXJuIHNjb3Jlc1swXSFbMV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtaW5pbWF4X2FnZW50KCk6IEFJQWdlbnQge1xuICByZXR1cm4ge1xuICAgIG5leHRfbW92ZTogbWluaW1heF9tb3ZlLFxuICB9O1xufVxuXG5mdW5jdGlvbiBtaW5pbWF4X21vdmUoYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPik6IFtudW1iZXIsIG51bWJlcl0ge1xuICBjb25zdCBzY29yZSA9IGV2YWxfYnlfc2VhcmNoKGJvYXJkLCA2KTtcbiAgcmV0dXJuIHNjb3JlWzFdO1xufVxuXG5mdW5jdGlvbiBldmFsX2J5X3NlYXJjaChib2FyZDogUmVhZG9ubHk8Qm9hcmQ+LCBkZXB0aDogbnVtYmVyKTogU2NvcmUge1xuICBpZiAoZGVwdGggPD0gMSkge1xuICAgIHJldHVybiBzdG9uZV9jb3VudF9mb3JfZXZhbChib2FyZCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY2FuX3B1dF9wbGFjZSA9IGFsbF92YWxpZF9tb3Zlcyhib2FyZCk7XG4gICAgbGV0IGJlc3Rfc2NvcmU6IG51bWJlciA9IC02NDtcbiAgICBsZXQgYmVzdF9tb3ZlOiBbbnVtYmVyLCBudW1iZXJdID0gWzAsIDBdO1xuXG4gICAgZm9yIChjb25zdCBpbnB1dF9wbGFjZSBvZiBjYW5fcHV0X3BsYWNlKSB7XG4gICAgICBjb25zdCB0ZW1wb3JhcnlfYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoYm9hcmQpO1xuICAgICAgY29uc3QgW25leHRfYm9hcmQsIHN0YXR1c10gPSBuZXh0X3N0YXRlKHRlbXBvcmFyeV9ib2FyZCwgaW5wdXRfcGxhY2UpO1xuXG4gICAgICBpZiAoc3RhdHVzICE9PSBHYW1lc3RhdHVzLlBhc3MpIHtcbiAgICAgICAgY29uc3Qgc2NvcmUgPSBldmFsX2J5X3NlYXJjaChuZXh0X2JvYXJkLCBkZXB0aCAtIDEpO1xuICAgICAgICBpZiAoLXNjb3JlWzBdID4gYmVzdF9zY29yZSkge1xuICAgICAgICAgIFtiZXN0X3Njb3JlLCBiZXN0X21vdmVdID0gWy1zY29yZVswXSwgaW5wdXRfcGxhY2VdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzY29yZSA9IGV2YWxfYnlfc2VhcmNoKG5leHRfYm9hcmQsIGRlcHRoIC0gMik7XG4gICAgICAgIGlmIChzY29yZVswXSA+IGJlc3Rfc2NvcmUpIHtcbiAgICAgICAgICBbYmVzdF9zY29yZSwgYmVzdF9tb3ZlXSA9IFtzY29yZVswXSwgaW5wdXRfcGxhY2VdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbYmVzdF9zY29yZSwgYmVzdF9tb3ZlXTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxwaGFiZXRhX2FnZW50X3N0b25lX2NvdW50KCk6IEFJQWdlbnQge1xuICByZXR1cm4ge1xuICAgIG5leHRfbW92ZTogYWxwaGFiZXRhX21vdmVfc3RvbmVfY291bnQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGFscGhhYmV0YV9tb3ZlX3N0b25lX2NvdW50KGJvYXJkOiBSZWFkb25seTxCb2FyZD4pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgY29uc3Qgc2NvcmUgPSBhbHBoYWJldGFfZXZhbF9ieV9zZWFyY2goXG4gICAgYm9hcmQsXG4gICAgNixcbiAgICAxMDAwMDAwMDAsXG4gICAgLTEwMDAwMDAwMCxcbiAgICBzdG9uZV9jb3VudF9mb3JfZXZhbFxuICApO1xuICByZXR1cm4gc2NvcmVbMV07XG59XG5cbmZ1bmN0aW9uIGFscGhhYmV0YV9ldmFsX2J5X3NlYXJjaChcbiAgYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPixcbiAgZGVwdGg6IG51bWJlcixcbiAgbWF4X3Njb3JlOiBudW1iZXIsXG4gIG1pbl9zY29yZTogbnVtYmVyLFxuICBpbnB1dF9mdW5jdGlvbjogRnVuY3Rpb25cbik6IFNjb3JlIHtcbiAgaWYgKGRlcHRoIDw9IDEpIHtcbiAgICByZXR1cm4gaW5wdXRfZnVuY3Rpb24oYm9hcmQpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGNhbl9wdXRfcGxhY2UgPSBhbGxfdmFsaWRfbW92ZXMoYm9hcmQpO1xuICAgIGxldCBiZXN0X3Njb3JlOiBudW1iZXIgPSAtMTAwMDAwMDAwO1xuICAgIGxldCBiZXN0X21vdmU6IFtudW1iZXIsIG51bWJlcl0gPSBbMCwgMF07XG5cbiAgICBpZiAoYWxsX3ZhbGlkX21vdmVzKGJvYXJkKS5sZW5ndGggPD0gMCkge1xuICAgICAgY29uc3QgY2Fubm90X3B1dF9ib2FyZCA9IGRlZXBfY29weV9ib2FyZChib2FyZCk7XG4gICAgICBtb3ZlX3R1cm4oY2Fubm90X3B1dF9ib2FyZCk7XG4gICAgICByZXR1cm4gYWxwaGFiZXRhX2V2YWxfYnlfc2VhcmNoKFxuICAgICAgICBjYW5ub3RfcHV0X2JvYXJkLFxuICAgICAgICBkZXB0aCAtIDEsXG4gICAgICAgIC1taW5fc2NvcmUsXG4gICAgICAgIC1tYXhfc2NvcmUsXG4gICAgICAgIGlucHV0X2Z1bmN0aW9uXG4gICAgICApO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgaW5wdXRfcGxhY2Ugb2YgY2FuX3B1dF9wbGFjZSkge1xuICAgICAgY29uc3QgdGVtcG9yYXJ5X2JvYXJkID0gZGVlcF9jb3B5X2JvYXJkKGJvYXJkKTtcbiAgICAgIGNvbnN0IG5leHRfYm9hcmQgPSBuZXh0X3N0YXRlX2Zvcl9taW5pbWF4KHRlbXBvcmFyeV9ib2FyZCwgaW5wdXRfcGxhY2UpO1xuICAgICAgY29uc3Qgc2NvcmUgPSBhbHBoYWJldGFfZXZhbF9ieV9zZWFyY2goXG4gICAgICAgIG5leHRfYm9hcmQsXG4gICAgICAgIGRlcHRoIC0gMSxcbiAgICAgICAgLWJlc3Rfc2NvcmUsXG4gICAgICAgIC1tYXhfc2NvcmUsXG4gICAgICAgIGlucHV0X2Z1bmN0aW9uXG4gICAgICApO1xuICAgICAgaWYgKC1zY29yZVswXSA+PSBtYXhfc2NvcmUpIHtcbiAgICAgICAgcmV0dXJuIFstc2NvcmVbMF0sIGlucHV0X3BsYWNlXTtcbiAgICAgIH1cbiAgICAgIGlmICgtc2NvcmVbMF0gPiBiZXN0X3Njb3JlKSB7XG4gICAgICAgIFtiZXN0X3Njb3JlLCBiZXN0X21vdmVdID0gWy1zY29yZVswXSwgaW5wdXRfcGxhY2VdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW2Jlc3Rfc2NvcmUsIGJlc3RfbW92ZV07XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RvbmVfY291bnRfZm9yX2V2YWwoYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPik6IFNjb3JlIHtcbiAgY29uc3QgaXNfYmxhY2tfdHVybiA9IGJvYXJkLmJsYWNrX3R1cm47XG4gIGNvbnN0IFtiX3Njb3JlLCB3X3Njb3JlXSA9IGNhbGNfc2NvcmUoYm9hcmQpO1xuICBpZiAoaXNfYmxhY2tfdHVybikge1xuICAgIHJldHVybiBbYl9zY29yZSwgWzAsIDBdXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW3dfc2NvcmUsIFswLCAwXV07XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5lbXlfQ1BQX21pbmltYW0oYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPik6IFNjb3JlIHtcbiAgY29uc3Qgc2NvcmUgPSBhbGxfdmFsaWRfbW92ZXMoYm9hcmQpLmxlbmd0aDtcbiAgcmV0dXJuIFtzY29yZSwgWzAsIDBdXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFscGhhYmV0YV9hZ2VudF9lbmVteV9DUFAoKTogQUlBZ2VudCB7XG4gIHJldHVybiB7XG4gICAgbmV4dF9tb3ZlOiBhbHBoYWJldGFfbW92ZV9lbmVteV9DUFAsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGFscGhhYmV0YV9tb3ZlX2VuZW15X0NQUChib2FyZDogUmVhZG9ubHk8Qm9hcmQ+KTogW251bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IHNjb3JlID0gYWxwaGFiZXRhX2V2YWxfYnlfc2VhcmNoKFxuICAgIGJvYXJkLFxuICAgIDUsXG4gICAgMTAwMDAwMDAwLFxuICAgIC0xMDAwMDAwMDAsXG4gICAgZW5lbXlfQ1BQX21pbmltYW1cbiAgKTtcbiAgcmV0dXJuIHNjb3JlWzFdO1xufVxuXG5jb25zdCBldmFsX3Njb3JlXzE6IG51bWJlcltdW10gPSBbXG4gIFsyMDAsIC01MCwgNDAsIDUsIDUsIDQwLCAtNTAsIDIwMF0sXG4gIFstNTAsIC05MCwgLTEwLCAtNSwgLTUsIC0xMCwgLTkwLCAtNTBdLFxuICBbNDAsIC0xMCwgLTIsIC0yLCAtMiwgLTIsIC0xMCwgNDBdLFxuICBbNSwgLTUsIC0yLCAxLCAxLCAtMiwgLTUsIDVdLFxuICBbNSwgLTUsIC0yLCAxLCAxLCAtMiwgLTUsIDVdLFxuICBbNDAsIC0xMCwgLTIsIC0yLCAtMiwgLTIsIC0xMCwgNDBdLFxuICBbLTUwLCAtOTAsIC0xMCwgLTUsIC01LCAtMTAsIC05MCwgLTUwXSxcbiAgWzIwMCwgLTUwLCA0MCwgNSwgNSwgNDAsIC01MCwgMjAwXSxcbl07XG5cbmZ1bmN0aW9uIGV2YWxfc2NvcmVfY291bnRfMShib2FyZDogUmVhZG9ubHk8Qm9hcmQ+KTogU2NvcmUge1xuICBjb25zdCBpc19ibGFja190dXJuID0gYm9hcmQuYmxhY2tfdHVybjtcbiAgbGV0IGJfc2NvcmUgPSAwO1xuICBsZXQgd19zY29yZSA9IDA7XG5cbiAgYm9hcmQuYmxhY2suZm9yRWFjaCgociwgaSkgPT4ge1xuICAgIHIuZm9yRWFjaCgoYiwgaikgPT4ge1xuICAgICAgaWYgKGIpIHtcbiAgICAgICAgYl9zY29yZSA9IGJfc2NvcmUgKyBldmFsX3Njb3JlXzFbaV0hW2pdITtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIGJvYXJkLndoaXRlLmZvckVhY2goKHIsIGkpID0+IHtcbiAgICByLmZvckVhY2goKGIsIGopID0+IHtcbiAgICAgIGlmIChiKSB7XG4gICAgICAgIHdfc2NvcmUgPSB3X3Njb3JlICsgZXZhbF9zY29yZV8xW2ldIVtqXSE7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICBpZiAoaXNfYmxhY2tfdHVybikge1xuICAgIHJldHVybiBbYl9zY29yZSAtIHdfc2NvcmUsIFswLCAwXV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFt3X3Njb3JlIC0gYl9zY29yZSwgWzAsIDBdXTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxwaGFiZXRhX2FnZW50X3Njb3JlX2NvdW50XzEoKTogQUlBZ2VudCB7XG4gIHJldHVybiB7XG4gICAgbmV4dF9tb3ZlOiBhbHBoYWJldGFfbW92ZV9zY29yZV9jb3VudF8xLFxuICB9O1xufVxuXG5mdW5jdGlvbiBhbHBoYWJldGFfbW92ZV9zY29yZV9jb3VudF8xKFxuICBib2FyZDogUmVhZG9ubHk8Qm9hcmQ+XG4pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgY29uc3Qgc2NvcmUgPSBhbHBoYWJldGFfZXZhbF9ieV9zZWFyY2goXG4gICAgYm9hcmQsXG4gICAgNixcbiAgICAxMDAwMDAwMDAsXG4gICAgLTEwMDAwMDAwMCxcbiAgICBldmFsX3Njb3JlX2NvdW50XzFcbiAgKTtcbiAgcmV0dXJuIHNjb3JlWzFdO1xufVxuIiwiaW1wb3J0IHtcbiAgQm9hcmQsXG4gIGNhbGNfc2NvcmUsXG4gIGdlbmVyYXRlX2luaXRpYWxfYm9hcmQsXG4gIHN0cmluZ2lmeV9ib2FyZCxcbiAgcHV0X3N0b25lLFxuICBmbGlwX3N0b25lLFxuICBtb3ZlX3R1cm4sXG4gIHBhcnNlX2Nvb3JkLFxuICBpc192YWxpZF9tb3ZlLFxuICBhZGRfdmVjLFxuICBqdWRnZV9mbGlwXzFkLFxuICBESVJFQ1RJT05TLFxuICBhbGxfdmFsaWRfbW92ZXMsXG4gIGZsaXBhYmxlX2FsbF9wbGFjZXMsXG4gIG5leHRfc3RhdGUsXG4gIEdhbWVzdGF0dXMsXG59IGZyb20gJy4vb3RoZWxsbyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0X3ZlYyhcbiAgeDogbnVtYmVyLFxuICB5OiBudW1iZXIsXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnRcbik6IFtudW1iZXIsIG51bWJlcl0ge1xuICBsZXQgaGlnaHRfbWFnID0gY2FudmFzLmhlaWdodCAvIDEwMDtcbiAgbGV0IHdpZHRoX21hZyA9IGNhbnZhcy53aWR0aCAvIDEwMDtcbiAgcmV0dXJuIFt4ICogaGlnaHRfbWFnLCB5ICogd2lkdGhfbWFnXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRfc2NhbChhOiBudW1iZXIsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiBudW1iZXIge1xuICBsZXQgc2NhbF9tYWcgPSBjYW52YXMuaGVpZ2h0IC8gMTAwO1xuICByZXR1cm4gYSAqIHNjYWxfbWFnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd19ncmlkKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIC8vICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcblxuICBsZXQgW2ZpZWxkX3NwX3gsIGZpZWxkX3NwX3ldID0gY29udmVydF92ZWMoMCwgMCwgY2FudmFzKTtcbiAgbGV0IGZpZWxkX3NpemVfbGVuZ3RoID0gY29udmVydF9zY2FsKDEwMCwgY2FudmFzKTtcblxuICBpZiAoY3R4ICE9IHVuZGVmaW5lZCkge1xuICAgIC8vIOWfuuekjuOBruebpOmdoumVt+aWueW9ouOBq+Whl+OCiuOBpOOBtuOBmVxuICAgIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xuICAgIGN0eC5maWxsUmVjdChmaWVsZF9zcF94LCBmaWVsZF9zcF95LCBmaWVsZF9zaXplX2xlbmd0aCwgZmllbGRfc2l6ZV9sZW5ndGgpO1xuXG4gICAgLy8g57im57ea44KS44Gy44GPXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ2dyYXknO1xuICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKGZpZWxkX3NwX3ggKyAoZmllbGRfc2l6ZV9sZW5ndGggLyA4KSAqIGksIGZpZWxkX3NwX3kpO1xuICAgICAgY3R4LmxpbmVUbyhcbiAgICAgICAgZmllbGRfc3BfeCArIChmaWVsZF9zaXplX2xlbmd0aCAvIDgpICogaSxcbiAgICAgICAgZmllbGRfc3BfeSArIGZpZWxkX3NpemVfbGVuZ3RoXG4gICAgICApO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIC8vIOaoque3muOCkuOBsuOBj1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdncmF5JztcbiAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhmaWVsZF9zcF94LCBmaWVsZF9zcF95ICsgKGZpZWxkX3NpemVfbGVuZ3RoIC8gOCkgKiBpKTtcbiAgICAgIGN0eC5saW5lVG8oXG4gICAgICAgIGZpZWxkX3NwX3ggKyBmaWVsZF9zaXplX2xlbmd0aCxcbiAgICAgICAgZmllbGRfc3BfeSArIChmaWVsZF9zaXplX2xlbmd0aCAvIDgpICogaVxuICAgICAgKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdfcGllY2UoXG4gIGk6IG51bWJlcixcbiAgajogbnVtYmVyLFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICBjb2xvcjogYm9vbGVhblxuKTogdm9pZCB7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAvLyAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgY29uc3QgW2NlbnRlcl94LCBjZW50ZXJfeV0gPSBjb252ZXJ0X3ZlYyhcbiAgICAxMDAgLyAxNiArIChqICogMTAwKSAvIDgsXG4gICAgMTAwIC8gMTYgKyAoaSAqIDEwMCkgLyA4LFxuICAgIGNhbnZhc1xuICApO1xuICBjb25zdCByID0gY29udmVydF9zY2FsKDUsIGNhbnZhcyk7XG5cbiAgaWYgKGN0eCAhPSB1bmRlZmluZWQpIHtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnZ3JheSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgaWYgKGNvbG9yID09PSB0cnVlKSB7XG4gICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICB9IGVsc2Uge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgfVxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKGNlbnRlcl94LCBjZW50ZXJfeSwgciwgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd19jYW5fcHV0X3BsYWNlKFxuICBpOiBudW1iZXIsXG4gIGo6IG51bWJlcixcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxuKTogdm9pZCB7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAvLyAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cbiAgY29uc3QgW2NlbnRlcl94LCBjZW50ZXJfeV0gPSBjb252ZXJ0X3ZlYyhcbiAgICAxMDAgLyAxNiArIChqICogMTAwKSAvIDgsXG4gICAgMTAwIC8gMTYgKyAoaSAqIDEwMCkgLyA4LFxuICAgIGNhbnZhc1xuICApO1xuICBjb25zdCByID0gY29udmVydF9zY2FsKDIsIGNhbnZhcyk7XG5cbiAgaWYgKGN0eCAhPSB1bmRlZmluZWQpIHtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnZ3JheSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICdncmF5JztcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhjZW50ZXJfeCwgY2VudGVyX3ksIHIsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdfcGllY2VzKGJvYXJkOiBCb2FyZCwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICBpZiAoYm9hcmQuYmxhY2tbaV0hW2pdKSB7XG4gICAgICAgIGRyYXdfcGllY2UoaSwgaiwgY2FudmFzLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmQud2hpdGVbaV0hW2pdKSB7XG4gICAgICAgIGRyYXdfcGllY2UoaSwgaiwgY2FudmFzLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3X2JvYXJkKGJvYXJkOiBCb2FyZCwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQge1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgY29uc3QgZmllbGRfc2l6ZSA9IFtcbiAgICBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLFxuICAgIHdpbmRvdy5pbm5lckhlaWdodCAtIDEwMCxcbiAgICA2MDAsXG4gIF0ucmVkdWNlKChhLCBiKSA9PiBNYXRoLm1pbihhLCBiKSk7XG4gIGNhbnZhcy5oZWlnaHQgPSBmaWVsZF9zaXplO1xuICBjYW52YXMud2lkdGggPSBmaWVsZF9zaXplO1xuXG4gIGlmIChjdHggIT0gdW5kZWZpbmVkKSB7XG4gICAgY3R4LmNsZWFyUmVjdChcbiAgICAgIC4uLmNvbnZlcnRfdmVjKDAsIDAsIGNhbnZhcyksXG4gICAgICAuLi5jb252ZXJ0X3ZlYygxMDAsIDEwMCwgY2FudmFzKVxuICAgICk7XG4gIH1cbiAgZHJhd19ncmlkKGNhbnZhcyk7XG4gIGRyYXdfcGllY2VzKGJvYXJkLCBjYW52YXMpO1xuICBhbGxfdmFsaWRfbW92ZXMoYm9hcmQpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBkcmF3X2Nhbl9wdXRfcGxhY2UoZWxlbWVudFswXSwgZWxlbWVudFsxXSwgY2FudmFzKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnB1dF9jb252ZXJ0X3BsYWNlKFxuICB1c2VyX2lucHV0OiBbbnVtYmVyLCBudW1iZXJdLFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG4pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgY29uc3QgdXNlcl9pbnB1dF8xMDAgPSBbXG4gICAgKHVzZXJfaW5wdXRbMF0gLyBjYW52YXMuaGVpZ2h0KSAqIDEwMCxcbiAgICAodXNlcl9pbnB1dFsxXSAvIGNhbnZhcy53aWR0aCkgKiAxMDAsXG4gIF07XG4gIGNvbnN0IGkgPSBNYXRoLnJvdW5kKCh1c2VyX2lucHV0XzEwMFswXSEgLSA2Ljc1KSAvIDEyLjUpO1xuICBjb25zdCBqID0gTWF0aC5yb3VuZCgodXNlcl9pbnB1dF8xMDBbMV0hIC0gNi43NSkgLyAxMi41KTtcbiAgcmV0dXJuIFtpLCBqXTtcbn1cbiIsImltcG9ydCB7IGJhc2VuYW1lIH0gZnJvbSAncGF0aC9wb3NpeCc7XG5pbXBvcnQgeyBnZXRTeXN0ZW1FcnJvck1hcCB9IGZyb20gJ3V0aWwnO1xuaW1wb3J0IHtcbiAgQUlBZ2VudCxcbiAgYWxwaGFiZXRhX2FnZW50X2VuZW15X0NQUCxcbiAgYWxwaGFiZXRhX2FnZW50X3Njb3JlX2NvdW50XzEsXG4gIGFscGhhYmV0YV9hZ2VudF9zdG9uZV9jb3VudCxcbiAgbWluaW1heF9hZ2VudCxcbiAgbmV3X3JhbmRvbV9wbGF5ZXIsXG4gIG5ld193ZWFrX2FnZW50LFxufSBmcm9tICcuL2FpJztcbmltcG9ydCB7IGRyYXdfYm9hcmQsIGRyYXdfcGllY2VzLCBpbnB1dF9jb252ZXJ0X3BsYWNlIH0gZnJvbSAnLi9kcmF3ZXInO1xuaW1wb3J0IHtcbiAgQm9hcmQsXG4gIGNhbGNfc2NvcmUsXG4gIGdlbmVyYXRlX2luaXRpYWxfYm9hcmQsXG4gIHN0cmluZ2lmeV9ib2FyZCxcbiAgcHV0X3N0b25lLFxuICBmbGlwX3N0b25lLFxuICBtb3ZlX3R1cm4sXG4gIHBhcnNlX2Nvb3JkLFxuICBpc192YWxpZF9tb3ZlLFxuICBhZGRfdmVjLFxuICBqdWRnZV9mbGlwXzFkLFxuICBESVJFQ1RJT05TLFxuICBhbGxfdmFsaWRfbW92ZXMsXG4gIG5leHRfc3RhdGUsXG4gIEdhbWVzdGF0dXMsXG4gIGZsaXBhYmxlX2FsbF9wbGFjZXMsXG4gIEJvYXJkX2hpc3RvcnksXG4gIGFkZF9ib2FyZF9oaXN0b3J5LFxuICBkZWVwX2NvcHlfYm9hcmQsXG4gIGRlbGV0ZV9sYXRlcl90dXJuLFxuICBkZWVwX2NvcHlfYm9hcmRfYXJyYXksXG4gIGJhY2tfdG9fbXlfdHVybixcbiAgdXBkYXRlX2hpc3RvcnksXG59IGZyb20gJy4vb3RoZWxsbyc7XG5cbmV4cG9ydCB0eXBlIEdhbWUgPSB7XG4gIGxhc3Q6IG51bWJlcjsgLy8g5pyA5b6M44Gr55uk6Z2i44Gu5pu05paw44KS44GX44Gf5pmC5Yi7IChtcylcbiAgaW50ZXJ2YWw6IG51bWJlcjsgLy8gKGludGVydmFsKW1zIOavjuOBq+ebpOmdouOBruabtOaWsOOCkuihjOOBhlxuICBib2FyZDogQm9hcmQ7XG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHVzZXJfaW5wdXQ6IFtudW1iZXIsIG51bWJlcl0gfCBudWxsO1xuICBtZXNzYWdlX2hvbGRlcjogSFRNTFNwYW5FbGVtZW50O1xuICBzdGFydF9idXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICBzZWxlY3RfYmxhY2s6IEhUTUxCdXR0b25FbGVtZW50O1xuICBzZWxlY3Rfd2hpdGU6IEhUTUxCdXR0b25FbGVtZW50O1xuICBzZWxlY3RfQUliYXR0bGU6IEhUTUxCdXR0b25FbGVtZW50O1xuICBjYW5jZWxfYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgZmlyc3RfQUlzZWxlY3RfYm94OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgZmlyc3RfQUlzZWxlY3RfZm9ybTogSFRNTEZvcm1FbGVtZW50O1xuICBzZWNvbmRfQUlzZWxlY3RfYm94OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgc2Vjb25kX0FJc2VsZWN0X2Zvcm06IEhUTUxGb3JtRWxlbWVudDtcbiAgZml4X0FJOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgbm93X2dhbWluZzogYm9vbGVhbjtcbiAgYmxhY2tfcGxheWVyOiBBSUFnZW50IHwgJ3VzZXInO1xuICB3aGl0ZV9wbGF5ZXI6IEFJQWdlbnQgfCAndXNlcic7XG4gIGJvYXJkX2hpc3Rvcnk6IEJvYXJkX2hpc3Rvcnk7XG4gIHR1cm5fbnVtYmVyOiBudW1iZXI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJfbW91c2VfaW5wdXRfbGlzdG5lcihnYW1lOiBHYW1lKTogdm9pZCB7XG4gIGdhbWUuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCByZWN0ID0gZ2FtZS5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICBjb25zdCB5ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgY29uc3QgW2ksIGpdID0gaW5wdXRfY29udmVydF9wbGFjZShbeCwgeV0sIGdhbWUuY2FudmFzKTtcbiAgICBnYW1lLnVzZXJfaW5wdXQgPSBbaiwgaV07XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hvaWNlX0FJKGNvbXB1dGVyOiBzdHJpbmcpOiBBSUFnZW50IHtcbiAgaWYgKGNvbXB1dGVyID09PSAnQ1AxJykge1xuICAgIHJldHVybiBuZXdfcmFuZG9tX3BsYXllcigpO1xuICB9XG4gIGlmIChjb21wdXRlciA9PT0gJ0NQMicpIHtcbiAgICByZXR1cm4gYWxwaGFiZXRhX2FnZW50X3N0b25lX2NvdW50KCk7XG4gIH1cbiAgaWYgKGNvbXB1dGVyID09PSAnQ1AzJykge1xuICAgIHJldHVybiBhbHBoYWJldGFfYWdlbnRfZW5lbXlfQ1BQKCk7XG4gIH1cbiAgaWYgKGNvbXB1dGVyID09PSAnQ1A0Jykge1xuICAgIHJldHVybiBhbHBoYWJldGFfYWdlbnRfc2NvcmVfY291bnRfMSgpO1xuICB9XG4gIHJldHVybiBuZXdfcmFuZG9tX3BsYXllcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHV0X3N0YXJ0X2J1dHRvbihcbiAgZ2FtZTogR2FtZSxcbiAgc3RhcnRfYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCxcbiAgY2FuY2VsX2J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQsXG4gIHNlbGVjdF9ibGFjazogSFRNTEJ1dHRvbkVsZW1lbnQsXG4gIHNlbGVjdF93aGl0ZTogSFRNTEJ1dHRvbkVsZW1lbnQsXG4gIHNlbGVjdF9BSWJhdHRsZTogSFRNTEJ1dHRvbkVsZW1lbnQsXG4gIGZpcnN0X0FJc2VsZWN0X2JveDogSFRNTFNlbGVjdEVsZW1lbnQsXG4gIGZpcnN0X0FJc2VsZWN0X2Zvcm06IEhUTUxGb3JtRWxlbWVudCxcbiAgc2Vjb25kX0FJc2VsZWN0X2JveDogSFRNTFNlbGVjdEVsZW1lbnQsXG4gIHNlY29uZF9BSXNlbGVjdF9mb3JtOiBIVE1MRm9ybUVsZW1lbnQsXG4gIGZpeF9BSTogSFRNTEJ1dHRvbkVsZW1lbnRcbik6IHZvaWQge1xuICBzdGFydF9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGdhbWUubm93X2dhbWluZyA9IHRydWU7XG4gICAgZ2FtZS5zdGFydF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF9ibGFjay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X3doaXRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfQUliYXR0bGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLmNhbmNlbF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgIGdhbWUuYm9hcmQgPSBnZW5lcmF0ZV9pbml0aWFsX2JvYXJkKCk7XG4gICAgZHJhd19ib2FyZChnYW1lLmJvYXJkLCBnYW1lLmNhbnZhcyk7XG4gICAgZ2FtZS5ibGFja19wbGF5ZXIgPSAndXNlcic7XG4gICAgZ2FtZS53aGl0ZV9wbGF5ZXIgPSAndXNlcic7XG4gICAgZ2FtZS5tZXNzYWdlX2hvbGRlci5pbm5lclRleHQgPVxuICAgICAgJ+OBiuS6kuOBhOmgkeW8teOBo+OBpuOBj+OBoOOBleOBhOOAgicgKyAnXFxuJyArICfpu5Ljga7miYvnlarjgafjgZnjgIInO1xuICB9KTtcbiAgc2VsZWN0X2JsYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBnYW1lLnN0YXJ0X2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X2JsYWNrLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3Rfd2hpdGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF9BSWJhdHRsZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuY2FuY2VsX2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuZml4X0FJLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICBnYW1lLnNlY29uZF9BSXNlbGVjdF9mb3JtLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICBmaXhfQUkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgZ2FtZS5ub3dfZ2FtaW5nID0gdHJ1ZTtcbiAgICAgIGdhbWUuY2FuY2VsX2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICBnYW1lLnNlY29uZF9BSXNlbGVjdF9mb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBnYW1lLmZpeF9BSS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgZ2FtZS5ib2FyZCA9IGdlbmVyYXRlX2luaXRpYWxfYm9hcmQoKTtcbiAgICAgIGRyYXdfYm9hcmQoZ2FtZS5ib2FyZCwgZ2FtZS5jYW52YXMpO1xuICAgICAgZ2FtZS5ibGFja19wbGF5ZXIgPSAndXNlcic7XG4gICAgICBnYW1lLndoaXRlX3BsYXllciA9IGNob2ljZV9BSShzZWNvbmRfQUlzZWxlY3RfYm94LnZhbHVlKTtcbiAgICAgIGdhbWUubWVzc2FnZV9ob2xkZXIuaW5uZXJUZXh0ID1cbiAgICAgICAgJ+OBleOBguOCsuODvOODoOOCkuWni+OCgeOBvuOBl+OCh+OBhuOAgicgKyAnXFxuJyArICfjgYLjgarjgZ8o6buSKeOBruaJi+eVquOBp+OBmeOAgic7XG4gICAgfSk7XG4gIH0pO1xuICBzZWxlY3Rfd2hpdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGdhbWUuc3RhcnRfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfYmxhY2suc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF93aGl0ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X0FJYmF0dGxlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5jYW5jZWxfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5maXhfQUkuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgIGdhbWUuZmlyc3RfQUlzZWxlY3RfZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgZml4X0FJLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGdhbWUubm93X2dhbWluZyA9IHRydWU7XG4gICAgICBnYW1lLmNhbmNlbF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgICAgZ2FtZS5maXJzdF9BSXNlbGVjdF9mb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBnYW1lLmZpeF9BSS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgZ2FtZS5ib2FyZCA9IGdlbmVyYXRlX2luaXRpYWxfYm9hcmQoKTtcbiAgICAgIGRyYXdfYm9hcmQoZ2FtZS5ib2FyZCwgZ2FtZS5jYW52YXMpO1xuICAgICAgZ2FtZS5ibGFja19wbGF5ZXIgPSBjaG9pY2VfQUkoZmlyc3RfQUlzZWxlY3RfYm94LnZhbHVlKTtcbiAgICAgIGdhbWUud2hpdGVfcGxheWVyID0gJ3VzZXInO1xuICAgICAgZ2FtZS5tZXNzYWdlX2hvbGRlci5pbm5lclRleHQgPSAn6buS44Gu5omL55Wq44Gn44GZ44CCJztcbiAgICB9KTtcbiAgfSk7XG4gIHNlbGVjdF9BSWJhdHRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgZ2FtZS5zdGFydF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF9ibGFjay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X3doaXRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfQUliYXR0bGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLmNhbmNlbF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLmZpeF9BSS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgZ2FtZS5maXJzdF9BSXNlbGVjdF9mb3JtLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICBnYW1lLnNlY29uZF9BSXNlbGVjdF9mb3JtLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICBmaXhfQUkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgZ2FtZS5ub3dfZ2FtaW5nID0gdHJ1ZTtcbiAgICAgIGdhbWUuY2FuY2VsX2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICBnYW1lLmZpcnN0X0FJc2VsZWN0X2Zvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGdhbWUuc2Vjb25kX0FJc2VsZWN0X2Zvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGdhbWUuZml4X0FJLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBnYW1lLmJvYXJkID0gZ2VuZXJhdGVfaW5pdGlhbF9ib2FyZCgpO1xuICAgICAgZHJhd19ib2FyZChnYW1lLmJvYXJkLCBnYW1lLmNhbnZhcyk7XG4gICAgICBnYW1lLmJsYWNrX3BsYXllciA9IGNob2ljZV9BSShmaXJzdF9BSXNlbGVjdF9ib3gudmFsdWUpO1xuICAgICAgZ2FtZS53aGl0ZV9wbGF5ZXIgPSBjaG9pY2VfQUkoc2Vjb25kX0FJc2VsZWN0X2JveC52YWx1ZSk7XG4gICAgICBnYW1lLm1lc3NhZ2VfaG9sZGVyLmlubmVyVGV4dCA9ICfpu5Ljga7miYvnlarjgafjgZnjgIInO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1dF9jYW5jZWxfYnV0dG9uKFxuICBnYW1lOiBHYW1lLFxuICBjYW5jZWxfYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudFxuKTogdm9pZCB7XG4gIGNhbmNlbF9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGdhbWUudHVybl9udW1iZXIgPSBiYWNrX3RvX215X3R1cm4oZ2FtZS5ib2FyZF9oaXN0b3J5LCBnYW1lLnR1cm5fbnVtYmVyKTtcbiAgICBjb25zdCBib2FyZCA9IGdhbWUuYm9hcmRfaGlzdG9yeVtnYW1lLnR1cm5fbnVtYmVyXSFbMF07XG4gICAgZ2FtZS5ib2FyZCA9IGJvYXJkO1xuICAgIGdhbWUubm93X2dhbWluZyA9IHRydWU7XG4gICAgZ2FtZS5zdGFydF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLnNlbGVjdF9ibGFjay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGdhbWUuc2VsZWN0X3doaXRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZ2FtZS5zZWxlY3RfQUliYXR0bGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBnYW1lLm1lc3NhZ2VfaG9sZGVyLmlubmVyVGV4dCA9IGNyZWF0ZV9tZXNzYWdlKGdhbWUsIEdhbWVzdGF0dXMuT2spO1xuICAgIGRyYXdfYm9hcmQoZ2FtZS5ib2FyZCwgZ2FtZS5jYW52YXMpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9nYW1lKFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICBtZXNzYWdlX2hvbGRlcjogSFRNTFNwYW5FbGVtZW50LFxuICBzdGFydF9idXR0b246IEhUTUxCdXR0b25FbGVtZW50LFxuICBjYW5jZWxfYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCxcbiAgc2VsZWN0X2JsYWNrOiBIVE1MQnV0dG9uRWxlbWVudCxcbiAgc2VsZWN0X3doaXRlOiBIVE1MQnV0dG9uRWxlbWVudCxcbiAgc2VsZWN0X0FJYmF0dGxlOiBIVE1MQnV0dG9uRWxlbWVudCxcbiAgZmlyc3RfQUlzZWxlY3RfYm94OiBIVE1MU2VsZWN0RWxlbWVudCxcbiAgZmlyc3RfQUlzZWxlY3RfZm9ybTogSFRNTEZvcm1FbGVtZW50LFxuICBzZWNvbmRfQUlzZWxlY3RfYm94OiBIVE1MU2VsZWN0RWxlbWVudCxcbiAgc2Vjb25kX0FJc2VsZWN0X2Zvcm06IEhUTUxGb3JtRWxlbWVudCxcbiAgZml4X0FJOiBIVE1MQnV0dG9uRWxlbWVudFxuKTogR2FtZSB7XG4gIGNvbnN0IGdhbWU6IEdhbWUgPSB7XG4gICAgbGFzdDogcGVyZm9ybWFuY2Uubm93KCksXG4gICAgaW50ZXJ2YWw6IDEwMDAgLyA2MCwgLy8gbXNcbiAgICBib2FyZDogZ2VuZXJhdGVfaW5pdGlhbF9ib2FyZCgpLFxuICAgIGNhbnZhczogY2FudmFzLFxuICAgIHVzZXJfaW5wdXQ6IG51bGwsXG4gICAgbWVzc2FnZV9ob2xkZXI6IG1lc3NhZ2VfaG9sZGVyLFxuICAgIHN0YXJ0X2J1dHRvbjogc3RhcnRfYnV0dG9uLFxuICAgIGNhbmNlbF9idXR0b246IGNhbmNlbF9idXR0b24sXG4gICAgc2VsZWN0X2JsYWNrOiBzZWxlY3RfYmxhY2ssXG4gICAgc2VsZWN0X3doaXRlOiBzZWxlY3Rfd2hpdGUsXG4gICAgc2VsZWN0X0FJYmF0dGxlOiBzZWxlY3RfQUliYXR0bGUsXG4gICAgZmlyc3RfQUlzZWxlY3RfYm94OiBmaXJzdF9BSXNlbGVjdF9ib3gsXG4gICAgZmlyc3RfQUlzZWxlY3RfZm9ybTogZmlyc3RfQUlzZWxlY3RfZm9ybSxcbiAgICBzZWNvbmRfQUlzZWxlY3RfYm94OiBzZWNvbmRfQUlzZWxlY3RfYm94LFxuICAgIHNlY29uZF9BSXNlbGVjdF9mb3JtOiBzZWNvbmRfQUlzZWxlY3RfZm9ybSxcbiAgICBmaXhfQUk6IGZpeF9BSSxcbiAgICBub3dfZ2FtaW5nOiBmYWxzZSxcbiAgICBibGFja19wbGF5ZXI6ICd1c2VyJyxcbiAgICB3aGl0ZV9wbGF5ZXI6ICd1c2VyJyxcbiAgICBib2FyZF9oaXN0b3J5OiBbW2dlbmVyYXRlX2luaXRpYWxfYm9hcmQoKSwgR2FtZXN0YXR1cy5Pa11dLFxuICAgIHR1cm5fbnVtYmVyOiAwLFxuICB9O1xuICBtZXNzYWdlX2hvbGRlci5pbm5lclRleHQgPSAn5a++5oim55u45omL44CB5YWI5pS75b6M5pS744KS6YG444KT44Gn44GP44Gg44GV44GE44CCJztcbiAgZ2FtZS5zdGFydF9idXR0b24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICBnYW1lLnNlbGVjdF9ibGFjay5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gIGdhbWUuc2VsZWN0X3doaXRlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgZ2FtZS5zZWxlY3RfQUliYXR0bGUuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICByZWdpc3Rlcl9tb3VzZV9pbnB1dF9saXN0bmVyKGdhbWUpO1xuICBwdXRfc3RhcnRfYnV0dG9uKFxuICAgIGdhbWUsXG4gICAgZ2FtZS5zdGFydF9idXR0b24sXG4gICAgZ2FtZS5jYW5jZWxfYnV0dG9uLFxuICAgIGdhbWUuc2VsZWN0X2JsYWNrLFxuICAgIGdhbWUuc2VsZWN0X3doaXRlLFxuICAgIGdhbWUuc2VsZWN0X0FJYmF0dGxlLFxuICAgIGdhbWUuZmlyc3RfQUlzZWxlY3RfYm94LFxuICAgIGdhbWUuZmlyc3RfQUlzZWxlY3RfZm9ybSxcbiAgICBnYW1lLnNlY29uZF9BSXNlbGVjdF9ib3gsXG4gICAgZ2FtZS5zZWNvbmRfQUlzZWxlY3RfZm9ybSxcbiAgICBnYW1lLmZpeF9BSVxuICApO1xuICByZXR1cm4gZ2FtZTtcbn1cblxuZnVuY3Rpb24gd2FpdChzZWM6IG51bWJlcikge1xuICBsZXQgc3RhcnRfdGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICB3aGlsZSAocGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydF90aW1lIDwgc2VjKSB7fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVfc3RhdGUoZ2FtZTogR2FtZSk6IGJvb2xlYW4ge1xuICBpZiAoZ2FtZS5ib2FyZC5ibGFja190dXJuKSB7XG4gICAgaWYgKGdhbWUuYmxhY2tfcGxheWVyID09PSAndXNlcicpIHtcbiAgICAgIHJldHVybiBpbnB1dF9zdGF0ZShnYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FtZS51c2VyX2lucHV0ID0gZ2FtZS5ibGFja19wbGF5ZXIubmV4dF9tb3ZlKGdhbWUuYm9hcmQpO1xuICAgICAgcmV0dXJuIGlucHV0X3N0YXRlKGdhbWUpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghZ2FtZS5ib2FyZC5ibGFja190dXJuKSB7XG4gICAgaWYgKGdhbWUud2hpdGVfcGxheWVyID09PSAndXNlcicpIHtcbiAgICAgIHJldHVybiBpbnB1dF9zdGF0ZShnYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FtZS51c2VyX2lucHV0ID0gZ2FtZS53aGl0ZV9wbGF5ZXIubmV4dF9tb3ZlKGdhbWUuYm9hcmQpO1xuICAgICAgcmV0dXJuIGlucHV0X3N0YXRlKGdhbWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlucHV0X3N0YXRlKGdhbWU6IEdhbWUpOiBib29sZWFuIHtcbiAgaWYgKCFnYW1lLm5vd19nYW1pbmcgJiYgZ2FtZS51c2VyX2lucHV0ICE9PSBudWxsKSB7XG4gICAgZ2FtZS51c2VyX2lucHV0ID0gbnVsbDtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGdhbWUubm93X2dhbWluZyAmJiBnYW1lLnVzZXJfaW5wdXQgIT09IG51bGwpIHtcbiAgICBnYW1lLnR1cm5fbnVtYmVyID0gdXBkYXRlX2hpc3RvcnkoXG4gICAgICBnYW1lLmJvYXJkX2hpc3RvcnksXG4gICAgICBnYW1lLnR1cm5fbnVtYmVyLFxuICAgICAgZ2FtZS51c2VyX2lucHV0XG4gICAgKTtcbiAgICBjb25zdCBbYm9hcmQsIHN0YXR1c10gPSBuZXh0X3N0YXRlKGdhbWUuYm9hcmQsIGdhbWUudXNlcl9pbnB1dCk7XG4gICAgZ2FtZS51c2VyX2lucHV0ID0gbnVsbDtcbiAgICBnYW1lLmJvYXJkID0gYm9hcmQ7XG4gICAgaWYgKHN0YXR1cyA9PT0gR2FtZXN0YXR1cy5FcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc3RhdHVzID09PSBHYW1lc3RhdHVzLkVuZCkge1xuICAgICAgZ2FtZS5tZXNzYWdlX2hvbGRlci5pbm5lclRleHQgPSBjcmVhdGVfbWVzc2FnZShnYW1lLCBzdGF0dXMpO1xuICAgICAgZ2FtZS5ub3dfZ2FtaW5nID0gZmFsc2U7XG4gICAgICBnYW1lLnN0YXJ0X2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICBnYW1lLnNlbGVjdF9ibGFjay5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICBnYW1lLnNlbGVjdF93aGl0ZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICBnYW1lLnNlbGVjdF9BSWJhdHRsZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FtZS5tZXNzYWdlX2hvbGRlci5pbm5lclRleHQgPSBjcmVhdGVfbWVzc2FnZShnYW1lLCBzdGF0dXMpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlX2dhbWUoZ2FtZTogR2FtZSk6IHZvaWQge1xuICBpZiAodXBkYXRlX3N0YXRlKGdhbWUpKSB7XG4gICAgZHJhd19ib2FyZChnYW1lLmJvYXJkLCBnYW1lLmNhbnZhcyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0X2xvb3AoZ2FtZTogR2FtZSwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQge1xuICBjb25zdCBydW4gPSAobm93OiBudW1iZXIpID0+IHtcbiAgICBsZXQgZGVsdGEgPSBub3cgLSBnYW1lLmxhc3Q7XG4gICAgd2hpbGUgKGRlbHRhID49IGdhbWUuaW50ZXJ2YWwpIHtcbiAgICAgIGRlbHRhIC09IGdhbWUuaW50ZXJ2YWw7XG4gICAgICBnYW1lLmxhc3QgPSBub3cgLSBkZWx0YTtcbiAgICAgIHVwZGF0ZV9nYW1lKGdhbWUpO1xuICAgIH1cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocnVuKTtcbiAgfTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJ1bik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVfbWVzc2FnZShnYW1lOiBHYW1lLCBzdGF0dXM6IEdhbWVzdGF0dXMpOiBzdHJpbmcge1xuICBjb25zdCBib2FyZCA9IGdhbWUuYm9hcmQ7XG4gIGNvbnN0IGJfc2NvcmUgPSAn6buS77yaICcgKyBjYWxjX3Njb3JlKGJvYXJkKVswXTtcbiAgY29uc3Qgd19zY29yZSA9ICfnmb3vvJogJyArIGNhbGNfc2NvcmUoYm9hcmQpWzFdO1xuICBjb25zdCBzY29yZSA9IGJfc2NvcmUgKyAnXFxuJyArIHdfc2NvcmUgKyAnXFxuJztcbiAgaWYgKHN0YXR1cyA9PT0gR2FtZXN0YXR1cy5Paykge1xuICAgIGlmIChib2FyZC5ibGFja190dXJuKSB7XG4gICAgICByZXR1cm4gc2NvcmUgKyAn6buS44Gu5omL55Wq44Gn44GZJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNjb3JlICsgJ+eZveOBruaJi+eVquOBp+OBmSc7XG4gICAgfVxuICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gR2FtZXN0YXR1cy5FcnJvcikge1xuICAgIGlmIChib2FyZC5ibGFja190dXJuKSB7XG4gICAgICByZXR1cm4gc2NvcmUgKyAn44Gd44GT44Gr44Gv572u44GP44GT44Go44GM44Gn44GN44G+44Gb44KT44CC6buS44Gu5omL55Wq44Gn44GZ44CCJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNjb3JlICsgJ+OBneOBk+OBq+OBr+e9ruOBj+OBk+OBqOOBjOOBp+OBjeOBvuOBm+OCk+OAgueZveOBruaJi+eVquOBp+OBmeOAgic7XG4gICAgfVxuICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gR2FtZXN0YXR1cy5QYXNzKSB7XG4gICAgaWYgKGJvYXJkLmJsYWNrX3R1cm4pIHtcbiAgICAgIHJldHVybiBzY29yZSArICfnmb3jga/nva7jgY/jgajjgZPjgo3jgYzjgarjgYTjga7jgafjg5HjgrnjgafjgZnjgILlho3luqbpu5Ljga7miYvnlarjgafjgZnjgIInO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2NvcmUgKyAn6buS44Gv572u44GP44Go44GT44KN44GM44Gq44GE44Gu44Gn44OR44K544Gn44GZ44CC5YaN5bqm55m944Gu5omL55Wq44Gn44GZ44CCJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoc3RhdHVzID09PSBHYW1lc3RhdHVzLkVuZCkge1xuICAgIGlmIChjYWxjX3Njb3JlKGJvYXJkKVswXSA+IGNhbGNfc2NvcmUoYm9hcmQpWzFdKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBzY29yZSArXG4gICAgICAgICfjgrLjg7zjg6DntYLkuobjgafjgZnjgIInICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAn6buS44Gu5Yud44Gh44Gn44GZ44CCJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ+WGjeW6puOCsuODvOODoOOCkumWi+Wni+OBmeOCi+OBq+OBr+ODnOOCv+ODs+OCkuaKvOOBl+OBpuOBj+OBoOOBleOBhOOAgidcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChjYWxjX3Njb3JlKGJvYXJkKVswXSA8IGNhbGNfc2NvcmUoYm9hcmQpWzFdKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBzY29yZSArXG4gICAgICAgICfjgrLjg7zjg6DntYLkuobjgafjgZnjgIInICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAn55m944Gu5Yud44Gh44Gn44GZ44CCJyArXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ+WGjeW6puOCsuODvOODoOOCkumWi+Wni+OBmeOCi+OBq+OBr+ODnOOCv+ODs+OCkuaKvOOBl+OBpuOBj+OBoOOBleOBhOOAgidcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICgoY2FsY19zY29yZShib2FyZClbMF0gPSBjYWxjX3Njb3JlKGJvYXJkKVsxXSkpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHNjb3JlICtcbiAgICAgICAgJ+OCsuODvOODoOe1guS6huOBp+OBmeOAgicgK1xuICAgICAgICAnXFxuJyArXG4gICAgICAgICflvJXjgY3liIbjgZHjgafjgZnjgIInICtcbiAgICAgICAgJ1xcbicgK1xuICAgICAgICAn5YaN5bqm44Ky44O844Og44KS6ZaL5aeL44GZ44KL44Gr44Gv44Oc44K/44Oz44KS5oq844GX44Gm44GP44Gg44GV44GE44CCJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICfjg5DjgrAnO1xufVxuZnVuY3Rpb24gd2Vha19hZ2VudF9tb3ZlKCk6IEFJQWdlbnQgfCAndXNlcicge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0Z1bmN0aW9uIG5vdCBpbXBsZW1lbnRlZC4nKTtcbn1cbiIsImV4cG9ydCB0eXBlIFJvdyA9IFtcbiAgYm9vbGVhbixcbiAgYm9vbGVhbixcbiAgYm9vbGVhbixcbiAgYm9vbGVhbixcbiAgYm9vbGVhbixcbiAgYm9vbGVhbixcbiAgYm9vbGVhbixcbiAgYm9vbGVhblxuXTtcblxuZXhwb3J0IHR5cGUgQm9hcmRBcnJheSA9IFtSb3csIFJvdywgUm93LCBSb3csIFJvdywgUm93LCBSb3csIFJvd107XG5cbmV4cG9ydCB0eXBlIEJvYXJkID0ge1xuICBibGFjazogQm9hcmRBcnJheTtcbiAgd2hpdGU6IEJvYXJkQXJyYXk7XG4gIGJsYWNrX3R1cm46IGJvb2xlYW47XG59O1xuXG4vL2V4cG9ydCB0eXBlIEJvYXJkX2hpc3RvcnkgPSBuZXcgQXJyYXkoNjQpLmZpbGwoQm9hcmQpXG5cbmV4cG9ydCB0eXBlIEJvYXJkX2hpc3RvcnkgPSBbQm9hcmQsIEdhbWVzdGF0dXNdW107XG5cbi8v55uk6Z2i5Yid5pyf5YyWXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVfaW5pdGlhbF9ib2FyZCgpOiBCb2FyZCB7XG4gIGNvbnN0IGJsYWNrID0gbmV3IEFycmF5KDgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGJsYWNrW2ldID0gbmV3IEFycmF5KDgpLmZpbGwoZmFsc2UpO1xuICB9XG4gIGJsYWNrWzRdWzNdID0gdHJ1ZTtcbiAgYmxhY2tbM11bNF0gPSB0cnVlO1xuXG4gIGNvbnN0IHdoaXRlID0gbmV3IEFycmF5KDgpO1xuICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgIHdoaXRlW2pdID0gbmV3IEFycmF5KDgpLmZpbGwoZmFsc2UpO1xuICB9XG4gIHdoaXRlWzNdWzNdID0gdHJ1ZTtcbiAgd2hpdGVbNF1bNF0gPSB0cnVlO1xuXG4gIGNvbnN0IGJsYWNrX3R1cm4gPSB0cnVlO1xuXG4gIGNvbnN0IGJvYXJkID0ge1xuICAgIGJsYWNrOiBibGFjayBhcyBCb2FyZEFycmF5LFxuICAgIHdoaXRlOiB3aGl0ZSBhcyBCb2FyZEFycmF5LFxuICAgIGJsYWNrX3R1cm46IGJsYWNrX3R1cm4sXG4gIH07XG5cbiAgcmV0dXJuIGJvYXJkO1xufVxuXG4vLyBb6buS44Gu55+z5pWwLCDnmb3jga7nn7PmlbBd44KS6L+U44GZXG5leHBvcnQgZnVuY3Rpb24gY2FsY19zY29yZShib2FyZDogQm9hcmQpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgbGV0IGJfc2NvcmUgPSAwO1xuICBsZXQgd19zY29yZSA9IDA7XG5cbiAgYm9hcmQuYmxhY2suZm9yRWFjaCgociwgaSkgPT4ge1xuICAgIHIuZm9yRWFjaCgoYiwgaikgPT4ge1xuICAgICAgaWYgKGIpIHtcbiAgICAgICAgYl9zY29yZSsrO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgYm9hcmQud2hpdGUuZm9yRWFjaCgociwgaSkgPT4ge1xuICAgIHIuZm9yRWFjaCgoYiwgaikgPT4ge1xuICAgICAgaWYgKGIpIHtcbiAgICAgICAgd19zY29yZSsrO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIFtiX3Njb3JlLCB3X3Njb3JlXTtcbn1cblxuLy9b6KGM55Wq5Y+3LCDliJfnlarlj7dd44CB6aCG55Wq44KS5Y+X44GR5Y+W44Gj44Gm44Gd44Gu5aC05omA44Gr55+z44KS572u44GPXG5leHBvcnQgZnVuY3Rpb24gcHV0X3N0b25lKFxuICBwb2ludDogW251bWJlciwgbnVtYmVyXSxcbiAgYmxhY2tfdHVybjogYm9vbGVhbixcbiAgYm9hcmQ6IEJvYXJkXG4pIHtcbiAgY29uc3Qgcm93X251bWJlciA9IHBvaW50WzBdO1xuICBjb25zdCBjb2x1bW5fbnVtYmVyID0gcG9pbnRbMV07XG5cbiAgaWYgKFxuICAgIHJvd19udW1iZXIgPj0gMCAmJlxuICAgIHJvd19udW1iZXIgPD0gNyAmJlxuICAgIGNvbHVtbl9udW1iZXIgPj0gMCAmJlxuICAgIGNvbHVtbl9udW1iZXIgPD0gN1xuICApIHtcbiAgICBpZiAoXG4gICAgICAhYm9hcmQuYmxhY2tbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdICYmXG4gICAgICAhYm9hcmQud2hpdGVbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdXG4gICAgKSB7XG4gICAgICBpZiAoYmxhY2tfdHVybikge1xuICAgICAgICBib2FyZC5ibGFja1tyb3dfbnVtYmVyXSFbY29sdW1uX251bWJlcl0gPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYm9hcmQud2hpdGVbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vL1vooYznlarlj7csIOWIl+eVquWPt13jgpLlj5fjgZHlj5bjgaPjgabnn7PjgpLjgbLjgaPjgY/jgorov5TjgZlcbmV4cG9ydCBmdW5jdGlvbiBmbGlwX3N0b25lKHBvaW50OiBbbnVtYmVyLCBudW1iZXJdLCBib2FyZDogQm9hcmQpOiBib29sZWFuIHtcbiAgY29uc3Qgcm93X251bWJlciA9IHBvaW50WzBdO1xuICBjb25zdCBjb2x1bW5fbnVtYmVyID0gcG9pbnRbMV07XG5cbiAgaWYgKFxuICAgIHJvd19udW1iZXIgPj0gMCAmJlxuICAgIHJvd19udW1iZXIgPD0gNyAmJlxuICAgIGNvbHVtbl9udW1iZXIgPj0gMCAmJlxuICAgIGNvbHVtbl9udW1iZXIgPD0gN1xuICApIHtcbiAgICBpZiAoXG4gICAgICBib2FyZC5ibGFja1tyb3dfbnVtYmVyXSFbY29sdW1uX251bWJlcl0gfHxcbiAgICAgIGJvYXJkLndoaXRlW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXVxuICAgICkge1xuICAgICAgYm9hcmQuYmxhY2tbcm93X251bWJlcl0hW2NvbHVtbl9udW1iZXJdID1cbiAgICAgICAgIWJvYXJkLmJsYWNrW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXTtcbiAgICAgIGJvYXJkLndoaXRlW3Jvd19udW1iZXJdIVtjb2x1bW5fbnVtYmVyXSA9XG4gICAgICAgICFib2FyZC53aGl0ZVtyb3dfbnVtYmVyXSFbY29sdW1uX251bWJlcl07XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy/miYvnlarjgpLpgLLjgoHjgotcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlX3R1cm4oYm9hcmQ6IEJvYXJkKTogQm9hcmQge1xuICBib2FyZC5ibGFja190dXJuID0gIWJvYXJkLmJsYWNrX3R1cm47XG4gIHJldHVybiBib2FyZDtcbn1cblxuLy9cIuiLseiqnuWwj+aWh+WtlyvmlbDlrZdcIuaDheWgseOCkuWPl+OBkeWPluOBo+OBpltudW1iZXIsIG51bWJlcl3jgavjgZnjgotcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZV9jb29yZChjb29yZF9zdHI6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlcl0ge1xuICBpZiAoY29vcmRfc3RyLmxlbmd0aCAhPT0gMikge1xuICAgIHJldHVybiBbLTEsIC0xXTtcbiAgfVxuXG4gIGNvbnN0IHJvd19zdHIgPSBjb29yZF9zdHIuc3BsaXQoJycpWzFdO1xuICBjb25zdCBjb2x1bW5fc3RyID0gY29vcmRfc3RyLnNwbGl0KCcnKVswXTtcbiAgbGV0IFtyb3dfbnVtYmVyLCBjb2x1bW5fbnVtYmVyXSA9IFstMSwgLTFdO1xuXG4gIGlmIChyb3dfc3RyID09PSAnMScpIHtcbiAgICByb3dfbnVtYmVyID0gMDtcbiAgfVxuICBpZiAocm93X3N0ciA9PT0gJzInKSB7XG4gICAgcm93X251bWJlciA9IDE7XG4gIH1cbiAgaWYgKHJvd19zdHIgPT09ICczJykge1xuICAgIHJvd19udW1iZXIgPSAyO1xuICB9XG4gIGlmIChyb3dfc3RyID09PSAnNCcpIHtcbiAgICByb3dfbnVtYmVyID0gMztcbiAgfVxuICBpZiAocm93X3N0ciA9PT0gJzUnKSB7XG4gICAgcm93X251bWJlciA9IDQ7XG4gIH1cbiAgaWYgKHJvd19zdHIgPT09ICc2Jykge1xuICAgIHJvd19udW1iZXIgPSA1O1xuICB9XG4gIGlmIChyb3dfc3RyID09PSAnNycpIHtcbiAgICByb3dfbnVtYmVyID0gNjtcbiAgfVxuICBpZiAocm93X3N0ciA9PT0gJzgnKSB7XG4gICAgcm93X251bWJlciA9IDc7XG4gIH1cblxuICBpZiAoY29sdW1uX3N0ciA9PT0gJ2EnKSB7XG4gICAgY29sdW1uX251bWJlciA9IDA7XG4gIH1cbiAgaWYgKGNvbHVtbl9zdHIgPT09ICdiJykge1xuICAgIGNvbHVtbl9udW1iZXIgPSAxO1xuICB9XG4gIGlmIChjb2x1bW5fc3RyID09PSAnYycpIHtcbiAgICBjb2x1bW5fbnVtYmVyID0gMjtcbiAgfVxuICBpZiAoY29sdW1uX3N0ciA9PT0gJ2QnKSB7XG4gICAgY29sdW1uX251bWJlciA9IDM7XG4gIH1cbiAgaWYgKGNvbHVtbl9zdHIgPT09ICdlJykge1xuICAgIGNvbHVtbl9udW1iZXIgPSA0O1xuICB9XG4gIGlmIChjb2x1bW5fc3RyID09PSAnZicpIHtcbiAgICBjb2x1bW5fbnVtYmVyID0gNTtcbiAgfVxuICBpZiAoY29sdW1uX3N0ciA9PT0gJ2cnKSB7XG4gICAgY29sdW1uX251bWJlciA9IDY7XG4gIH1cbiAgaWYgKGNvbHVtbl9zdHIgPT09ICdoJykge1xuICAgIGNvbHVtbl9udW1iZXIgPSA3O1xuICB9XG5cbiAgaWYgKHJvd19udW1iZXIgIT0gLTEgJiYgY29sdW1uX251bWJlciAhPSAtMSkge1xuICAgIHJldHVybiBbcm93X251bWJlciwgY29sdW1uX251bWJlcl07XG4gIH1cblxuICByZXR1cm4gWy0xLCAtMV07XG59XG5cbi8vW251bWJlciwgbnVtYmVyXeWIhuOBoOOBkVtudW1iZXIsIG51bWJlcl3jgYvjgonnp7vli5XjgZnjgotcbmV4cG9ydCBmdW5jdGlvbiBhZGRfdmVjKFxuICBwOiByZWFkb25seSBbbnVtYmVyLCBudW1iZXJdLFxuICBxOiByZWFkb25seSBbbnVtYmVyLCBudW1iZXJdXG4pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgY29uc3QgbmV3X3A6IFtudW1iZXIsIG51bWJlcl0gPSBbMCwgMF07XG4gIG5ld19wWzBdID0gcFswXSArIHFbMF07XG4gIG5ld19wWzFdID0gcFsxXSArIHFbMV07XG4gIHJldHVybiBuZXdfcDtcbn1cblxuZXhwb3J0IGNvbnN0IERJUkVDVElPTlMgPSB7XG4gIHVwOiBbLTEsIDBdLFxuICBkb3duOiBbMSwgMF0sXG4gIGxlZnQ6IFswLCAtMV0sXG4gIHJpZ2h0OiBbMCwgMV0sXG4gIHVsOiBbLTEsIC0xXSxcbiAgdXI6IFstMSwgMV0sXG4gIGRsOiBbMSwgLTFdLFxuICBkcjogWzEsIDFdLFxufSBhcyBjb25zdDtcblxuLy/kuIDlrprmlrnlkJHjgavjgbLjgaPjgY/jgorov5TjgZvjgovnn7PjgYzjgYLjgovjgYvliKTmlq3jgZnjgotcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZV9mbGlwXzFkKFxuICBwOiByZWFkb25seSBbbnVtYmVyLCBudW1iZXJdLFxuICBxOiByZWFkb25seSBbbnVtYmVyLCBudW1iZXJdLFxuICBib2FyZDogQm9hcmRcbik6IFtudW1iZXIsIG51bWJlcl1bXSB7XG4gIGxldCBmbGlwYWJsZV9zdG9uZXMgPSBbXTtcbiAgbGV0IG5ld19wOiBbbnVtYmVyLCBudW1iZXJdID0gYWRkX3ZlYyhwLCBxKTtcbiAgaWYgKGJvYXJkLmJsYWNrX3R1cm4pIHtcbiAgICBsZXQgd19yb3cgPSBib2FyZC53aGl0ZVtuZXdfcFswXV07XG4gICAgaWYgKHdfcm93ID09IHVuZGVmaW5lZCB8fCAhd19yb3dbbmV3X3BbMV1dKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHdoaWxlICh3X3JvdyAhPSB1bmRlZmluZWQgJiYgd19yb3dbbmV3X3BbMV1dKSB7XG4gICAgICBmbGlwYWJsZV9zdG9uZXMucHVzaChuZXdfcCk7XG4gICAgICBuZXdfcCA9IGFkZF92ZWMobmV3X3AsIHEpO1xuICAgICAgd19yb3cgPSBib2FyZC53aGl0ZVtuZXdfcFswXV07XG4gICAgfVxuICAgIGxldCBiX3JvdyA9IGJvYXJkLmJsYWNrW25ld19wWzBdXTtcbiAgICBpZiAoYl9yb3cgIT0gdW5kZWZpbmVkICYmIGJfcm93W25ld19wWzFdXSkge1xuICAgICAgcmV0dXJuIGZsaXBhYmxlX3N0b25lcztcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9IGVsc2Uge1xuICAgIGxldCBiX3JvdyA9IGJvYXJkLmJsYWNrW25ld19wWzBdXTtcbiAgICBpZiAoYl9yb3cgPT0gdW5kZWZpbmVkIHx8ICFiX3Jvd1tuZXdfcFsxXV0pIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgd2hpbGUgKGJfcm93ICE9IHVuZGVmaW5lZCAmJiBiX3Jvd1tuZXdfcFsxXV0pIHtcbiAgICAgIGZsaXBhYmxlX3N0b25lcy5wdXNoKG5ld19wKTtcbiAgICAgIG5ld19wID0gYWRkX3ZlYyhuZXdfcCwgcSk7XG4gICAgICBiX3JvdyA9IGJvYXJkLmJsYWNrW25ld19wWzBdXTtcbiAgICB9XG4gICAgbGV0IHdfcm93ID0gYm9hcmQud2hpdGVbbmV3X3BbMF1dO1xuICAgIGlmICh3X3JvdyAhPSB1bmRlZmluZWQgJiYgd19yb3dbbmV3X3BbMV1dKSB7XG4gICAgICByZXR1cm4gZmxpcGFibGVfc3RvbmVzO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuLy9bbnVtYmVyLCBudW1iZXJd44KS5Y+X44GR5Y+W44Gj44Gm5ZCI5rOV44GL44KS5Yik5pat44GZ44KLXG5leHBvcnQgZnVuY3Rpb24gaXNfdmFsaWRfbW92ZShwOiBbbnVtYmVyLCBudW1iZXJdLCBib2FyZDogQm9hcmQpOiBib29sZWFuIHtcbiAgbGV0IGp1ZGdlX251bWJlciA9IDA7XG5cbiAgY29uc3Qgd19yb3cgPSBib2FyZC53aGl0ZVtwWzBdXTtcbiAgY29uc3QgYl9yb3cgPSBib2FyZC5ibGFja1twWzBdXTtcblxuICBpZiAoYl9yb3cgPT0gdW5kZWZpbmVkIHx8IGJfcm93W3BbMV1dIHx8IHdfcm93ID09IHVuZGVmaW5lZCB8fCB3X3Jvd1twWzFdXSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIERJUkVDVElPTlMpIHtcbiAgICBpZiAoanVkZ2VfZmxpcF8xZChwLCBSZWZsZWN0LmdldChESVJFQ1RJT05TLCBwcm9wZXJ0eSksIGJvYXJkKS5sZW5ndGggPiAwKSB7XG4gICAgICBqdWRnZV9udW1iZXIrKztcbiAgICB9XG4gIH1cbiAgaWYgKGp1ZGdlX251bWJlciA+IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8v5ZCI5rOV5omL44KS5YWo6KGo56S644GZ44KLXG5leHBvcnQgZnVuY3Rpb24gYWxsX3ZhbGlkX21vdmVzKGJvYXJkOiBCb2FyZCk6IFtudW1iZXIsIG51bWJlcl1bXSB7XG4gIGNvbnN0IGNhbl9wdXRfcGxhY2U6IFtudW1iZXIsIG51bWJlcl1bXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICBpZiAoaXNfdmFsaWRfbW92ZShbaSwgal0sIGJvYXJkKSkge1xuICAgICAgICBjYW5fcHV0X3BsYWNlLnB1c2goW2ksIGpdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhbl9wdXRfcGxhY2U7XG59XG5cbi8v44Gd44Gu5pmC44Gu55uk6Z2i44KS6KGo56S6IOKAu+OBn+OBoOOBl+OBiuOBkeOCi+WgtOaJgOOCki3jgafooajnpLpcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlfYm9hcmQoYm9hcmQ6IEJvYXJkKTogc3RyaW5nIHtcbiAgbGV0IGNhbl9wdXRfcGxhY2U6IFtudW1iZXIsIG51bWJlcl1bXSA9IGFsbF92YWxpZF9tb3Zlcyhib2FyZCk7XG4gIGxldCBIeW91amkgPSBgICAgYSBiIGMgZCBlIGYgZyBoXG4gICAtIC0gLSAtIC0gLSAtIC1cbmA7XG4gIGJvYXJkLmJsYWNrLmZvckVhY2goKHIsIGkpID0+IHtcbiAgICBIeW91amkgPSBIeW91amkgKyBTdHJpbmcoaSArIDEpICsgJyB8JztcbiAgICByLmZvckVhY2goKGIsIGopID0+IHtcbiAgICAgIGxldCBjID0gJyAnO1xuICAgICAgaWYgKGJvYXJkLndoaXRlW2ldIVtqXSkge1xuICAgICAgICBjID0gJ28nO1xuICAgICAgfVxuICAgICAgaWYgKGIpIHtcbiAgICAgICAgYyA9ICd4JztcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBjYW5fcHV0X3BsYWNlKSB7XG4gICAgICAgIGlmIChlbGVtZW50WzBdID09PSBpICYmIGVsZW1lbnRbMV0gPT09IGopIHtcbiAgICAgICAgICBjID0gJy0nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBIeW91amkgPSBIeW91amkgKyBjICsgJ3wnO1xuICAgIH0pO1xuICAgIEh5b3VqaSA9IEh5b3VqaSArICdcXG4nO1xuICB9KTtcbiAgSHlvdWppID0gSHlvdWppICsgJyAgIC0gLSAtIC0gLSAtIC0gLScgKyAnXFxuJztcbiAgcmV0dXJuIEh5b3VqaTtcbn1cblxuLy/jgbLjgaPjgY/jgorov5TjgZvjgovjgajjgZPjgo3jgpLjgZnjgbnjgabjg6rjgrnjg4jljJbjgZnjgotcbmV4cG9ydCBmdW5jdGlvbiBmbGlwYWJsZV9hbGxfcGxhY2VzKFxuICBwOiBbbnVtYmVyLCBudW1iZXJdLFxuICBib2FyZDogQm9hcmRcbik6IFtudW1iZXIsIG51bWJlcl1bXSB7XG4gIGxldCBjYW5fZmxpcF9wbGFjZXM6IFtudW1iZXIsIG51bWJlcl1bXSA9IFtdO1xuICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIERJUkVDVElPTlMpIHtcbiAgICBjb25zdCBxOiBbbnVtYmVyLCBudW1iZXJdID0gUmVmbGVjdC5nZXQoRElSRUNUSU9OUywgcHJvcGVydHkpO1xuICAgIGNhbl9mbGlwX3BsYWNlcyA9IGNhbl9mbGlwX3BsYWNlcy5jb25jYXQoanVkZ2VfZmxpcF8xZChwLCBxLCBib2FyZCkpO1xuICB9XG4gIHJldHVybiBjYW5fZmxpcF9wbGFjZXM7XG59XG5cbmV4cG9ydCBlbnVtIEdhbWVzdGF0dXMge1xuICBPayxcbiAgUGFzcyxcbiAgRW5kLFxuICBFcnJvcixcbn1cblxuLy/nj77lnKjjga7nm6TpnaLjgajmrKHjga7nnYDmiYvjgYzkuI7jgYjjgonjgozjgabmrKHjga7nm6TpnaLjgpLov5TjgZlcbmV4cG9ydCBmdW5jdGlvbiBuZXh0X3N0YXRlKFxuICBpbnB1dF9ib2FyZDogUmVhZG9ubHk8Qm9hcmQ+LFxuICBwOiBbbnVtYmVyLCBudW1iZXJdXG4pOiBbQm9hcmQsIEdhbWVzdGF0dXNdIHtcbiAgY29uc3QgYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoaW5wdXRfYm9hcmQpO1xuICBpZiAoaXNfdmFsaWRfbW92ZShwLCBib2FyZCkgJiYgcHV0X3N0b25lKHAsIGJvYXJkLmJsYWNrX3R1cm4sIGJvYXJkKSkge1xuICAgIGNvbnN0IGNhbl9mbGlwX3BsYWNlcyA9IGZsaXBhYmxlX2FsbF9wbGFjZXMocCwgYm9hcmQpO1xuICAgIGZvciAoY29uc3QgZWxlbWVudHMgb2YgY2FuX2ZsaXBfcGxhY2VzKSB7XG4gICAgICBmbGlwX3N0b25lKGVsZW1lbnRzLCBib2FyZCk7XG4gICAgfVxuXG4gICAgbW92ZV90dXJuKGJvYXJkKTtcblxuICAgIGlmIChhbGxfdmFsaWRfbW92ZXMoYm9hcmQpLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBbYm9hcmQsIEdhbWVzdGF0dXMuT2tdO1xuICAgIH1cblxuICAgIGlmIChhbGxfdmFsaWRfbW92ZXMoYm9hcmQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbW92ZV90dXJuKGJvYXJkKTtcbiAgICAgIGlmIChhbGxfdmFsaWRfbW92ZXMoYm9hcmQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBtb3ZlX3R1cm4oYm9hcmQpO1xuICAgICAgICByZXR1cm4gW2JvYXJkLCBHYW1lc3RhdHVzLkVuZF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW2JvYXJkLCBHYW1lc3RhdHVzLlBhc3NdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gW2JvYXJkLCBHYW1lc3RhdHVzLkVycm9yXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5leHRfc3RhdGVfZm9yX21pbmltYXgoXG4gIGlucHV0X2JvYXJkOiBSZWFkb25seTxCb2FyZD4sXG4gIHA6IFtudW1iZXIsIG51bWJlcl1cbik6IEJvYXJkIHtcbiAgY29uc3QgYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoaW5wdXRfYm9hcmQpO1xuICBpZiAoaXNfdmFsaWRfbW92ZShwLCBib2FyZCkgJiYgcHV0X3N0b25lKHAsIGJvYXJkLmJsYWNrX3R1cm4sIGJvYXJkKSkge1xuICAgIGNvbnN0IGNhbl9mbGlwX3BsYWNlcyA9IGZsaXBhYmxlX2FsbF9wbGFjZXMocCwgYm9hcmQpO1xuICAgIGZvciAoY29uc3QgZWxlbWVudHMgb2YgY2FuX2ZsaXBfcGxhY2VzKSB7XG4gICAgICBmbGlwX3N0b25lKGVsZW1lbnRzLCBib2FyZCk7XG4gICAgfVxuICAgIG1vdmVfdHVybihib2FyZCk7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG4gIG1vdmVfdHVybihib2FyZCk7XG4gIHJldHVybiBib2FyZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZV9oaXN0b3J5KFxuICBib2FyZF9oaXN0b3J5OiBCb2FyZF9oaXN0b3J5LFxuICB0dXJuX251bWJlcjogbnVtYmVyLFxuICB1c2VyX2lucHV0OiBbbnVtYmVyLCBudW1iZXJdXG4pOiBudW1iZXIge1xuICBjb25zdCBib2FyZCA9IGJvYXJkX2hpc3RvcnlbdHVybl9udW1iZXJdIVswXTtcbiAgZGVsZXRlX2xhdGVyX3R1cm4oYm9hcmRfaGlzdG9yeSwgdHVybl9udW1iZXIpO1xuICBjb25zdCBbbmV4dF9ib2FyZCwgc3RhdHVzXSA9IG5leHRfc3RhdGUoYm9hcmQsIHVzZXJfaW5wdXQpO1xuICBib2FyZF9oaXN0b3J5LnB1c2goW25leHRfYm9hcmQsIHN0YXR1c10pO1xuICByZXR1cm4gdHVybl9udW1iZXIgKyAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcF9jb3B5X2JvYXJkX2FycmF5KFxuICBib2FyZF9hcnJheTogUmVhZG9ubHk8Qm9hcmRBcnJheT5cbik6IEJvYXJkQXJyYXkge1xuICByZXR1cm4gYm9hcmRfYXJyYXkubWFwKChyKSA9PiBbLi4ucl0pIGFzIEJvYXJkQXJyYXk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWVwX2NvcHlfYm9hcmQoYm9hcmQ6IFJlYWRvbmx5PEJvYXJkPik6IEJvYXJkIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5ib2FyZCxcbiAgICBibGFjazogZGVlcF9jb3B5X2JvYXJkX2FycmF5KGJvYXJkLmJsYWNrKSxcbiAgICB3aGl0ZTogZGVlcF9jb3B5X2JvYXJkX2FycmF5KGJvYXJkLndoaXRlKSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZF9ib2FyZF9oaXN0b3J5KFxuICBib2FyZDogUmVhZG9ubHk8Qm9hcmQ+LFxuICBib2FyZF9oaXN0b3J5OiBCb2FyZF9oaXN0b3J5LFxuICBzdGF0dXM6IEdhbWVzdGF0dXMsXG4gIHR1cm5fbnVtYmVyOiBudW1iZXJcbik6IG51bWJlciB7XG4gIGJvYXJkX2hpc3RvcnkucHVzaChbZGVlcF9jb3B5X2JvYXJkKGJvYXJkKSwgc3RhdHVzXSk7XG4gIGNvbnN0IHB1dF90dXJuX251bWJlciA9IHR1cm5fbnVtYmVyICsgMTtcbiAgcmV0dXJuIHB1dF90dXJuX251bWJlcjtcbn1cblxuLy9oaXN0b3J544Gv5raI44GV44Ga44GrYm9hZWTjgYwx44K/44O844Oz5oi744KLXG5leHBvcnQgZnVuY3Rpb24gcmV0dXJuX29uZV90dXJuKFxuICBib2FyZF9oaXN0b3J5OiBCb2FyZF9oaXN0b3J5LFxuICB0dXJuX251bWJlcjogbnVtYmVyXG4pOiBCb2FyZCB7XG4gIGlmICh0dXJuX251bWJlciA+PSAxKSB7XG4gICAgY29uc3QgYm9hcmQgPSBkZWVwX2NvcHlfYm9hcmQoYm9hcmRfaGlzdG9yeVt0dXJuX251bWJlciAtIDFdIVswXSk7XG4gICAgdHVybl9udW1iZXIgPSB0dXJuX251bWJlciAtIDE7XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG4gIHJldHVybiBkZWVwX2NvcHlfYm9hcmQoYm9hcmRfaGlzdG9yeVt0dXJuX251bWJlcl0hWzBdKTtcbn1cblxuLy9oaXN0b3J544Gv5raI44GV44Ga44GrYm9hZWTjgYwx44K/44O844Oz6YCy44KAXG5leHBvcnQgZnVuY3Rpb24gbmV4dF9vbmVfdHVybihcbiAgYm9hcmRfaGlzdG9yeTogQm9hcmRfaGlzdG9yeSxcbiAgdHVybl9udW1iZXI6IG51bWJlclxuKTogQm9hcmQge1xuICBpZiAodHVybl9udW1iZXIgPCBib2FyZF9oaXN0b3J5Lmxlbmd0aCAtIDEpIHtcbiAgICBjb25zdCBib2FyZCA9IGRlZXBfY29weV9ib2FyZChib2FyZF9oaXN0b3J5W3R1cm5fbnVtYmVyICsgMV0hWzBdKTtcbiAgICB0dXJuX251bWJlcisrO1xuICAgIHJldHVybiBib2FyZDtcbiAgfVxuICByZXR1cm4gZGVlcF9jb3B5X2JvYXJkKGJvYXJkX2hpc3RvcnlbdHVybl9udW1iZXJdIVswXSk7XG59XG5cbi8v44Gd44GuYm9hcmTku6XpmY3jga5oaXN0b3J544KS5raI44GZXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlX2xhdGVyX3R1cm4oXG4gIGJvYXJkX2hpc3Rvcnk6IEJvYXJkX2hpc3RvcnksXG4gIHR1cm5fbnVtYmVyOiBudW1iZXJcbik6IEJvYXJkX2hpc3Rvcnkge1xuICBpZiAoYm9hcmRfaGlzdG9yeS5sZW5ndGggPiAxKSB7XG4gICAgY29uc3QgbnVtYmVyX29mX2RlbGV0ZSA9IGJvYXJkX2hpc3RvcnkubGVuZ3RoIC0gdHVybl9udW1iZXIgLSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyX29mX2RlbGV0ZTsgaSsrKSB7XG4gICAgICBib2FyZF9oaXN0b3J5LnBvcCgpO1xuICAgIH1cbiAgICByZXR1cm4gYm9hcmRfaGlzdG9yeTtcbiAgfVxuICByZXR1cm4gYm9hcmRfaGlzdG9yeTtcbn1cblxuLy/liY3lm57jga7jgZ3jga7oibLjga7jgr/jg7zjg7Pjgb7jgafmiLvjgotcbmV4cG9ydCBmdW5jdGlvbiBiYWNrX3RvX215X3R1cm4oXG4gIGJvYXJkX2hpc3Rvcnk6IEJvYXJkX2hpc3RvcnksXG4gIHR1cm5fbnVtYmVyOiBudW1iZXJcbik6IG51bWJlciB7XG4gIGlmICh0dXJuX251bWJlciA+IDEpIHtcbiAgICBjb25zdCBpc19ibGFja190dXJuID0gYm9hcmRfaGlzdG9yeVt0dXJuX251bWJlcl0hWzBdLmJsYWNrX3R1cm47XG4gICAgdHVybl9udW1iZXItLTtcbiAgICBsZXQgYmVmb3JlX2JvYXJkID0gZGVlcF9jb3B5X2JvYXJkKGJvYXJkX2hpc3RvcnlbdHVybl9udW1iZXJdIVswXSk7XG4gICAgd2hpbGUgKGlzX2JsYWNrX3R1cm4gIT09IGJlZm9yZV9ib2FyZC5ibGFja190dXJuKSB7XG4gICAgICB0dXJuX251bWJlci0tO1xuICAgICAgYmVmb3JlX2JvYXJkID0gZGVlcF9jb3B5X2JvYXJkKGJvYXJkX2hpc3RvcnlbdHVybl9udW1iZXJdIVswXSk7XG4gICAgfVxuICAgIHJldHVybiB0dXJuX251bWJlcjtcbiAgfVxuICByZXR1cm4gdHVybl9udW1iZXI7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IG5ld19yYW5kb21fcGxheWVyIH0gZnJvbSAnLi9haSc7XG5pbXBvcnQgeyBkcmF3X2JvYXJkLCBkcmF3X2dyaWQsIGRyYXdfcGllY2UsIGRyYXdfcGllY2VzIH0gZnJvbSAnLi9kcmF3ZXInO1xuaW1wb3J0IHsgY3JlYXRlX2dhbWUsIHB1dF9jYW5jZWxfYnV0dG9uLCBzdGFydF9sb29wIH0gZnJvbSAnLi9nYW1lJztcbmltcG9ydCB7XG4gIEJvYXJkLFxuICBjYWxjX3Njb3JlLFxuICBnZW5lcmF0ZV9pbml0aWFsX2JvYXJkLFxuICBzdHJpbmdpZnlfYm9hcmQsXG4gIHB1dF9zdG9uZSxcbiAgZmxpcF9zdG9uZSxcbiAgbW92ZV90dXJuLFxuICBwYXJzZV9jb29yZCxcbiAgaXNfdmFsaWRfbW92ZSxcbiAgYWRkX3ZlYyxcbiAganVkZ2VfZmxpcF8xZCxcbiAgRElSRUNUSU9OUyxcbiAgYWxsX3ZhbGlkX21vdmVzLFxuICBuZXh0X3N0YXRlLFxuICBHYW1lc3RhdHVzLFxuICBmbGlwYWJsZV9hbGxfcGxhY2VzLFxufSBmcm9tICcuL290aGVsbG8nO1xuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGNvbnN0IG1lc3NhZ2VfaG9sZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gIGNvbnN0IHN0YXJ0X2J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICdzdGFydF9idXR0b24nXG4gICkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIGNvbnN0IGNhbmNlbF9idXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnY2FuY2VsX2J1dHRvbidcbiAgKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3Qgc2VsZWN0X2JsYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgJ3NlbGVjdF9ibGFjaydcbiAgKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3Qgc2VsZWN0X3doaXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgJ3NlbGVjdF93aGl0ZSdcbiAgKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3Qgc2VsZWN0X0FJYmF0dGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgJ3NlbGVjdF9BSWJhdHRsZSdcbiAgKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgY29uc3QgZmlyc3RfQUlzZWxlY3RfZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICdmaXJzdF9BSXNlbGVjdF9mb3JtJ1xuICApIGFzIEhUTUxGb3JtRWxlbWVudDtcbiAgY29uc3Qgc2Vjb25kX0FJc2VsZWN0X2Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnc2Vjb25kX0FJc2VsZWN0X2Zvcm0nXG4gICkgYXMgSFRNTEZvcm1FbGVtZW50O1xuICBjb25zdCBmaXJzdF9BSXNlbGVjdF9ib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnZmlyc3RfQUlzZWxlY3RfYm94J1xuICApIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICBjb25zdCBzZWNvbmRfQUlzZWxlY3RfYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgJ3NlY29uZF9BSXNlbGVjdF9ib3gnXG4gICkgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gIGNvbnN0IGZpeF9BSSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaXhfQUknKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcblxuICBjYW5jZWxfYnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGZpeF9BSS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBmaXJzdF9BSXNlbGVjdF9mb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHNlY29uZF9BSXNlbGVjdF9mb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgY29uc3QgZ2FtZSA9IGNyZWF0ZV9nYW1lKFxuICAgIGNhbnZhcyxcbiAgICBtZXNzYWdlX2hvbGRlcixcbiAgICBzdGFydF9idXR0b24sXG4gICAgY2FuY2VsX2J1dHRvbixcbiAgICBzZWxlY3RfYmxhY2ssXG4gICAgc2VsZWN0X3doaXRlLFxuICAgIHNlbGVjdF9BSWJhdHRsZSxcbiAgICBmaXJzdF9BSXNlbGVjdF9ib3gsXG4gICAgZmlyc3RfQUlzZWxlY3RfZm9ybSxcbiAgICBzZWNvbmRfQUlzZWxlY3RfYm94LFxuICAgIHNlY29uZF9BSXNlbGVjdF9mb3JtLFxuICAgIGZpeF9BSVxuICApO1xuICBwdXRfY2FuY2VsX2J1dHRvbihnYW1lLCBnYW1lLmNhbmNlbF9idXR0b24pO1xuICBkcmF3X2JvYXJkKGdhbWUuYm9hcmQsIGNhbnZhcyk7XG4gIHN0YXJ0X2xvb3AoZ2FtZSwgY2FudmFzKTtcbn07XG5cbm1haW4oKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==