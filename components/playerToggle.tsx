import { Player } from "../app/types/player";

export const PlayerToggle = ({
  player,
  setPlayer,
}: {
  player: Player;
  setPlayer: (player: Player) => void;
}) => {
  return (
    <div className="toggle">
      <button
        className={player === Player.YOU ? "active" : ""}
        onClick={() => setPlayer(Player.YOU)}
      >
        You
      </button>
      <button
        className={player === Player.THEM ? "active" : ""}
        onClick={() => setPlayer(Player.THEM)}
      >
        Them
      </button>
    </div>
  );
};