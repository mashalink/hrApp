# HR App

A simple educational application for managing employees.

The repository is split into two deployable parts:

- **hrApp-frontend/** — React (Vite) frontend
- **hrApp-backend/** — Express API powered by PostgreSQL and Sequelize

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

- Express
- Sequelize
- PostgreSQL
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
│   ├── src/
│   ├── scripts/
│   ├── db.json
│   └── .env.example
└── README.md
```

## API Endpoints

- `GET /employees`
- `POST /employees`
- `PATCH /employees/:id`
- `GET /health`

## Running Locally

Install dependencies once per package:

```bash
npm ci
npm --prefix hrApp-frontend ci
npm --prefix hrApp-backend ci
```

Create backend env from the example:

```bash
cp hrApp-backend/.env.example hrApp-backend/.env
```

Update `DATABASE_URL` in `hrApp-backend/.env` to your PostgreSQL instance.

Seed PostgreSQL from the current sample dataset when needed:

```bash
npm --prefix hrApp-backend run db:seed
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

Recommended backend environment variables:

```bash
CORS_ORIGIN=http://localhost:5173,https://your-frontend.onrender.com
DB_SYNC=false
DB_SSL=true
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
- `hrApp-backend/db.json` is now seed data for PostgreSQL, not the runtime database.
- The backend bootstraps the database schema through Sequelize on startup when
  `DB_SYNC=true`.
- The backend CORS policy is configurable through `CORS_ORIGIN`.
- CI runs formatting, frontend lint/build and backend seed-data validation on pull
  requests and pushes to `main`.
