FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install --production

RUN bun run build

EXPOSE 4006

CMD ["bun", "run", "start"]
