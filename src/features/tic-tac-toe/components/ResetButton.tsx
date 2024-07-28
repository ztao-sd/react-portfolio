import { Button } from "src/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useSetAtom, useAtomValue } from "jotai";
import {
  squaresHistoryAtom,
  linesHistoryAtom,
  moveHistoryAtom,
  winningSquaresAtom,
  currentMoveAtom,
  winnerAtom,
  availableSquaresAtom,
  firstAtom,
  playWithBotAtom,
} from "../store";
import { ResetButtonProps } from "../types";

export default function ResetButton({ botPlay }: ResetButtonProps) {
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
}
