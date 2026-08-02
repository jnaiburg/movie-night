"use client";

import { useMemo, useState } from "react";

type Player = "you" | "them";
type Picks = Record<Player, string[]>;
type Rankings = Record<Player, string[] | null>;

export default function SessionPage() {
  const [id] = useState(() => location.pathname.split("/").pop()?.toUpperCase() ?? "MOVIE");
  const [player, setPlayer] = useState<Player>("you");
  const [picks, setPicks] = useState<Picks>({ you: ["", "", ""], them: ["", "", ""] });
  const [rankings, setRankings] = useState<Rankings>({ you: null, them: null });
  const [copied, setCopied] = useState(false);
  const ready = picks.you.every(Boolean) && picks.them.every(Boolean);
  const movies = useMemo(
    () => [...picks.you, ...picks.them].map((m) => m.trim()).filter(Boolean),
    [picks],
  );
  const currentRanking = rankings[player] ?? movies;
  const bothRanked = rankings.you && rankings.them;
  const scores = bothRanked
    ? movies
        .map((movie) => ({
          movie,
          score: rankings.you!.indexOf(movie) + rankings.them!.indexOf(movie) + 2,
        }))
        .sort((a, b) => a.score - b.score)
    : [];

  function updatePick(index: number, value: string) {
    setPicks((previous) => ({
      ...previous,
      [player]: previous[player].map((pick, i) => (i === index ? value : pick)),
    }));
  }

  function move(index: number, direction: -1 | 1) {
    const next = [...currentRanking];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setRankings((previous) => ({ ...previous, [player]: next }));
  }

  async function copyLink() {
    await navigator.clipboard.writeText(location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  if (bothRanked)
    return (
      <main className="app-shell">
        <Header id={id} onCopy={copyLink} copied={copied} />
        <section className="card results">
          <p className="eyebrow">And the winner is…</p>
          <div className="trophy">✦</div>
          <h1>{scores[0].movie}</h1>
          <p className="lede">Tonight’s feature presentation. Excellent choice.</p>
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

  if (ready)
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

  return (
    <main className="app-shell">
      <Header id={id} onCopy={copyLink} copied={copied} />
      <section className="card">
        <PlayerToggle player={player} setPlayer={setPlayer} />
        <p className="eyebrow">Round one of two</p>
        <h1>Pick three movies.</h1>
        <p className="subcopy">
          No overthinking—just three things you’d be excited to watch tonight.
        </p>
        <div className="pick-list">
          {picks[player].map((pick, index) => (
            <label key={index}>
              <span>{index + 1}</span>
              <input
                value={pick}
                onChange={(event) => updatePick(index, event.target.value)}
                placeholder={["A cozy classic", "A crowd-pleaser", "Something unexpected"][index]}
              />
            </label>
          ))}
        </div>
        <p className="hint">
          {picks.you.every(Boolean) && !picks.them.every(Boolean)
            ? "Your picks are in—hand it over to them."
            : "Both of you add your picks, then the ranking begins."}
        </p>
      </section>
    </main>
  );
}

function Header({ id, onCopy, copied }: { id: string; onCopy: () => void; copied: boolean }) {
  return (
    <header>
      <a href="/">
        MOVIE NIGHT <i>✦</i>
      </a>
      <button className="share" onClick={onCopy}>
        {copied ? "Copied!" : `Share ${id}`}
      </button>
    </header>
  );
}
function PlayerToggle({
  player,
  setPlayer,
}: {
  player: Player;
  setPlayer: (player: Player) => void;
}) {
  return (
    <div className="toggle">
      <button className={player === "you" ? "active" : ""} onClick={() => setPlayer("you")}>
        You
      </button>
      <button className={player === "them" ? "active" : ""} onClick={() => setPlayer("them")}>
        Them
      </button>
    </div>
  );
}
