FROM node:18-alpine

WORKDIR /app

# Add package files first for better caching
COPY package*.json ./

# Install dependencies with legacy peer deps and no strict ssl
RUN npm config set strict-ssl false \
    && npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]