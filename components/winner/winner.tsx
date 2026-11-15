import { Rankings } from "../../app/types/rankings";
import { Header } from "../header";
import { useWinnerViewModel } from "./winner.viewModel";

type Props = {
  copyLink: () => Promise<void>;
  copied: boolean;
  copyError: string | null;
  resetSession: () => void;
  bothRanked: boolean;
  movies: string[];
  rankings: Rankings;
  id: string;
};

export const Winner = ({
  copyLink,
  copied,
  copyError,
  resetSession,
  bothRanked,
  movies,
  rankings,
  id,
}: Props) => {
  const { scores } = useWinnerViewModel({ bothRanked, movies, rankings });

  return (
    <main className="app-shell">
      <Header id={id} onCopy={copyLink} copied={copied} copyError={copyError} />
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
        <button className="button secondary" onClick={resetSession}>
          Start over
        </button>
      </section>
    </main>
  );
};
