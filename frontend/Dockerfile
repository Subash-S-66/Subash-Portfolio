### Frontend Dockerfile (multi-stage)
# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy repo files (build context should be repository root)
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund
COPY . .

# Ensure local bin scripts are executable (fixes 'vite: Permission denied' in some builders)
RUN if [ -d "node_modules/.bin" ]; then chmod -R a+rx node_modules/.bin || true; fi

# Allow passing VITE_API_BASE at build-time: `--build-arg VITE_API_BASE=https://api.example.com`
ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}

# Build frontend (Vite root is ./frontend)
# Run the locally installed Vite binary directly to avoid `npm exec`/npx auto-install behavior
# Use node to execute the vite CLI from node_modules
RUN if [ -f node_modules/vite/bin/vite.js ]; then \
			node node_modules/vite/bin/vite.js build; \
		else \
			echo "Vite binary not found; attempting to install vite and retry" && npm install vite --no-audit --no-fund && node node_modules/vite/bin/vite.js build; \
		fi

# Production stage: nginx to serve built files
FROM nginx:alpine
COPY --from=build /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
