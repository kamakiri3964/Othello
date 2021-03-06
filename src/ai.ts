import {
  all_valid_moves,
  Board,
  calc_score,
  deep_copy_board,
  deep_copy_board_array,
  Gamestatus,
  move_turn,
  next_state,
  next_state_for_minimax,
} from './othello';

export type AIAgent = {
  next_move(board: Readonly<Board>): [number, number];
};

export function new_random_player(): AIAgent {
  return {
    next_move: (board: Readonly<Board>) => {
      const can_put_place = all_valid_moves(board);
      const put_place =
        can_put_place[Math.floor(Math.random() * can_put_place.length)];
      if (put_place !== undefined) {
        return put_place;
      }
      return [-1, -1];
    },
  };
}

export function new_weak_agent(): AIAgent {
  return {
    next_move: weak_agent_move,
  };
}

type Score = [number, [number, number]];

function weak_agent_move(board: Readonly<Board>): [number, number] {
  const can_put_place = all_valid_moves(board);
  const is_black_turn = board.black_turn;
  const scores: Score[] = [];
  for (const input_place of can_put_place) {
    const temporary_board = deep_copy_board(board);
    const [next_board, status] = next_state(temporary_board, input_place);
    const [b_score, w_score] = calc_score(next_board);
    if (is_black_turn) {
      scores.push([b_score, input_place]);
    } else {
      scores.push([w_score, input_place]);
    }
  }
  scores.sort(function (a, b) {
    if (a[0] > b[0]) return -1;
    if (a[0] < b[0]) return 1;
    return 0;
  });
  return scores[0]![1];
}

export function minimax_agent(): AIAgent {
  return {
    next_move: minimax_move,
  };
}

function minimax_move(board: Readonly<Board>): [number, number] {
  const score = eval_by_search(board, 6);
  return score[1];
}

function eval_by_search(board: Readonly<Board>, depth: number): Score {
  if (depth <= 1) {
    return stone_count_for_eval(board);
  } else {
    const can_put_place = all_valid_moves(board);
    let best_score: number = -64;
    let best_move: [number, number] = [0, 0];

    for (const input_place of can_put_place) {
      const temporary_board = deep_copy_board(board);
      const [next_board, status] = next_state(temporary_board, input_place);

      if (status !== Gamestatus.Pass) {
        const score = eval_by_search(next_board, depth - 1);
        if (-score[0] > best_score) {
          [best_score, best_move] = [-score[0], input_place];
        }
      } else {
        const score = eval_by_search(next_board, depth - 2);
        if (score[0] > best_score) {
          [best_score, best_move] = [score[0], input_place];
        }
      }
    }
    return [best_score, best_move];
  }
}

export function alphabeta_agent_stone_count(): AIAgent {
  return {
    next_move: alphabeta_move_stone_count,
  };
}

function alphabeta_move_stone_count(board: Readonly<Board>): [number, number] {
  const score = alphabeta_eval_by_search(
    board,
    6,
    100000000,
    -100000000,
    stone_count_for_eval
  );
  return score[1];
}

function alphabeta_eval_by_search(
  board: Readonly<Board>,
  depth: number,
  max_score: number,
  min_score: number,
  input_function: Function
): Score {
  if (depth <= 1) {
    return input_function(board);
  } else {
    const can_put_place = all_valid_moves(board);
    let best_score: number = -100000000;
    let best_move: [number, number] = [0, 0];

    if (all_valid_moves(board).length <= 0) {
      const cannot_put_board = deep_copy_board(board);
      move_turn(cannot_put_board);
      return alphabeta_eval_by_search(
        cannot_put_board,
        depth - 1,
        -min_score,
        -max_score,
        input_function
      );
    }

    for (const input_place of can_put_place) {
      const temporary_board = deep_copy_board(board);
      const next_board = next_state_for_minimax(temporary_board, input_place);
      const score = alphabeta_eval_by_search(
        next_board,
        depth - 1,
        -best_score,
        -max_score,
        input_function
      );
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

function stone_count_for_eval(board: Readonly<Board>): Score {
  const is_black_turn = board.black_turn;
  const [b_score, w_score] = calc_score(board);
  if (is_black_turn) {
    return [b_score, [0, 0]];
  } else {
    return [w_score, [0, 0]];
  }
}

function enemy_CPP_minimam(board: Readonly<Board>): Score {
  const score = all_valid_moves(board).length;
  return [score, [0, 0]];
}

export function alphabeta_agent_enemy_CPP(): AIAgent {
  return {
    next_move: alphabeta_move_enemy_CPP,
  };
}

function alphabeta_move_enemy_CPP(board: Readonly<Board>): [number, number] {
  const score = alphabeta_eval_by_search(
    board,
    5,
    100000000,
    -100000000,
    enemy_CPP_minimam
  );
  return score[1];
}

const eval_score_1: number[][] = [
  [200, -50, 40, 5, 5, 40, -50, 200],
  [-50, -90, -10, -5, -5, -10, -90, -50],
  [40, -10, -2, -2, -2, -2, -10, 40],
  [5, -5, -2, 1, 1, -2, -5, 5],
  [5, -5, -2, 1, 1, -2, -5, 5],
  [40, -10, -2, -2, -2, -2, -10, 40],
  [-50, -90, -10, -5, -5, -10, -90, -50],
  [200, -50, 40, 5, 5, 40, -50, 200],
];

function eval_score_count_1(board: Readonly<Board>): Score {
  const is_black_turn = board.black_turn;
  let b_score = 0;
  let w_score = 0;

  board.black.forEach((r, i) => {
    r.forEach((b, j) => {
      if (b) {
        b_score = b_score + eval_score_1[i]![j]!;
      }
    });
  });
  board.white.forEach((r, i) => {
    r.forEach((b, j) => {
      if (b) {
        w_score = w_score + eval_score_1[i]![j]!;
      }
    });
  });
  if (is_black_turn) {
    return [b_score - w_score, [0, 0]];
  } else {
    return [w_score - b_score, [0, 0]];
  }
}

export function alphabeta_agent_score_count_1(): AIAgent {
  return {
    next_move: alphabeta_move_score_count_1,
  };
}

function alphabeta_move_score_count_1(
  board: Readonly<Board>
): [number, number] {
  const score = alphabeta_eval_by_search(
    board,
    6,
    100000000,
    -100000000,
    eval_score_count_1
  );
  return score[1];
}
