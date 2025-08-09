version: "3.8"

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    depends_on:
      - db
    ports:
      - "8080:8080"
    environment:
      DB_HOST: db
      DB_USER: postgres
      DB_PASSWORD: OYAPewoYlrTwCHMGeowncDSttHhEInfc
      DB_NAME: mydb
      DB_PORT: 5432

  db:
    image: postgres:15
    container_name: mydb
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: OYAPewoYlrTwCHMGeowncDSttHhEInfc
      POSTGRES_DB: mydb
    volumes:
      - railway-postgres-data:/var/lib/postgresql/data

volumes:
  railway-postgres-data:
    external: true
