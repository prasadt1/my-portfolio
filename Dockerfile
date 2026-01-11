# Stage 1: Build the React application
FROM node:20-alpine as builder

WORKDIR /app

# Accept API Key as build argument
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

# Copy root package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the frontend
RUN echo "VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY" > .env
RUN npm run build

# Stage 2: Setup the server
FROM node:20-alpine

WORKDIR /app

# Copy server package files
# We need to create the directory first
RUN mkdir -p server
COPY server/package*.json ./server/

# Install server dependencies
WORKDIR /app/server
RUN npm ci --only=production

# Copy server source code
COPY server/ ./

# Copy built frontend assets from builder stage {root}/dist to {app}/dist
# Server is at {app}/server, so it looks for ../dist which resolves to {app}/dist
COPY --from=builder /app/dist ../dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "index.js"]
