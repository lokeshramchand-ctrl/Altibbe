# ================================
# 🏗️ Stage 1 — Build React Frontend
# ================================
FROM node:20 AS frontend
WORKDIR /app/frontend

# Copy and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy all frontend files and build
COPY frontend/ .
RUN npm run build

# ================================
# ⚙️ Stage 2 — Setup Backend & Serve Frontend
# ================================
FROM node:20 AS backend
WORKDIR /app

# Copy and install backend dependencies
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

# Copy backend source files
COPY backend/ ./ 

# Copy built frontend into backend/public
COPY --from=frontend /app/frontend/dist ./public

# Expose backend port
EXPOSE 4000

# Start backend server
CMD ["npm", "start"]
