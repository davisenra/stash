# Stage 1: Build the Node.js API
ARG NODE_VERSION=23.9

FROM node:${NODE_VERSION}-slim AS base

WORKDIR /app

FROM base AS api-builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

FROM base

ENV NODE_ENV production

COPY --from=api-builder /app/node_modules /app/node_modules
COPY src/ /app/src

EXPOSE 3000

CMD node /app/src/index.js