import { getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot, runTransaction, type Firestore } from "firebase/firestore";
import { Player } from "../app/types/player";
import { Picks, Rankings } from "../app/types/rankings";

export type SessionData = {
  picks: Picks;
  rankings: Rankings;
};

export function createEmptySessionData(): SessionData {
  return {
    picks: { [Player.YOU]: ["", "", ""], [Player.THEM]: ["", "", ""] },
    rankings: { [Player.YOU]: null, [Player.THEM]: null },
  };
}

function getFirestoreDatabase(): Firestore {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) {
    throw new Error(
      `Shared sessions are not configured. Set ${missing.join(", ")} in .env.local and restart the app.`,
    );
  }

  const app =
    getApps().find(({ name }) => name === "movie-night") ?? initializeApp(config, "movie-night");
  return getFirestore(app);
}

function parseMovieList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((movie): movie is string => typeof movie === "string");
}

function parsePicks(value: unknown): Picks {
  const saved = (value ?? {}) as Partial<Record<Player, unknown>>;
  const padPicks = (movies: unknown) => {
    const picks = parseMovieList(movies).slice(0, 3);
    return [...picks, ...Array(Math.max(0, 3 - picks.length)).fill("")];
  };

  return {
    [Player.YOU]: padPicks(saved[Player.YOU]),
    [Player.THEM]: padPicks(saved[Player.THEM]),
  };
}

function parseRankings(value: unknown): Rankings {
  const saved = (value ?? {}) as Partial<Record<Player, unknown>>;
  const parseRanking = (ranking: unknown) =>
    Array.isArray(ranking) ? parseMovieList(ranking) : null;

  return {
    [Player.YOU]: parseRanking(saved[Player.YOU]),
    [Player.THEM]: parseRanking(saved[Player.THEM]),
  };
}

function parseSessionData(value: Record<string, unknown>): SessionData {
  return {
    picks: parsePicks(value.picks),
    rankings: parseRankings(value.rankings),
  };
}

export function subscribeToSession(
  id: string,
  onData: (data: SessionData) => void,
  onError: (error: Error) => void,
) {
  const db = getFirestoreDatabase();
  const reference = doc(db, "sessions", id);

  return onSnapshot(
    reference,
    (snapshot) => {
      onData(snapshot.exists() ? parseSessionData(snapshot.data()) : createEmptySessionData());

      if (!snapshot.exists()) {
        void runTransaction(db, async (transaction) => {
          const current = await transaction.get(reference);
          if (!current.exists()) transaction.set(reference, createEmptySessionData());
        }).catch(onError);
      }
    },
    onError,
  );
}

export async function updateSession(
  id: string,
  update: (data: SessionData) => SessionData,
): Promise<void> {
  const db = getFirestoreDatabase();
  const reference = doc(db, "sessions", id);

  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(reference);
    const current = snapshot.exists()
      ? parseSessionData(snapshot.data())
      : createEmptySessionData();
    transaction.set(reference, update(current));
  });
}
