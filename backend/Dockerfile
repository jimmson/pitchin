FROM node:14

WORKDIR /usr/src/app

RUN set -ex \
  && npm install -g pm2

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci

COPY ./build ./src

EXPOSE 8000

ARG RELEASE=production

ENV NODE_ENV=$RELEASE

CMD ["node","src/app.js"]
