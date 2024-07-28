import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { XO, XON } from "./types";

export const playWithBotAtom = atom(false);
export const firstAtom = atom<XO>("X");
export const squaresHistoryAtom = atomWithReset([Array(9).fill(null)]);
export const linesHistoryAtom = atomWithReset([Array(8).fill(0)]);
export const moveHistoryAtom = atomWithReset([Array(2).fill(null)]);
export const winningSquaresAtom = atomWithReset<Set<number>>(new Set());
export const winnerAtom = atomWithReset<XON>(null);
export const currentMoveAtom = atomWithReset(0);
export const availableSquaresAtom = atomWithReset(
  new Set(Array.from(Array(9).keys())),
);

// Derived
export const currentSquaresAtom = atom(
  (get) => get(squaresHistoryAtom)[get(currentMoveAtom)],
);
export const currentLinesAtom = atom(
  (get) => get(linesHistoryAtom)[get(currentMoveAtom)],
);
export const nextPlayerAtom = atom((get) =>
  get(currentMoveAtom) % 2 == 0
    ? get(firstAtom)
    : get(firstAtom) === "X"
      ? "O"
      : "X",
);
export const gameInProgressAtom = atom((get) => get(currentMoveAtom) > 0);