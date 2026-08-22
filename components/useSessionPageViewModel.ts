import { useMemo, useState } from "react";
import { Player } from "../app/types/player";
import { Picks, Rankings } from "../app/types/rankings";

export const useSessionPageViewModel = () => {
  const [id] = useState(() => {
    if (typeof window === "undefined") return "MOVIE";
    return window.location.pathname.split("/").pop()?.toUpperCase() ?? "MOVIE";
  });
  const [player, setPlayer] = useState<Player>(Player.YOU);
  const [draftPicks, setDraftPicks] = useState<Picks>({ you: ["", "", ""], them: ["", "", ""] });
  const [picks, setPicks] = useState<Picks>({ you: ["", "", ""], them: ["", "", ""] });
  const [draftRankings, setDraftRankings] = useState<Rankings>({ you: null, them: null });
  const [rankings, setRankings] = useState<Rankings>({ you: null, them: null });
  const [copied, setCopied] = useState(false);

  const ready = picks.you.every(Boolean) && picks.them.every(Boolean);

  const movies = useMemo(
    () => [...picks.you, ...picks.them].map((m) => m.trim()).filter(Boolean),
    [picks],
  );

  function submitPicks() {
    setPicks(draftPicks);
  }

  const bothRanked = !!rankings.you && !!rankings.them;

  async function copyLink() {
    await navigator.clipboard.writeText(location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return {
    id,
    player,
    setPlayer,
    picks,
    draftPicks,
    setDraftPicks,
    setPicks,
    submitPicks,
    rankings,
    setRankings,
    draftRankings,
    setDraftRankings,
    copied,
    ready,
    movies,
    bothRanked,
    copyLink,
  };
};
