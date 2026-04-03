# hrApp Backend

Express API for the HR App backed by PostgreSQL and Sequelize.

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
- `DB_SYNC`
- `DB_SSL`
- `DB_LOG_SQL`
- `JSON_BODY_LIMIT`

## Scripts

```bash
npm ci
npm run dev
npm start
npm run check
npm run db:seed
npm run db:seed:reset
```

## Seed Data

`db.json` stores seed data for local PostgreSQL seeding. It is validated by
`npm run check` and loaded into the database by `npm run db:seed`.

## Supabase Notes

If you want to reuse an existing Supabase project without mixing tables with
another app, set `DB_SCHEMA=hr_app` and keep this project's tables in that
schema instead of `public`.

## Deployment Notes

- Set `CORS_ORIGIN` to a comma-separated list of trusted frontend origins.
- Keep `DB_SYNC=false` in deployed environments after the schema has been created.
- Use `DB_SYNC=true` only for local bootstrap or an intentional one-off schema sync.
