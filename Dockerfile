FROM node:16-alpine as builder

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

# * ====================
FROM node:16-alpine as modules

WORKDIR /usr/app

RUN apk --no-cache add curl bash

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile --production

# * ====================
FROM alpine:latest as main

RUN apk --no-cache add nodejs

WORKDIR /usr/app/

COPY --from=modules /usr/app/node_modules node_modules
COPY --from=builder /usr/app/.next .next
COPY package.json .
COPY public public
COPY next.config.production.js next.config.js

ENV NODE_ENV production

CMD ["./node_modules/next/dist/bin/next", "start"]
EXPOSE 3000
