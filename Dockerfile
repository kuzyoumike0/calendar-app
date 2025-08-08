# ======================
# 1. フロントエンドビルド
# ======================
FROM node:18 AS frontend-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# ======================
# 2. バックエンドビルド
# ======================
FROM node:18 AS backend
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install

# フロントエンドのビルド成果物を backend/public にコピー
COPY --from=frontend-build /app/client/build ./public

# バックエンドコードコピー
COPY server/ ./

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
