FROM node:22-alpine3.19

WORKDIR /usr/src/app

COPY --chown=node:node . . 

RUN npm install
RUN npm run build

USER node:node
EXPOSE 3000/tcp
ENTRYPOINT [ "npm", "run", "start" ]