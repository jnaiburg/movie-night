"use client";

import { Winner } from "../../../components/winner/winner";
import { Ranking } from "../../../components/ranking/ranking";
import { Selection } from "../../../components/selection/selection";
import { useSessionPageViewModel } from "../../../components/useSessionPageViewModel";

export default function SessionPage() {
  const {
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
    copied,
    ready,
    movies,
    bothRanked,
    copyLink,
  } = useSessionPageViewModel();

  if (bothRanked)
    return (
      <Winner
        id={id}
        copyLink={copyLink}
        copied={copied}
        setRankings={setRankings}
        setPicks={setPicks}
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
        setRankings={setRankings}
        rankings={rankings}
        movies={movies}
      />
    );

  return (
    <Selection
      player={player}
      setPlayer={setPlayer}
      copyLink={copyLink}
      copied={copied}
      id={id}
      picks={picks}
      draftPicks={draftPicks}
      setDraftPicks={setDraftPicks}
      submitPicks={submitPicks}
    />
  );
}
