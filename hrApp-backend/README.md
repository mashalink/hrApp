# hrApp Backend

Express API for the HR App backed by PostgreSQL and Sequelize.

Deployment role:

- runs as a separate Render web service
- connects to Supabase PostgreSQL through `DATABASE_URL`
- serves the frontend through HTTP API endpoints such as `/health` and `/employees`

## Environment

Copy the example env file and update the PostgreSQL connection string:

```bash
cp .env.example .env
```

Key variables:

- `PORT`
- `DATABASE_URL`
- `CORS_ORIGIN`
- `DB_SCHEMA`
- `DB_SSL`
- `DB_LOG_SQL`
- `JSON_BODY_LIMIT`

## Scripts

```bash
npm ci
npm run db:migrate
npm run db:migrate:status
npm run db:migrate:down
npm run dev
npm start
npm run check
npm run db:seed
```

## Seed Data

`db.json` stores seed data for local PostgreSQL seeding. It is validated by
`npm run check` and loaded into the database by `npm run db:seed`.

## Migrations

Run schema changes explicitly before seeding or starting a fresh environment:

```bash
npm run db:migrate
```

Use `npm run db:migrate:status` to see what has already run and what is still
pending.

## Supabase Notes

If you want to reuse an existing Supabase project without mixing tables with
another app, set `DB_SCHEMA=hr_app` and keep this project's tables in that
schema instead of `public`.

This backend uses Supabase only as a managed PostgreSQL provider. It does not
use Supabase Auth or call Supabase from the frontend directly.

## Deployment Notes

- Set `CORS_ORIGIN` to a comma-separated list of trusted frontend origins.
- Run `npm run db:migrate` as part of deployment before the app serves traffic.
- On Render, deploy this package as its own web service.
- Point `CORS_ORIGIN` to the frontend Render URL.
- Point `DATABASE_URL` to the Supabase Session Pooler connection string.
