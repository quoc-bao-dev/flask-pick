# ============================================
# Stage 1: Install dependencies only
# ============================================
FROM node:22-alpine AS deps

RUN apk add --no-cache libc6-compat

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy only lockfile + package.json for better layer caching
COPY package.json pnpm-lock.yaml ./

# Frozen lockfile = deterministic install, no lockfile changes
RUN pnpm install --frozen-lockfile --ignore-scripts

# ============================================
# Stage 2: Build the application
# ============================================
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application (output: 'standalone' in next.config.ts)
RUN pnpm build

# ============================================
# Stage 3: Production runner (minimal image)
# ============================================
FROM node:22-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only the files needed to run the app
# 1. Public assets
COPY --from=builder /app/public ./public

# 2. Standalone server + node_modules (auto-traced by Next.js)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# 3. Static assets (JS/CSS bundles)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the standalone server
CMD ["node", "server.js"]
