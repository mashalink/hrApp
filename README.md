# HR App

A simple educational application for managing employees.

The repository is split into two deployable parts:

- **hrApp-frontend/** — React (Vite) frontend
- **hrApp-backend/** — API powered by `json-server`

## Deployments

### Frontend

Static site on Render:
https://hrappsite.onrender.com/

### Backend

API on Render:
https://hrapp-ovc7.onrender.com/employees

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Material UI
- ESLint

### Backend

- `json-server`
- Node.js

## Quality Baseline

- Prettier for consistent formatting
- EditorConfig for shared editor defaults
- ESLint for frontend code quality
- GitHub Actions CI with `concurrency` and explicit `timeout-minutes`

## Features

- View employee list
- Add new employees
- Edit employee details
- Probation and anniversary reminders

## Project Structure

```text
hrApp/
├── .github/workflows/ci.yml
├── package.json
├── hrApp-frontend/
│   ├── src/
│   └── README.md
├── hrApp-backend/
│   ├── db.json
│   └── scripts/check-db.js
└── README.md
```

## API Endpoints

- `GET /employees`
- `POST /employees`
- `PATCH /employees/:id`

## Running Locally

Install dependencies once per package:

```bash
npm ci
npm --prefix hrApp-frontend ci
npm --prefix hrApp-backend ci
```

Start the backend:

```bash
cd hrApp-backend
npm start
```

Start the frontend:

```bash
cd hrApp-frontend
npm run dev
```

Optional frontend environment override:

```bash
VITE_API_URL=http://localhost:3001
```

## Quality Commands

Run repository-wide checks from the project root:

```bash
npm run format
npm run format:check
npm run lint
npm run build
npm run check:backend
npm run check
```

## Notes

- The frontend uses `VITE_API_URL` when it is set.
- Without `VITE_API_URL`, development uses `http://localhost:3001` and production
  uses the Render backend.
- CI runs formatting, frontend lint/build and backend data validation on pull
  requests and pushes to `main`.
