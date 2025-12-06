### --------- FRONTEND BUILD STAGE (use Debian!) ---------
FROM node:18 AS build
WORKDIR /src

# Copy root package if needed
COPY package.json package-lock.json* ./

RUN npm ci --no-audit --no-fund

# Copy frontend
COPY frontend ./frontend

# Build frontend
WORKDIR /src/frontend
RUN npm ci --no-audit --no-fund
RUN npm run build


### --------- BACKEND RUNTIME STAGE (Alpine OK) ---------
FROM node:18-alpine AS runtime
WORKDIR /app/backend

# Install backend deps
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --production --no-audit --no-fund

# Copy backend code
COPY backend/ .

# Copy frontend build output
# Prefer any pre-built frontend in the repository (committed `frontend/dist`) so
# deployments can use the exact built assets we tested locally. If no prebuilt
# artifacts are present in the repo, fall back to the build stage output.
COPY frontend/dist ./dist
# Fallback: overwrite with build stage output if the multi-stage build produced it
COPY --from=build /src/frontend/dist ./dist

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
