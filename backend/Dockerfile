FROM node:14

WORKDIR /usr/src/app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci

COPY ./build ./src

EXPOSE 8000

CMD ["node","src/app.js"]
