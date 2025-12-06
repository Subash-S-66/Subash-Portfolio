### --------- FRONTEND BUILD STAGE ---------
FROM node:18-alpine AS build
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
RUN cd frontend && npm ci --no-audit --no-fund

# Build frontend
RUN cd frontend && npm run build


### --------- BACKEND RUNTIME STAGE ---------
FROM node:18-alpine AS runtime
WORKDIR /app/backend

# Install backend deps
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --production --no-audit --no-fund

# Copy backend code
COPY backend/ .

# Copy built frontend from correct path
COPY --from=build /src/frontend/dist ./dist

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
