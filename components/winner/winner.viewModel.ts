type Props = {
  bothRanked: boolean;
  movies: string[];
  rankings: Record<"you" | "them", string[] | null>;
};

export const useWinnerViewModel = ({ bothRanked, movies, rankings }: Props) => {
  const pointsFor = (ranking: string[], movie: string) => {
    const position = ranking.indexOf(movie);
    return position === -1 ? 0 : movies.length - position;
  };

  const scores = bothRanked
    ? movies
        .map((movie) => ({
          movie,
          score: pointsFor(rankings.you!, movie) + pointsFor(rankings.them!, movie),
        }))
        .sort((a, b) => b.score - a.score)
    : [];

  return {
    scores,
  };
};
