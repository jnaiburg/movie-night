import { Player } from "../../app/types/player";
import { Header } from "../header";
import { PlayerToggle } from "../playerToggle";
import { useSelectionViewModel } from "./selection.viewModel";

type Props = {
  player: Player;
  setPlayer: (player: Player) => void;
  copyLink: () => void;
  copied: boolean;
  id: string;
  picks: Record<Player, string[]>;
  draftPicks: Record<Player, string[]>;
  setDraftPicks: React.Dispatch<React.SetStateAction<Record<Player, string[]>>>;
  submitPicks: () => void;
  names: Record<Player, string>;
};

export const Selection = ({
  player,
  setPlayer,
  copyLink,
  copied,
  id,
  picks,
  draftPicks,
  setDraftPicks,
  submitPicks,
  names,
}: Props) => {
  const { updatePick } = useSelectionViewModel({ setDraftPicks, player });
  return (
    <main className="app-shell">
      <Header id={id} onCopy={copyLink} copied={copied} />
      <section className="card">
        <PlayerToggle player={player} setPlayer={setPlayer} names={names} />
        <p className="eyebrow">Round one of two</p>
        <h1>Pick three movies.</h1>
        <p className="subcopy">
          No overthinking—just three things you'd be excited to watch tonight.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitPicks();
          }}
        >
          <div className="pick-list">
            {draftPicks[player].map((pick, index) => (
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
          <button className="button primary pick-submit" type="submit">
            {picks[player].every(Boolean) ? "Update my picks" : "Submit my picks"} <span>→</span>
          </button>
        </form>
        <p className="hint">
          {picks.you.every(Boolean) && !picks.them.every(Boolean)
            ? `Your picks are in—hand it over to ${names[Player.THEM]}.`
            : `Both ${names[Player.YOU]} and ${names[Player.THEM]} add their picks, then the ranking begins.`}
        </p>
      </section>
    </main>
  );
};
