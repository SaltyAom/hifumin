FROM node:16-alpine as builder

WORKDIR /usr/app

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm build

# * ====================
FROM node:16-alpine as modules

WORKDIR /usr/app

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --production
RUN pnpm prune --production

# * ====================
FROM alpine:3.15 as main

RUN apk --no-cache add bash nodejs varnish nginx

WORKDIR /usr/app/

COPY --from=modules /usr/app/node_modules node_modules
COPY --from=builder /usr/app/build build
COPY package.json package.json

COPY ./ops/varnish /etc/default/varnish
COPY ./ops/default.vcl /etc/varnish/default.vcl
COPY ./ops/default.conf /etc/nginx/conf.d/default.conf
COPY ./ops/parallel.sh .
COPY ./ops/start.sh .

RUN chmod 555 start.sh
RUN chmod 555 parallel.sh

ENV NODE_ENV production
ENV PORT=3001

CMD ["./start.sh"]
EXPOSE 3000
