# Movie Night

A lightweight two-person movie picker. Each person enters three ideas, ranks the combined list, and the lowest combined score wins.

## Run it locally

Install a current Node.js LTS release, then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and use the generated session link.

## Current starter

The first version is a complete interactive front-end prototype. It is deliberately local-only: switching between **You** and **Them** simulates the two people in one browser. This makes the decision flow and UI easy to validate before introducing a backend.

## Make it shared

The next implementation milestone is replacing the component state in `app/session/[id]/page.tsx` with a Firestore session document. Keep the session fields from `proposal.md` (`status`, each player’s movies and rankings, and `winner`), subscribe with `onSnapshot`, and save each action with `setDoc`/`updateDoc`. At that point the link will synchronize on two devices in real time.

For deployment, add Firebase’s public configuration values to `.env.local`, configure Firestore security rules for session IDs, then deploy the Next app to Vercel.
