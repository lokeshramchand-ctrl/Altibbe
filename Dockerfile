# Stage 1: Build React app
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Backend + Serve Frontend
FROM node:18 AS backend
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Copy frontend build into backend's public folder
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 4000
CMD ["npm", "start", "--prefix", "backend"]
