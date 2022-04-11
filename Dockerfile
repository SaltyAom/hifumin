FROM node:16-alpine as builder

WORKDIR /usr/app

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# * ====================
FROM node:16-alpine as modules

WORKDIR /usr/app

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile --production

# * ====================
FROM alpine:latest as main

RUN apk --no-cache add nodejs

WORKDIR /usr/app/

COPY --from=modules /usr/app/node_modules node_modules
COPY --from=builder /usr/app/build build
COPY package.json package.json

ENV NODE_ENV production

CMD ["node", "build"]
EXPOSE 3000