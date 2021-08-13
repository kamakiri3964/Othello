import { all_valid_moves, Board } from './othello';

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
