export const Player = {
  YOU: "you",
  THEM: "them",
} as const;

export type Player = (typeof Player)[keyof typeof Player];