ARG NODE_VERSION=23.9

ARG SOURCE_COMMIT
ARG BUILD_DATE

FROM node:${NODE_VERSION}-slim AS base

WORKDIR /app

FROM base AS pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM pnpm AS api-builder
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

FROM pnpm AS spa-builder
WORKDIR /app/frontend
COPY frontend ./
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM node:${NODE_VERSION}-alpine

LABEL org.opencontainers.image.title="Stash"
LABEL org.opencontainers.image.description="Self-hosted Wallpaper Storage"
LABEL org.opencontainers.image.authors="Davi Senra <davi.senra98@gmail.com>"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.source="https://github.com/davisenra/stash"
LABEL org.opencontainers.image.revision="$SOURCE_COMMIT"
LABEL org.opencontainers.image.created="$BUILD_DATE"

ENV NODE_ENV=production
COPY --from=api-builder /app/node_modules /app/node_modules
COPY --from=spa-builder /app/frontend/dist /app/dist
COPY src/ /app/src
EXPOSE 3000

CMD [ "node", "/app/src/index.js" ]