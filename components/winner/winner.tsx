import { Picks, Rankings } from "../../app/types/rankings";
import { Header } from "../header";
import { useWinnerViewModel } from "./winner.viewModel";

type Props = {
  copyLink: () => void;
  copied: boolean;
  setRankings: React.Dispatch<React.SetStateAction<Rankings>>;
  setPicks: React.Dispatch<React.SetStateAction<Picks>>;
  bothRanked: boolean;
  movies: string[];
  rankings: Rankings;
  id: string;
};

export const Winner = ({
  copyLink,
  copied,
  setRankings,
  setPicks,
  bothRanked,
  movies,
  rankings,
  id,
}: Props) => {
  const { scores } = useWinnerViewModel({ bothRanked, movies, rankings });

  return (
    <main className="app-shell">
      <Header id={id} onCopy={copyLink} copied={copied} />
      <section className="card results">
        <p className="eyebrow">And the winner is…</p>
        <div className="trophy">✦</div>
        <h1>{scores[0].movie}</h1>
        <p className="lede">Tonight's feature presentation.</p>
        <div className="score-list">
          {scores.map((item, index) => (
            <div key={item.movie}>
              <span>{index + 1}</span>
              <strong>{item.movie}</strong>
              <small>{item.score} points</small>
            </div>
          ))}
        </div>
        <button
          className="button secondary"
          onClick={() => {
            setRankings({ you: null, them: null });
            setPicks({ you: ["", "", ""], them: ["", "", ""] });
          }}
        >
          Start over
        </button>
      </section>
    </main>
  );
};
