### Multi-stage Dockerfile: build frontend then run backend in same container
## Build stage (install deps at root and build frontend)
FROM node:18-alpine AS builder
# Use /src as build path (matches many build environments)
WORKDIR /src

# Copy root package files. We'll install project-level deps if needed.
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# Copy frontend source into /src/frontend
COPY frontend ./frontend

# Allow passing API base at build time
ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}

# Move into frontend and install frontend-specific dependencies (ensures vite is present in frontend/node_modules)
WORKDIR /src/frontend
RUN npm ci --no-audit --no-fund

# Ensure local bin scripts are executable and run Vite from the frontend node_modules
RUN if [ -d "node_modules/.bin" ]; then chmod -R a+rx node_modules/.bin || true; fi
RUN node node_modules/vite/bin/vite.js build

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
