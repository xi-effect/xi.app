FROM node:18-alpine AS base

FROM base AS pruner
ARG APP_NAME=xi.front

# Install system-level components
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Prune everything but xi.front
RUN turbo prune --scope=${APP_NAME} --docker

FROM base AS builder
ARG APP_NAME=xi.front

# Install system-level components
RUN apk add --no-cache libc6-compat openssh-client git
RUN npm install -g npm@9.1.2

# Set working directory
WORKDIR /app

# Install all dependencies
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm install

# Build the project
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN npm run build --filter=${APP_NAME}...

FROM base AS runner
ARG APP_NAME=xi.front

# Install system-level components
RUN apk add --no-cache libc6-compat openssh-client git
RUN npm install -g npm@9.1.2

# Set working directory
WORKDIR /app

# Setting up users to avoid using root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copying config files
COPY --from=builder /app/apps/${APP_NAME}/next.config.js ./
COPY --from=builder /app/apps/${APP_NAME}/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

# COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/public/ public/
# COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/public/* /app/.next/sw.js* /app/.next/worker-*.js /app/.next/workbox-*.js /app/.next/fallback-*.js ./public/
# COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/styles styles/

# Expose the listening port
EXPOSE 3000

CMD ["node", "apps/xi.front/server.js"]
