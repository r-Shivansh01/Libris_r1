# ── Stage 1: Build ────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker layer caching.
# If package.json hasn't changed, npm ci is skipped on rebuild.
COPY package*.json ./

# npm ci is used instead of npm install because it is:
# - Deterministic (uses package-lock.json exactly)
# - Faster in CI environments
# - Removes node_modules before install for a clean state
RUN npm ci

COPY src/ ./src/

# ── Stage 2: Production ───────────────────────────────────────
FROM node:18-alpine AS production

# Set NODE_ENV to production — disables dev error verbosity
ENV NODE_ENV=production

WORKDIR /app

# Copy only production dependencies from builder
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source from builder stage
COPY --from=builder /app/src ./src

# Create a non-root user for security best practice
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

# Health check — Docker will mark the container unhealthy if this fails
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "src/server.js"]
