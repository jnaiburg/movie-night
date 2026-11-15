import { useEffect, useMemo, useRef, useState } from "react";
import { Player } from "../app/types/player";
import { Picks, Rankings } from "../app/types/rankings";
import { createEmptySessionData, subscribeToSession, updateSession } from "../lib/sessionStore";

function copyWithExecCommand(text: string): boolean {
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);

  try {
    input.select();
    return document.execCommand("copy");
  } finally {
    input.remove();
  }
}

export const useSessionPageViewModel = () => {
  const [id] = useState(() => {
    if (typeof window === "undefined") return "MOVIE";
    return window.location.pathname.split("/").pop()?.toUpperCase() ?? "MOVIE";
  });
  const [names] = useState<Record<Player, string>>(() => {
    if (typeof window === "undefined") {
      return { [Player.YOU]: "You", [Player.THEM]: "Them" };
    }

    const params = new URLSearchParams(window.location.search);

    return {
      [Player.YOU]: params.get("you")?.trim() || "You",
      [Player.THEM]: params.get("them")?.trim() || "Them",
    };
  });
  const [player, setPlayer] = useState<Player>(Player.YOU);
  const [draftPicks, setDraftPicks] = useState<Picks>({ you: ["", "", ""], them: ["", "", ""] });
  const [picks, setPicks] = useState<Picks>({ you: ["", "", ""], them: ["", "", ""] });
  const [draftRankings, setDraftRankings] = useState<Rankings>({ you: null, them: null });
  const [rankings, setRankings] = useState<Rankings>({ you: null, them: null });
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const dirtyPicks = useRef<Record<Player, boolean>>({ you: false, them: false });
  const dirtyRankings = useRef<Record<Player, boolean>>({ you: false, them: false });

  useEffect(() => {
    let active = true;
    let unsubscribe = () => {};

    function handleError(error: Error) {
      if (!active) return;
      setSyncError(error.message);
      setLoading(false);
    }

    try {
      unsubscribe = subscribeToSession(
        id,
        (data) => {
          if (!active) return;
          setPicks(data.picks);
          setRankings(data.rankings);
          setDraftPicks((previous) => ({
            you: dirtyPicks.current.you ? previous.you : data.picks.you,
            them: dirtyPicks.current.them ? previous.them : data.picks.them,
          }));
          setDraftRankings((previous) => ({
            you: dirtyRankings.current.you ? previous.you : data.rankings.you,
            them: dirtyRankings.current.them ? previous.them : data.rankings.them,
          }));
          setLoading(false);
          setSyncError(null);
        },
        handleError,
      );
    } catch (error) {
      handleError(error instanceof Error ? error : new Error(String(error)));
    }

    return () => {
      active = false;
      unsubscribe();
    };
  }, [id]);

  async function persistSession(update: Parameters<typeof updateSession>[1]) {
    setSyncError(null);
    try {
      await updateSession(id, update);
      return true;
    } catch (error) {
      setSyncError(error instanceof Error ? error.message : String(error));
      return false;
    }
  }

  const ready = picks.you.every(Boolean) && picks.them.every(Boolean);

  const movies = useMemo(
    () => [...picks.you, ...picks.them].map((m) => m.trim()).filter(Boolean),
    [picks],
  );

  async function submitPicks() {
    const submittedPicks = [...draftPicks[player]];
    const saved = await persistSession((data) => ({
      ...data,
      picks: { ...data.picks, [player]: submittedPicks },
    }));
    if (saved) dirtyPicks.current[player] = false;
  }

  async function submitRanking(ranking: string[]) {
    const submittedRanking = [...ranking];
    const saved = await persistSession((data) => ({
      ...data,
      rankings: { ...data.rankings, [player]: submittedRanking },
    }));
    if (saved) dirtyRankings.current[player] = false;
  }

  function markPicksDirty() {
    dirtyPicks.current[player] = true;
  }

  function markRankingsDirty() {
    dirtyRankings.current[player] = true;
  }

  async function resetSession() {
    dirtyPicks.current = { you: false, them: false };
    dirtyRankings.current = { you: false, them: false };
    await persistSession(() => createEmptySessionData());
  }

  const bothRanked = !!rankings.you && !!rankings.them;

  async function copyLink() {
    const link = location.href;
    let copyFailure: unknown;
    let didCopy = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(link);
        didCopy = true;
      } catch (error) {
        copyFailure = error;
      }

      if (didCopy) {
        setCopyError(null);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
        return;
      }
    }

    try {
      didCopy = copyWithExecCommand(link);

      if (!didCopy) {
        setCopyError(
          copyFailure instanceof Error
            ? `Couldn't copy the link: ${copyFailure.message}`
            : "This browser couldn't copy the link.",
        );
        setCopied(false);
        return;
      }
    } catch (error) {
      setCopyError(
        error instanceof Error
          ? `Couldn't copy the link: ${error.message}`
          : "This browser couldn't copy the link.",
      );
      setCopied(false);
      return;
    }

    setCopyError(null);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return {
    id,
    names,
    player,
    setPlayer,
    picks,
    draftPicks,
    setDraftPicks,
    submitPicks,
    rankings,
    draftRankings,
    setDraftRankings,
    copied,
    copyError,
    loading,
    syncError,
    ready,
    movies,
    bothRanked,
    copyLink,
    submitRanking,
    resetSession,
    markPicksDirty,
    markRankingsDirty,
  };
};
