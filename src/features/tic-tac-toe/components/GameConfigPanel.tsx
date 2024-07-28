import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Switch } from "src/components/ui/switch";
import { Toggle } from "src/components/ui/toggle";
import { firstAtom, playWithBotAtom, gameInProgressAtom } from "../store";

export default function Panel() {
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
}
