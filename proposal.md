# Movie Night

## Overview

Movie Night is a simple web application that helps two people decide what movie to watch together.

Instead of texting movie suggestions back and forth or manually combining rankings, the app guides both users through a short workflow and automatically determines the best overall choice.

The goal is to create a fun, lightweight application that can be completed as a personal project while also serving as a way to learn Firebase and real-time data synchronization.

---

# Problem

Current process:

1. Each person picks 3 movies.
2. Each person ranks all 6 movies from favorite to least favorite.
3. Rankings are combined manually.
4. Highest ranked movie wins.

Although the process works well, it's repetitive and requires manually tracking rankings.

The app should make this process effortless.

---

# Goals

- Simple and intuitive user experience
- No user accounts required
- Shareable sessions via URL
- Real-time updates between both users
- Mobile-friendly design
- Lightweight and fast

---

# Non-Goals (v1)

- User authentication
- Long-term movie history
- Personalized recommendations
- Streaming provider integration
- Ratings/reviews
- Multi-user support (more than two people)

These can be explored in future versions if desired.

---

# User Flow

## 1. Create Session

One user creates a new movie night.

Example:

```
Create Session
```

A unique session ID is generated.

```
/session/ABC123
```

The link is shared with the second person.

---

## 2. Add Movies

Each user submits exactly three movie suggestions.

Example:

**Person A**

- Dune
- Arrival
- Knives Out

**Person B**

- Shrek
- The Prestige
- Up

Once both users have submitted their movies, the app advances automatically.

---

## 3. Rank Movies

The combined list of six movies is shown.

Each user independently ranks every movie from 1–6.

Possible UI ideas:

- Drag and drop list
- Number selector
- Click to reorder

Rankings remain hidden until both users finish.

---

## 4. Results

After both rankings are submitted:

- Rankings are combined
- Total score is calculated
- Winning movie is displayed

Each movie earns 6 points for a 1st-place ranking, 5 for 2nd, and so on down to 1 point for 6th. The movie with the highest combined score wins.

Example:

```
🏆 Tonight's Movie

Knives Out
```

Optionally show:

| Movie        | Total Score |
| ------------ | ----------: |
| Knives Out   |          12 |
| Dune         |          10 |
| Arrival      |           8 |
| Shrek        |           6 |
| Up           |           4 |
| The Prestige |           2 |

(Higher score wins.)

---

# Technology

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

Firebase

- Cloud Firestore
- Real-time listeners

No custom backend server.

Deployment:

- Vercel

---

# Firestore Data Model

## Session

```ts
{
  status: "addingMovies" | "ranking" | "complete",

  player1: {
    movies: string[],
    rankings: number[] | null
  },

  player2: {
    movies: string[],
    rankings: number[] | null
  },

  winner: string | null,

  createdAt: Timestamp
}
```

---

# Screens

## Home

- Create Session button

---

## Join Session

- Session automatically loads from URL

---

## Movie Entry

- Enter three movie titles
- Submit

---

## Ranking

- Display six movies
- Rank them in preferred order
- Submit

---

## Results

- Winning movie
- Final rankings
- Combined scores

Optional:

- Confetti animation
- "Start Another Movie Night"

---

# Stretch Goals

## Movie Posters

Use TMDb API to automatically display posters after users type a title.

---

## Search Instead of Typing

Autocomplete movie titles using TMDb.

---

## Previous Winners

Store completed movie nights locally.

---

## Tie Breaker

If two movies tie:

- Random wheel
- Coin flip
- Sudden death vote

---

## Movie Veto

Each user may veto one movie before rankings begin.

---

## Random Picker Mode

Skip ranking entirely.

Each user submits three movies and the app randomly chooses one.

---

## Theme Support

- Dark Mode
- Light Mode

---

# Future Ideas

- More than two players
- Streaming availability
- Letterboxd integration
- "Already Watched" filtering
- Favorite genres
- Movie statistics
- Seasonal themes (Halloween, Christmas, etc.)
- AI-generated movie recommendations based on both users' tastes

---

# Success Criteria

Version 1 is considered complete when:

- Two users can join the same session.
- Both users can submit three movies.
- Both users can rank all six movies.
- Rankings are synchronized in real time.
- The app correctly calculates the winner.
- The app works well on desktop and mobile.
- The application is deployed publicly.

---

# Why This Project?

This project is intentionally small in scope while still providing opportunities to learn:

- Firebase Firestore
- Real-time synchronization
- URL routing
- React state management
- Responsive UI design
- Full deployment workflow with Vercel

The end result is a useful application that solves a real problem while serving as an excellent portfolio project.
