## Multi-stage Dockerfile for Pulga Shop frontend
# Build stage
FROM node:20 AS build

WORKDIR /app

# Install deps (install all dev deps so the Vite/typescript build works)
COPY package*.json ./
RUN npm ci

# Copy sources and build
COPY . .
RUN npm run build

# Runtime stage: serve static build on port 3000 using `serve`
FROM node:20-alpine

WORKDIR /app

# lightweight static server
RUN npm install -g serve@14.1.2

# Copy built files
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
