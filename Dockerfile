# Use Node.js 20
FROM node:20-slim

WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Accept build arguments
ARG DATABASE_URL
ARG OPENAI_API_KEY
ENV DATABASE_URL=$DATABASE_URL
ENV OPENAI_API_KEY=$OPENAI_API_KEY

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy application source
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --omit=dev

# Expose port (Cloud Run will set PORT=8080)
EXPOSE 8080

# Set host to listen on all interfaces
ENV HOST=0.0.0.0

# Start the application (adapter-node outputs to build/ directory)
CMD ["node", "build/index.js"]
