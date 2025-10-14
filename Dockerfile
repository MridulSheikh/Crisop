# Use the official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Expose port 3000 for Next.js
EXPOSE 3000

# Start Next.js in development mode (with hot reload)
CMD ["npm", "run", "dev"]
