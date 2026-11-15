import { Player } from "../../app/types/player";

type Props = {
  rankings: Record<Player, string[] | null>;
  player: Player;
  movies: string[];
  setRankings: React.Dispatch<React.SetStateAction<Record<Player, string[] | null>>>;
  onDraftChange: () => void;
};

export const useRankingViewModel = ({
  rankings,
  player,
  movies,
  setRankings,
  onDraftChange,
}: Props) => {
  const currentRanking = rankings[player] ?? movies;

  function move(index: number, direction: -1 | 1) {
    const next = [...currentRanking];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onDraftChange();
    setRankings((previous) => ({ ...previous, [player]: next }));
  }

  return {
    currentRanking,
    move,
  };
};
