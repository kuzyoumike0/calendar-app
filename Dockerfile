# ベースイメージ
FROM node:18

# 作業ディレクトリを作成・移動
WORKDIR /app/server

# package.json と package-lock.json をコピーして依存関係をインストール
COPY server/package*.json ./
RUN npm install

# アプリケーションコードをコピー
COPY server/ ./

# 環境変数でポート指定（デフォルトは8080）
ENV PORT=8080

# コンテナのポート開放
EXPOSE 8080

# アプリ起動コマンド
CMD ["node", "server.js"]
