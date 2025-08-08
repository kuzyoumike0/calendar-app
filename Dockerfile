# 1. Reactアプリのビルド（フロントエンド）
FROM node:18 AS frontend
WORKDIR /app
COPY client/ ./               # Reactのソースコードをコピー
RUN npm install
RUN npm run build             # build/ フォルダが生成される

# 2. Expressサーバーの準備（バックエンド）
FROM node:18 AS backend
WORKDIR /app
COPY server/ ./               # Expressのコードをコピー
RUN npm install

# 3. 本番環境イメージ
FROM node:18
WORKDIR /app

# Express サーバーコードをコピー
COPY --from=backend /app ./   # index.js などが含まれる

# Reactのビルド済み静的ファイルを public に配置
COPY --from=frontend /app/build ./public

# 環境変数・ポート設定
ENV PORT=3000
EXPOSE 3000

# サーバー起動
CMD ["node", "index.js"]
