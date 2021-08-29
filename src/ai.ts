import {
  all_valid_moves,
  Board,
  calc_score,
  deep_copy_board,
  deep_copy_board_array,
  Gamestatus,
  next_state,
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

export function minimax_stone_count_agent(): AIAgent {
  return {
    next_move: minimax_stone_count_move,
  };
}

function minimax_stone_count_move(board: Readonly<Board>): [number, number] {
  const score = eval_by_search(board, 4);
  return score[1];
}

function eval_by_search(board: Readonly<Board>, depth: number): Score {
  const scores: Score[] = [];
  const is_black_turn = board.black_turn;
  if (depth <= 1) {
    const [b_score, w_score] = calc_score(board);
    if (is_black_turn) {
      return [b_score, [0, 0]];
    } else {
      return [w_score, [0, 0]];
    }
  } else {
    const can_put_place = all_valid_moves(board);
    for (const input_place of can_put_place) {
      const temporary_board = deep_copy_board(board);
      const [next_board, status] = next_state(temporary_board, input_place);

      if (status !== Gamestatus.Pass) {
        const score = eval_by_search(next_board, depth - 1);
        scores.push([-score[0], input_place]);
      } else {
        const score = eval_by_search(next_board, depth - 2);
        scores.push([score[0], input_place]);
      }
    }
    scores.sort(function (a, b) {
      if (a[0] > b[0]) return -1;
      if (a[0] < b[0]) return 1;
      return 0;
    });
    if (scores[0] !== undefined) {
      return scores[0];
    }
  }
  return [0, [0, 0]];
}

export function alphabeta_stone_count_agent(): AIAgent {
  return {
    next_move: alphabeta_stone_count_move,
  };
}

function alphabeta_stone_count_move(board: Readonly<Board>): [number, number] {
  const score = alphabeta_eval_by_search(board, 6);
  return score[1];
}

function alphabeta_eval_by_search(
  board: Readonly<Board>,
  depth: number
): Score {
  const scores: Score[] = [];
  const is_black_turn = board.black_turn;
  if (depth <= 1) {
    const [b_score, w_score] = calc_score(board);
    if (is_black_turn) {
      return [b_score, [0, 0]];
    } else {
      return [w_score, [0, 0]];
    }
  } else {
    const can_put_place = all_valid_moves(board);
    let alpha = -1;
    let beta = 65;
    for (const input_place of can_put_place) {
      const temporary_board = deep_copy_board(board);
      const [next_board, status] = next_state(temporary_board, input_place);

      if (status !== Gamestatus.Pass) {
        const score = alphabeta_eval_by_search(next_board, depth - 1);
        if (depth % 2 === 1 && score[0] > alpha) {
          alpha = score[0];
          scores.push([score[0], input_place]);
        } else if (depth % 2 === 0 && score[0] < beta) {
          beta = score[0];
          scores.push([score[0], input_place]);
        }
      } else {
        const score = alphabeta_eval_by_search(next_board, depth - 2);
        if (depth % 2 === 1 && score[0] > alpha) {
          alpha = score[0];
          scores.push([score[0], input_place]);
        } else if (depth % 2 === 0 && score[0] < beta) {
          beta = score[0];
          scores.push([score[0], input_place]);
        }
      }
    }

    if (depth % 2 === 1) {
      scores.sort(function (a, b) {
        if (a[0] > b[0]) return -1;
        if (a[0] < b[0]) return 1;
        return 0;
      });
      if (scores[0] !== undefined) {
        return scores[0];
      }
    } else if (depth % 2 === 0) {
      scores.sort(function (a, b) {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
      });
      if (scores[0] !== undefined) {
        return scores[0];
      }
    }
  }
  return [0, [0, 0]];
}
