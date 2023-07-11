# Dockerfile for Next.js frontend
FROM node:latest AS frontend-build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --quiet

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the Next.js default port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
