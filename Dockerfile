# ======================
# 1. フロントエンドビルド
# ======================
FROM node:18 AS frontend-build

WORKDIR /app

# package.json と package-lock.json を先にコピーし依存関係インストール
COPY client/package*.json ./client/
RUN cd client && npm install

# クライアントソースコードコピー
COPY client ./client

# フロントエンドビルド
RUN cd client && npm run build

# ======================
# 2. バックエンドビルド
# ======================
FROM node:18 AS backend

WORKDIR /app/server

# サーバーのpackage.jsonコピー＆インストール
COPY server/package*.json ./
RUN npm install

# フロントエンドのビルド成果物を backend/public にコピー
COPY --from=frontend-build /app/client/build ./public

# バックエンドコードをコピー
COPY server/ ./

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
