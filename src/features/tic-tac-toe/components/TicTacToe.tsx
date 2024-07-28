import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  playWithBotAtom,
  nextPlayerAtom,
  squaresHistoryAtom,
  linesHistoryAtom,
  currentMoveAtom,
  moveHistoryAtom,
  winningSquaresAtom,
  winnerAtom,
  currentSquaresAtom,
  currentLinesAtom,
  availableSquaresAtom,
} from "../store";
import Board from "./Board";
import Panel from "./GameConfigPanel";
import ResetButton from "./ResetButton";
import GameLog from "./GameLog";
import { calculateWinner } from "../utils";
import { XON, XO } from "../types";

const TicTacToe = () => {
  const playWithBot = useAtomValue(playWithBotAtom);
  const nextPlayer = useAtomValue(nextPlayerAtom);
  const [squaresHistory, setSquaresHistory] = useAtom(squaresHistoryAtom);
  const [linesHistory, setLinesHistory] = useAtom(linesHistoryAtom);
  const [currentMove, setCurrentMove] = useAtom(currentMoveAtom);
  const [moveHistory, setMoveHistory] = useAtom(moveHistoryAtom);
  const setWinningSquares = useSetAtom(winningSquaresAtom);
  const [winner, setWinner] = useAtom(winnerAtom);
  const currentSquares = useAtomValue(currentSquaresAtom);
  const currentLines = useAtomValue(currentLinesAtom);
  const [availableSquares, setAvailableSquares] = useAtom(availableSquaresAtom);

  const onPlay = (
    idx: number,
    nextMove?: number,
    nextSquares?: Array<XON>,
    player?: XO,
    mHistory?: Array<Array<string | number>>,
    sHistory?: Array<Array<XON>>,
    aSquares?: Set<number>,
    nextLines?: Array<number>,
    lHistory?: Array<Array<number>>,
    winner_?: XON,
  ) => {
    const _nextMove = nextMove !== undefined ? nextMove + 1 : currentMove + 1;
    const _nextSquares = nextSquares ? nextSquares : currentSquares.slice();
    let _nextPlayer = player ? player : nextPlayer;
    const _moveHistory = mHistory ? mHistory : moveHistory.slice();
    const _squaresHistory = sHistory ? sHistory : squaresHistory.slice();
    const _availableSquares = aSquares ? aSquares : new Set(availableSquares);
    const _nextLines = nextLines ? nextLines : currentLines.slice();
    const _linesHistory = lHistory ? lHistory : linesHistory.slice();
    let _winner = winner_ !== undefined ? winner_ : winner;
    let _winningSquares: Set<number> = new Set();

    console.log(`Played ${idx}`);
    if (_nextSquares[idx] || _winner) return;
    _nextSquares[idx] = _nextPlayer;
    [_winner, _winningSquares] = calculateWinner(
      _nextSquares,
      idx,
      _nextMove,
      _nextLines,
      _linesHistory,
    );
    _availableSquares.delete(idx);
    _nextPlayer = _nextPlayer === "X" ? "O" : "X";
    _moveHistory.splice(_nextMove);
    _moveHistory.push([_nextSquares[idx], idx]);
    _squaresHistory.splice(_nextMove);
    _squaresHistory.push([..._nextSquares]);

    if (
      !botPlay(
        _winner,
        _nextPlayer,
        _availableSquares,
        _nextLines,
        _nextMove,
        _nextSquares,
        _moveHistory,
        _squaresHistory,
        _linesHistory,
      )
    ) {
      setLinesHistory(_linesHistory);
      setWinningSquares(_winningSquares);
      setMoveHistory(_moveHistory);
      setSquaresHistory(_squaresHistory);
      setCurrentMove(_nextMove);
      setWinner(_winner);
      setAvailableSquares(_availableSquares);
    }
  };

  const botPlay = (
    winner: XON,
    player: XO,
    aSquares: Set<number>,
    nextLines: Array<number>,
    nextMove: number,
    nextSquares?: Array<XON>,
    mHistory?: Array<Array<string | number>>,
    sHistory?: Array<Array<XON>>,
    lHistory?: Array<Array<number>>,
  ) => {
    if (!winner && playWithBot && player === "O") {
      const size = 3;
      let maxScore = 1;
      const squareScoreArr = [1, 0, 1, 0, 1, 0, 1, 0, 1];

      if (nextMove > 1) {
        for (const square of aSquares) {
          const row = Math.floor(square / size);
          const col = square % size;
          const lines = [];
          let score = 0;
          lines.push(nextLines[row]);
          lines.push(nextLines[col + size]);
          if (row === col) lines.push(nextLines[2 * size]);
          if (row + col === size - 1) lines.push(nextLines[2 * size + 1]);
          for (const line of lines) {
            switch (line) {
              case -2:
                score += 1000;
                break;
              case -1:
                score += 30;
                break;
              case 0:
                score += 10;
                break;
              case 1:
                score += 40;
                break;
              case 2:
                score += 300;
                break;
              default:
                score += 0;
            }
          }
          squareScoreArr[square] = score;
          maxScore = Math.max(score, maxScore);
        }
      }

      let squaresArray = Array.from(aSquares);
      squaresArray = squaresArray.filter(
        (value) => squareScoreArr[value] === maxScore,
      );
      const square =
        squaresArray[Math.floor(Math.random() * squaresArray.length)];
      console.log(`Bot played ${square}`);
      onPlay(
        square,
        nextMove,
        nextSquares,
        player,
        mHistory,
        sHistory,
        aSquares,
        nextLines,
        lHistory,
        winner,
      );
      return true;
    }
    return false;
  };

  const goTo = (move: number) => {
    setCurrentMove(move);
    const availableSquares = new Set(Array.from(Array(9).keys()));
    setAvailableSquares(availableSquares);
    for (let i = 1; i <= move; i++) {
      const [, idx] = moveHistory[i];
      availableSquares.delete(idx);
    }
    if (move > 4) {
      const [, idx] = moveHistory[move];
      const [winner, winningSquares] = calculateWinner(
        squaresHistory[move].slice(),
        idx,
        move,
        linesHistory[move - 1].slice(),
        linesHistory.slice(),
      );
      setWinner(winner);
      setWinningSquares(winningSquares);
    } else {
      setWinner(null);
      setWinningSquares(new Set());
    }
  };

  return (
    <div className="mt-8 flex flex-col items-center space-y-4 lg:flex-row lg:items-start lg:justify-center lg:space-x-10 lg:space-y-0">
      <div className="flex flex-col items-center space-y-10">
        <Panel></Panel>
        <span className="h-5">
          {winner
            ? `Winner is ${winner}.`
            : currentMove >= 9
              ? "Draw."
              : `${nextPlayer}'s turn.`}
        </span>
        <Board squares={currentSquares} onPlay={onPlay}></Board>
        <ResetButton botPlay={botPlay}></ResetButton>
      </div>
      <GameLog goTo={goTo}></GameLog>
    </div>
  );
};

export default TicTacToe;
