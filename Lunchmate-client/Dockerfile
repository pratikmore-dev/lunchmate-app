# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "start"]
# -------- Build Stage --------
FROM node:18 AS build
WORKDIR /app

# 1. Copy package.json first (for caching)
COPY package.json .
COPY package-lock.json .

# 2. Install dependencies
RUN npm install

# 3. Copy rest of source
COPY . .

# 4. Build React app
RUN npm run build

# -------- Runtime Stage --------
# Serve using nginx (lightweight web server)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
