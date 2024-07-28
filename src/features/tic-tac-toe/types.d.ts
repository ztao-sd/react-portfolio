export type XO = "X" | "O";
export type XON = XO | null;

export type PlayCallback = () => void;
export type BoardPlayCallback = (idx: number) => void;
export type BotPlayCallback = (
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

export interface SquareProps {
  value?: XON;
  onPlay: PlayCallback;
  highlighted?: boolean;
}

export interface BoardProps {
  squares: Array<XON>;
  onPlay: BoardPlayCallback;
}

export interface ResetButtonProps {
  botPlay: BotPlayCallback;
}

export interface LogProps {
  goTo: (move: number) => void;
}