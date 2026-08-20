# Multi-stage Dockerfile for OCEAN BIRD Full-Stack React + Vite Platform
# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm ci

# Copy full application source code
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Runtime Production Image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy node modules and built application from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Expose port 3000 (hardcoded required port for ingress)
EXPOSE 3000

# Healthcheck for container liveness probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start production application server
CMD ["npm", "start"]
