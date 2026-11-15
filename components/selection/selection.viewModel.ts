import { Player } from "../../app/types/player";

type Props = {
  setDraftPicks: React.Dispatch<React.SetStateAction<Record<Player, string[]>>>;
  player: Player;
  onDraftChange: () => void;
};

export const useSelectionViewModel = ({ setDraftPicks, player, onDraftChange }: Props) => {
  function updatePick(index: number, value: string) {
    onDraftChange();
    setDraftPicks((previous) => ({
      ...previous,
      [player]: previous[player].map((pick, i) => (i === index ? value : pick)),
    }));
  }

  return {
    updatePick,
  };
};
