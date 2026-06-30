# Step 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code and compile
COPY . .
RUN npm run build

# Step 2: Set up Nginx to serve static files and proxy requests
FROM nginx:stable-alpine

# Copy built frontend assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Overwrite default Nginx configuration with our custom routing configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
