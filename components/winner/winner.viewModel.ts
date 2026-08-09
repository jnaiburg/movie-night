type Props = {
  bothRanked: boolean;
  movies: string[];
  rankings: Record<"you" | "them", string[] | null>;
};

export const useWinnerViewModel = ({ bothRanked, movies, rankings }: Props) => {
  const scores = bothRanked
    ? movies
        .map((movie) => ({
          movie,
          score: rankings.you!.indexOf(movie) + rankings.them!.indexOf(movie) + 2,
        }))
        .sort((a, b) => a.score - b.score)
    : [];

  return {
    scores,
  };
};
