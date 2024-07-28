import { Provider } from "jotai";
import TicTacToe from "@/features/tic-tac-toe/components/TicTacToe";

export default function TicTacToePage() {
  return (
    <Provider>
      <TicTacToe />
    </Provider>
  );
}
