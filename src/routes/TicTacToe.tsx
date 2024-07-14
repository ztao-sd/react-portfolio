import { RotateCcw, ArrowDownLeft } from "lucide-react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type XO = "X" | "O";
type XON = XO | null;

type PlayCallback = () => void;
type BoardPlayCallback = (idx: number) => void;
type BotPlayCallback = (
  winner: XON,
  player: XO,
  aSquares: Set<number>,
  nextLines: Array<number>,
  nextMove: number,
  nextSquares?: Array<XON>,
  mHistory?: Array<Array<string | number>>,
  sHistory?: Array<Array<XON>>,
  lHistory?: Array<Array<number>>,
) => void;

interface SquareProps {
  value?: XON;
  onPlay: PlayCallback;
  highlighted?: boolean;
}

interface BoardProps {
  squares: Array<XON>;
  onPlay: BoardPlayCallback;
}

interface ResetButtonProps {
  botPlay: BotPlayCallback;
}

interface LogProps {
  goTo: (move: number) => void;
}

const playWithBotAtom = atom(false);
const firstAtom = atom<XO>("X");
const squaresHistoryAtom = atomWithReset([Array(9).fill(null)]);
const linesHistoryAtom = atomWithReset([Array(8).fill(0)]);
const moveHistoryAtom = atomWithReset([Array(2).fill(null)]);
const winningSquaresAtom = atomWithReset<Set<number>>(new Set());
const winnerAtom = atomWithReset<XON>(null);
const currentMoveAtom = atomWithReset(0);
const availableSquaresAtom = atomWithReset(
  new Set(Array.from(Array(9).keys())),
);

// Derived
const currentSquaresAtom = atom(
  (get) => get(squaresHistoryAtom)[get(currentMoveAtom)],
);
const currentLinesAtom = atom(
  (get) => get(linesHistoryAtom)[get(currentMoveAtom)],
);
const nextPlayerAtom = atom((get) =>
  get(currentMoveAtom) % 2 == 0
    ? get(firstAtom)
    : get(firstAtom) === "X"
      ? "O"
      : "X",
);
const gameInProgressAtom = atom((get) => get(currentMoveAtom) > 0);

const Square = ({ value, onPlay, highlighted }: SquareProps) => {
  return (
    <Button
      variant="tictactoe"
      size="tictactoe"
      className={cn("-mr-[2px] -mt-[2px]", {
        "bg-emerald-500 hover:bg-emerald-700": highlighted,
      })}
      onClick={onPlay}
    >
      {value}
    </Button>
  );
};

const Board = ({ squares, onPlay }: BoardProps) => {
  const winningSquares = useAtomValue(winningSquaresAtom);
  return (
    <div className="grid grid-cols-3 grid-rows-3">
      {squares.map((value, idx) => {
        return (
          <Square
            value={value}
            onPlay={() => onPlay(idx)}
            highlighted={winningSquares.has(idx)}
            key={idx}
          ></Square>
        );
      })}
    </div>
  );
};

const ResetButton = ({ botPlay }: ResetButtonProps) => {
  const setSquaresHistory = useSetAtom(squaresHistoryAtom);
  const setLinesHistory = useSetAtom(linesHistoryAtom);
  const setMoveHistory = useSetAtom(moveHistoryAtom);
  const setWinningSquares = useSetAtom(winningSquaresAtom);
  const setCurrentMove = useSetAtom(currentMoveAtom);
  const setWinner = useSetAtom(winnerAtom);
  const setAvailableSquares = useSetAtom(availableSquaresAtom);
  const first = useAtomValue(firstAtom);
  const playWithBot = useAtomValue(playWithBotAtom);

  const reset = () => {
    const squaresHistory = [Array(9).fill(null)];
    const linesHistory = [Array(8).fill(0)];
    const moveHistory = [Array(2).fill(null)];
    const winningSquares = new Set<number>();
    const winner = null;
    const currentMove = 0;
    const availableSquares = new Set(Array.from(Array(9).keys()));

    if (playWithBot && first === "O") {
      botPlay(
        winner,
        "O",
        availableSquares,
        linesHistory[0],
        currentMove,
        squaresHistory[0],
        moveHistory,
        squaresHistory,
        linesHistory,
      );
    } else {
      console.log("reset");
      setSquaresHistory(squaresHistory);
      setLinesHistory(linesHistory);
      setMoveHistory(moveHistory);
      setWinningSquares(winningSquares);
      setWinner(winner);
      setCurrentMove(currentMove);
      setAvailableSquares(availableSquares);
    }
  };
  return (
    <Button variant="ghost" onClick={reset}>
      <RotateCcw></RotateCcw>
    </Button>
  );
};

const Panel = () => {
  const [first, setFirst] = useAtom(firstAtom);
  const setPlayWithBot = useSetAtom(playWithBotAtom);
  const gameInProgress = useAtomValue(gameInProgressAtom);

  return (
    <div className="flex flex-row space-x-4 divide-x-2">
      <div className="flex flex-row space-x-2">
        <Switch
          defaultChecked={false}
          onCheckedChange={(checked) => {
            setPlayWithBot(checked);
          }}
        ></Switch>
        <span>Bot</span>
      </div>
      <div className="flex flex-row space-x-2 pl-4">
        <Toggle
          variant="tictactoe"
          size="tictactoe"
          defaultPressed={false}
          onPressedChange={(pressed) => {
            pressed ? setFirst("O") : setFirst("X");
          }}
          disabled={gameInProgress}
        >
          {first}
        </Toggle>
        <span>First</span>
      </div>
    </div>
  );
};

const Log = ({ goTo }: LogProps) => {
  const moveHistory = useAtomValue(moveHistoryAtom);
  const gameLogs = moveHistory.map((move, idx) => {
    return {
      move: idx,
      player: move[0],
      square: move[1],
    };
  });

  return (
    <Table className="w-auto border border-black bg-white/90 backdrop-blur">
      <TableCaption className="text-black">Game Log</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold text-black">Move</TableHead>
          <TableHead className="font-bold text-black">Player</TableHead>
          <TableHead className="font-bold text-black">Square</TableHead>
          <TableHead className="font-bold text-black">Go To</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gameLogs.map((log) => (
          <TableRow key={log.move}>
            <TableCell className="font-medium">{log.move}</TableCell>
            <TableCell>{log.player ? log.player : "-"}</TableCell>
            <TableCell>{log.square ? log.square : "-"}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-slate-300/90"
                onClick={() => goTo(log.move)}
              >
                <ArrowDownLeft size={20}></ArrowDownLeft>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const TicTacToePage = () => {
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

  const calculateWinner = (
    nextSquares: Array<XON>,
    idx: number,
    nextMove: number,
    nextLines: Array<number>,
    lHistory: Array<Array<number>>,
  ): [XON, Set<number>] => {
    const size = 3;
    const row = Math.floor(idx / size);
    const col = idx % size;

    const player = nextSquares[idx];
    if (!player) return [null, new Set()];

    const increment = player === "X" ? 1 : -1;
    const winCondition = player === "X" ? 3 : -3;

    // Check horizontal
    nextLines[row] += increment;
    // Check vertical
    nextLines[col + size] += increment;
    // Check diagonal
    if (row === col) {
      nextLines[2 * size] += increment;
    }
    if (row + col === size - 1) {
      nextLines[2 * size + 1] += increment;
    }
    lHistory.splice(nextMove);
    lHistory.push([...nextLines]);

    let winner = null;
    const winningSquares: Set<number> = new Set();

    // Check win conditions
    if (nextLines[row] === winCondition) {
      Array.from([0, 1, 2], (x) => x + row * size).forEach((value) =>
        winningSquares.add(value),
      );
      winner = player;
    }
    if (nextLines[col + size] === winCondition) {
      Array.from([0, 1, 2], (x) => x * size + col).forEach((value) =>
        winningSquares.add(value),
      );
      winner = player;
    }
    if (nextLines[2 * size] === winCondition) {
      [0, 4, 8].forEach((value) => winningSquares.add(value));
      winner = player;
    }
    if (nextLines[2 * size + 1] === winCondition) {
      [2, 4, 6].forEach((value) => winningSquares.add(value));
      winner = player;
    }
    return [winner, winningSquares];
  };

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
      <Log goTo={goTo}></Log>
    </div>
  );
};

export default TicTacToePage;
