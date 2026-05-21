# Jira Clone

Full-stack playground for a Jira-style app: **Hono** REST API with **OpenAPI** docs, **Drizzle ORM**, and a **React (Vite)** SPA using **TanStack Router**, **TanStack Query**, and **Tailwind**.

The API is wired to the SPA via **typed Hono RPC** (`hono/client` + shared `AppType`).

---

## Repository layout

| Path | Purpose |
| --- | --- |
| [`server/`](./server/) | HTTP API (`@hono/node-server`), routes, Drizzle schemas, migrations |
| [`client/`](./client/) | Vite + React SPA (port **3001** by default) |
| [`shared/`](./shared/) | Thin re-export of [`AppType`](./server/app.ts) for client imports |

This repo uses **two** Node projects: dependencies are installed separately at the **root** (API) and under **`client/`** (SPA).

---

## Quick start

### 1. Environment (API root)

Copy the example env and edit if needed:

```sh
cp .env.example .env
```

| Variable | Notes |
| --- | --- |
| `DATABASE_URL` | Dev default `file:dev.db` (relative to project root once pushed) |
| `DATABASE_AUTH_TOKEN` | Optional in development; required when `NODE_ENV=production` |
| `PORT` | API listens here (default **9999**) |
| `LOG_LEVEL` | Pino levels: `fatal` … `trace`, or `silent` |

### 2. Install dependencies

```sh
# API (repository root)
bun install
# or: npm install / pnpm install

# SPA
cd client && bun install
```

### 3. Database schema

From the repository root ([`drizzle.config.ts`](./drizzle.config.ts) loads [`server/env.ts`](./server/env.ts)):

```sh
bun run drizzle:push
# or: npm run drizzle:push
```

Other Drizzle helpers: `drizzle:generate`, `drizzle:migrate`, `drizzle:studio`.

### 4. Run in development

You need **two** processes:

```sh
# Terminal 1 — API (default http://localhost:9999)
bun dev
```

```sh
# Terminal 2 — SPA (default http://localhost:3001)
cd client && bun dev
```

The client RPC client is aimed at **`http://localhost:9999/`** (see [`client/src/lib/api.ts`](./client/src/lib/api.ts)).

---

## Scripts (repository root)

| Script | Command |
| --- | --- |
| Dev server | `bun dev` |
| Production build | `bun run build` then `bun run start` |
| Typecheck | `bun run typecheck` |
| Lint API | `bun run lint:server` |
| Lint SPA | `bun run lint:client` |
| Tests | `bun run test` |

Client-only: `cd client && bun run build` · `bun run typecheck`.

---

## API surface

Interactive docs (**Scalar**) and the OpenAPI JSON live on the API process:

| URL | Description |
| --- | --- |
| `/doc` | OpenAPI 3.0 JSON |
| `/reference` | Scalar UI |

Representative endpoints (tasks + auth evolve with the app):

| Method & path | Description |
| --- | --- |
| `GET /tasks` | List tasks |
| `POST /tasks` | Create task |
| `GET /tasks/:id` | Get task |
| `PATCH /tasks/:id` | Update task |
| `DELETE /tasks/:id` | Delete task |
| `POST /auth/sign-up` | Register (duplicate email → **409** with `{ message }`) |
| `POST /auth/sign-in` | Sign in |

---

## Code tour

- **App & types**: [`server/app.ts`](./server/app.ts) composes routers and exports `AppType` for the client RPC client.
- **Env validation**: [`server/env.ts`](./server/env.ts) — failing validation exits before the server binds.
- **Route pattern**: Example group under [`server/routes/tasks/`](./server/routes/tasks/) — `.routes.ts` (OpenAPI + Zod), `.handlers.ts` (logic), `.index.ts` (wire-up). Auth mirrors this under [`server/routes/auth/`](./server/routes/auth/).
- **Client aliases**: `@/` → `client/src`, `~/` → `server` (see [`client/vite.config.ts`](./client/vite.config.ts)).

---

## Acknowledgements

Starter patterns and toolchain ideas trace back to the [hono-open-api-starter](https://github.com/w3cj/hono-open-api-starter) ecosystem (**Hono**, **@hono/zod-openapi**, **Scalar**, **Stoker**, **Drizzle**).

Further reading:

- [Hono](https://hono.dev/) · [Zod OpenAPI middleware](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- [OpenAPI overview](https://swagger.io/docs/specification/v3_0/about/)
- [TanStack Router](https://tanstack.com/router/latest) · [TanStack Query](https://tanstack.com/query/latest)
- [Scalar for Hono](https://github.com/scalar/scalar/tree/main/packages/hono-api-reference)
- [Drizzle ORM](https://orm.drizzle.team/docs/overview)
