ARG NODE_VERSION=23.9

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

FROM base
ENV NODE_ENV=production
COPY --from=api-builder /app/node_modules /app/node_modules
COPY --from=spa-builder /app/frontend/dist /app/dist
COPY src/ /app/src
EXPOSE 3000

CMD [ "node", "/app/src/index.js" ]