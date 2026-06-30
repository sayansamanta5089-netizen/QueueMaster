# Use Node.js 20 lightweight Alpine image
FROM node:20-alpine

# Install build tools required by native modules like better-sqlite3
RUN apk add --no-cache python3 make g++

# Set working directory inside container
WORKDIR /app

# Copy package descriptors first to leverage Docker layer caching
COPY package*.json ./

# Install backend production and development dependencies
RUN npm install

# Copy backend source files
COPY . .

# Expose backend API port
EXPOSE 5000

# Start Express server via tsx
CMD ["npm", "start"]
