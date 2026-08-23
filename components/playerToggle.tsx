import { Player } from "../app/types/player";

export const PlayerToggle = ({
  player,
  setPlayer,
  names,
}: {
  player: Player;
  setPlayer: (player: Player) => void;
  names: Record<Player, string>;
}) => {
  return (
    <div className="toggle">
      <button
        className={player === Player.YOU ? "active" : ""}
        onClick={() => setPlayer(Player.YOU)}
      >
        {names[Player.YOU]}
      </button>
      <button
        className={player === Player.THEM ? "active" : ""}
        onClick={() => setPlayer(Player.THEM)}
      >
        {names[Player.THEM]}
      </button>
    </div>
  );
};