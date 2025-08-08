# 1. Reactアプリのビルド
FROM node:18 AS frontend
WORKDIR /app
COPY client/package*.json ./          # 依存関係だけ先にコピー
RUN npm install
COPY client/ ./                      # React ソースコード全コピー
RUN npm run build

# 2. Express サーバーセットアップ
FROM node:18 AS backend
WORKDIR /app
COPY server/package*.json ./          # 依存関係だけ先にコピー
RUN npm install
COPY server/ ./                      # サーバーコード全コピー

# 3. 本番用イメージ
FROM node:18
WORKDIR /app

# サーバーコードをコピー
COPY --from=backend /app ./ 

# Reactビルド済み静的ファイルをpublicに配置
COPY --from=frontend /app/build ./public

ENV PORT=3000
EXPOSE 3000

CMD ["node", "index.js"]
