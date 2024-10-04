FROM oven/bun:1
WORKDIR /usr/src/app

COPY --chown=bun:bun . . 

RUN bun install

USER bun:bun
EXPOSE 3001/tcp
ENTRYPOINT [ "bun", "run", "src/index.ts" ]