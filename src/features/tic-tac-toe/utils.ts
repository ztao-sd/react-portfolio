import { XON } from "./types";

export const calculateWinner = (
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
