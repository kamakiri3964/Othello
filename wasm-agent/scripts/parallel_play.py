import concurrent.futures
import subprocess
from dataclasses import dataclass
from enum import Enum
import json
from typing import List
from collections import defaultdict
import math
import time


class Result(Enum):
    BlackWin = "Black win"
    Draw = "Draw"
    WhiteWin = "White win"

@dataclass
class GameResult:
    """
    struct GameResult {
        start: Board,
        end: Board,
        black: String,
        white: String,
        black_stone: u32,
        white_stone: u32,
        black_win: bool,
        white_win: bool
    }
    """
    black: str = ""
    white: str = ""
    black_stone: int = ""
    white_stone: int = ""
    result: Result = Result.Draw


def run_game(opening: int, blackagent: int, whiteagent: int) -> GameResult:
    cp = subprocess.run(['cargo', 'run', '--bin', 'compare_agent', '--release', '--', str(opening), str(blackagent), str(whiteagent)], encoding='utf-8', stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if cp.returncode != 0:
        print(cp.stderr)
    else:
        result_json = json.loads(cp.stdout)
        result = GameResult(
            black=result_json["black"],
            white=result_json["white"],
            black_stone=result_json["black_stone"],
            white_stone=result_json["white_stone"],
            result=Result.BlackWin if result_json["black_win"] else Result.WhiteWin if result_json["white_win"]  else Result.Draw
        )
        return result


def sumarize(results: List[Result]):
    draw = 0
    win_count = defaultdict(int)
    total = len(results)

    for r in results:
        if r.result == Result.Draw:
            draw += 1
        elif r.result == Result.BlackWin:
            win_count[r.black] += 1
        else:
            win_count[r.white] += 1

    for k in win_count.keys():
        print(f"{k}: {100 * win_count[k] / total:.3f}% ({win_count[k]} / {total})")
    print(f"Draw: {100 * draw / total:.3f}% ({draw} / {total})")


def progress_bar(generator, length):
    template = "\r[{}] {}/{} {:.3f}%  {:.3f}sec"
    w = 30
    n = 0
    t0 = time.time()

    for v in generator:
        l = math.floor(1.0 * w * n / length)
        progress = "*" * l + " " * (w - l)
        t1 = time.time()
        print(template.format(progress, n, length, 100 * n / length, t1-t0), end="")
        yield v
        n += 1

    t1 = time.time()
    print(template.format("*" * w, n, length, 100, t1-t0))

def main():
    blackagent = 2
    whiteagent = 3
    # n_opnening = 8200
    n_opnening = 100
    executor = concurrent.futures.ProcessPoolExecutor(max_workers=16)
    futures = [executor.submit(run_game, t, blackagent, whiteagent) for t in range(n_opnening)]
    futures.extend([executor.submit(run_game, t, whiteagent, blackagent) for t in range(n_opnening)])

    results: List[Result] = []
    for future in progress_bar(concurrent.futures.as_completed(futures), len(futures)):
        results.append(future.result())
    executor.shutdown()

    sumarize(results)


if __name__ == "__main__":
    main()