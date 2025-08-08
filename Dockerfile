# 1. Reactアプリのビルド
FROM node:18 AS frontend
WORKDIR /app
COPY client/ ./
RUN npm install
RUN npm run build

# 2. サーバーのセットアップ
FROM node:18 AS backend
WORKDIR /app
COPY server/ ./
RUN npm install

# 3. 本番環境としてまとめる（静的ファイルも）
FROM node:18
WORKDIR /app

# サーバーコード
COPY --from=backend /app ./

# 静的ファイルを公開用に
COPY --from=frontend /app/build ./public

ENV PORT=3000
EXPOSE 3000

CMD ["node", "index.js"]
