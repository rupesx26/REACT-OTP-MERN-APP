FROM node:14-slim

WORKDIR /client

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]