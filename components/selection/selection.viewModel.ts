import { Player } from "../../app/types/player";

type Props = {
  setDraftPicks: React.Dispatch<React.SetStateAction<Record<Player, string[]>>>;
  player: Player;
};

export const useSelectionViewModel = ({ setDraftPicks, player }: Props) => {
  function updatePick(index: number, value: string) {
    setDraftPicks((previous) => ({
      ...previous,
      [player]: previous[player].map((pick, i) => (i === index ? value : pick)),
    }));
  }

  return {
    updatePick,
  };
};
