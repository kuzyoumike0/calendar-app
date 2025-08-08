# 1. Reactアプリのビルド
FROM node:18 AS frontend
WORKDIR /app
COPY client/ ./             # ← client ディレクトリが必要
RUN npm install
RUN npm run build           # ./build に静的ファイル出力

# 2. Express サーバーのセットアップ
FROM node:18 AS backend
WORKDIR /app
COPY server/ ./             # ← server ディレクトリが必要
RUN npm install

# 3. 本番用イメージ作成（Express + React静的ファイル）
FROM node:18
WORKDIR /app

# サーバーコードをコピー
COPY ./ ./


# Reactビルド済みファイルを public にコピー
COPY --from=frontend /app/build ./public

# ポートと起動コマンド
ENV PORT=3000
EXPOSE 3000
CMD ["node", "index.js"]
