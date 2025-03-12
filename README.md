## Stash

**What is Stash?**

`WIP`

**Features:**

- Wallpaper storage
- Filter wallpapers by resolution
- Authentication

**Road Map:**

- Tags
- Filter by colors, ratio, tags...
- Backups
- Reset Password

**Spinning up an instance**

- Requirements:

  - Docker

- Instructions:
  - Pull the latest Docker Image:
  - `docker pull ghcr.io/davisenra/stash:v0.1.0`
  - Spin up a Container
  - `docker run -p 3000:3000 ghcr.io/davisenra/stash:v0.1.0`
  - TODO: Mention required volumes, Sqlite database, required envs, provide a docker-compose example, etc

## Development

**Stack**:

- Web API (Node.js API server powered by Fastify)
- Frontend SPA (Vue.js)
- Storage (good old filesystem + Sqlite3)

**Requirements**:

- Node.js v22 or newer
- PNPM (corepack enable)

## **Instructions**:

- Web API:
  - `cd stash`
  - `pnpm install`
  - `pnpm dev`
  - Voilà
- Frontend:
  - `cd stash/frontend`
  - `pnpm install`
  - `pnpm dev`
  - Voilà
