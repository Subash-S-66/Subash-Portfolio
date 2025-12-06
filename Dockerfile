### --------- FRONTEND BUILD STAGE ---------
FROM node:18-alpine AS build
WORKDIR /src

# Copy root package files
COPY package.json ./
RUN npm install --no-audit --no-fund

# Copy frontend source
COPY frontend ./frontend

# Allow passing API base during build
ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}

# Build frontend
RUN cd frontend && node ../node_modules/vite/bin/vite.js build


### --------- BACKEND RUNTIME STAGE ---------
FROM node:18-alpine AS runtime
WORKDIR /app/backend

# Install backend deps (using root package.json since backend shares dependencies)
COPY package.json ./
RUN npm install --production --no-audit --no-fund

# Copy backend code
COPY backend/ .

# Copy built frontend from correct path
COPY --from=build /src/frontend/dist ./dist

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]