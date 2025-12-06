FROM node:18-alpine

WORKDIR /app

# Copy root package files and install production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy the full repository (build context should be repository root)
COPY . .

WORKDIR /app/backend

ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
