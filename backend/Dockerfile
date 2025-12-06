### Multi-stage Dockerfile: build frontend then run backend in same container
## Build stage (install deps at root and build frontend)
FROM node:18-alpine AS builder
WORKDIR /app

# Copy root package files and install dependencies (includes dev deps needed for Vite)
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# Copy frontend source
COPY frontend ./frontend

# Allow passing API base at build time
ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}

# Ensure bin scripts are executable and run Vite from the installed binary
WORKDIR /app/frontend
RUN if [ -d "/app/node_modules/.bin" ]; then chmod -R a+rx /app/node_modules/.bin || true; fi
RUN node /app/node_modules/vite/bin/vite.js build

## Runtime stage (backend)
FROM node:18-alpine AS runtime
WORKDIR /app/backend

# Copy backend package files and install production dependencies
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --production --no-audit --no-fund

# Copy backend source
COPY backend/ ./

# Copy built frontend into backend so server can serve static files
COPY --from=builder /app/frontend/dist ./dist

# Expose port and run
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
