import { cn } from "src/lib/utils";
import { Button } from "src/components/ui/button";
import { useAtomValue } from "jotai";
import { winningSquaresAtom } from "../store";
import { BoardProps, SquareProps } from "../types";

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
}

export default function Board({ squares, onPlay }: BoardProps) {
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
}
