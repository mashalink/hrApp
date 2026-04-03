# hrApp Frontend

React + Vite single-page application for the HR App employee directory.

Deployment role:

- deployed to Render as a static site
- talks only to the backend API
- does not connect to Supabase directly

## Scripts

```bash
npm ci
npm run dev
npm run lint
npm run build
```

## Environment

Use `VITE_API_URL` to point the app to a different backend during local
development.

For deployment, `VITE_API_URL` should point to the separate Render backend
service, for example:

```bash
VITE_API_URL=https://your-backend.onrender.com
```

Repository-level tooling and CI are documented in the root `README.md`.
