### --------- FRONTEND BUILD STAGE ---------
FROM node:18-alpine AS builder
WORKDIR /src

# Copy root package files if needed
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# Copy frontend source
COPY frontend ./frontend

# Allow passing API base during build
ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}

# Install frontend dependencies
WORKDIR /src/frontend
RUN npm ci --no-audit --no-fund

# Make Vite executable and build
RUN if [ -d "node_modules/.bin" ]; then chmod -R a+rx node_modules/.bin || true; fi
RUN node node_modules/vite/bin/vite.js build


### --------- BACKEND RUNTIME STAGE ---------
FROM node:18-alpine AS runtime
WORKDIR /app/backend

# Install backend deps
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --production --no-audit --no-fund

# Copy backend code
COPY backend/ .

# Copy built frontend from correct path
COPY --from=builder /src/frontend/dist ./dist

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
