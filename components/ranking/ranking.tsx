import { Player } from "../../app/types/player";
import { Header } from "../header";
import { PlayerToggle } from "../playerToggle";
import { useRankingViewModel } from "./ranking.viewModel";

type Props = {
  player: Player;
  setPlayer: (player: Player) => void;
  copyLink: () => Promise<void>;
  copied: boolean;
  setRankings: React.Dispatch<React.SetStateAction<Record<Player, string[] | null>>>;
  rankings: Record<Player, string[] | null>;
  movies: string[];
  id: string;
};

export const Ranking = ({
  player,
  setPlayer,
  copyLink,
  copied,
  setRankings,
  rankings,
  movies,
  id,
}: Props) => {
  const { currentRanking, move } = useRankingViewModel({ rankings, player, movies, setRankings });

  return (
    <main className="app-shell">
      <Header id={id} onCopy={copyLink} copied={copied} />
      <section className="card">
        <PlayerToggle player={player} setPlayer={setPlayer} />
        <p className="eyebrow">Rank your picks</p>
        <h1>What sounds best?</h1>
        <p className="subcopy">
          Move movies into your personal order. Your list stays secret until you both finish.
        </p>
        <div className="ranking">
          {currentRanking.map((movie, index) => (
            <div className="rank-row" key={movie}>
              <b>{index + 1}</b>
              <span>{movie}</span>
              <button aria-label={`Move ${movie} up`} onClick={() => move(index, -1)}>
                ↑
              </button>
              <button aria-label={`Move ${movie} down`} onClick={() => move(index, 1)}>
                ↓
              </button>
            </div>
          ))}
        </div>
        <button
          className="button primary"
          onClick={() => setRankings((previous) => ({ ...previous, [player]: currentRanking }))}
        >
          {rankings[player] ? "Update ranking" : "Lock in my ranking"} <span>→</span>
        </button>
        {rankings[player] && (
          <p className="waiting">Your ranking is in. Waiting for the other person…</p>
        )}
      </section>
    </main>
  );
};
