import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";
import { Button } from "src/components/ui/button";
import { ArrowDownLeft } from "lucide-react";
import { useAtomValue } from "jotai";
import { LogProps } from "../types";
import { moveHistoryAtom } from "../store";

export default function GameLog({ goTo }: LogProps){
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
}