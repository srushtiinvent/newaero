# Frontend migration notes

The `frontend/` folder now contains the new React + TypeScript + Tailwind app
(Login/Signup/Forgot Password, Home, Add Trip, Boarding Pass, Help, Profile).

Your original vanilla HTML/CSS/JS login+dashboard page has been preserved,
untouched, in `frontend-legacy/` — nothing was deleted.

Backend (`backend/`), `README.md`, and `SETUP_GUIDE.md` are unchanged from
your existing repo.

To run the new frontend:
  cd frontend
  npm install
  npm run dev

Currently the new frontend runs on mock data (`src/data/mockData.ts`) —
it is not yet wired to your Express backend or Firebase auth. Those are
marked with `// TODO` comments in `src/screens/Auth.tsx` and
`src/screens/Help.tsx`.
