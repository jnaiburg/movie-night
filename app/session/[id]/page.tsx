"use client";

import { Winner } from "../../../components/winner/winner";
import { Ranking } from "../../../components/ranking/ranking";
import { Selection } from "../../../components/selection/selection";
import { useSessionPageViewModel } from "../../../components/useSessionPageViewModel";

export default function SessionPage() {
  const {
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
  } = useSessionPageViewModel();

  if (syncError)
    return (
      <main className="app-shell">
        <section className="card">
          <p className="eyebrow">Shared session unavailable</p>
          <h1>Could not sync this movie night.</h1>
          <p className="subcopy">{syncError}</p>
        </section>
      </main>
    );

  if (loading)
    return (
      <main className="app-shell">
        <section className="card">
          <p className="subcopy">Loading shared movie night…</p>
        </section>
      </main>
    );

  if (bothRanked)
    return (
      <Winner
        id={id}
        copyLink={copyLink}
        copied={copied}
        copyError={copyError}
        resetSession={resetSession}
        bothRanked={bothRanked}
        movies={movies}
        rankings={rankings}
      />
    );

  if (ready)
    return (
      <Ranking
        id={id}
        player={player}
        setPlayer={setPlayer}
        copyLink={copyLink}
        copied={copied}
        copyError={copyError}
        rankings={rankings}
        draftRankings={draftRankings}
        setDraftRankings={setDraftRankings}
        submitRanking={submitRanking}
        onDraftChange={markRankingsDirty}
        names={names}
        movies={movies}
      />
    );

  return (
    <Selection
      player={player}
      setPlayer={setPlayer}
      copyLink={copyLink}
      copied={copied}
      copyError={copyError}
      id={id}
      picks={picks}
      draftPicks={draftPicks}
      setDraftPicks={setDraftPicks}
      submitPicks={submitPicks}
      onDraftChange={markPicksDirty}
      names={names}
    />
  );
}
