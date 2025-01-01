FROM node:20-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app
COPY . .

RUN npm ci && \
    npm run build && \
    npm prune --production

FROM base AS runner
WORKDIR /app

RUN npm install serve -g

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 react
COPY --from=builder --chown=react:nodejs /app/dist /app/dist
COPY --from=builder --chown=react:nodejs /app/package.json /app/package.json

USER react
EXPOSE 3000

CMD ["serve", "/app/dist"]
