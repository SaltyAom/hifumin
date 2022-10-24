FROM node:18-alpine as builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm build

# * ====================
FROM node:18-alpine as modules

WORKDIR /app

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --production
RUN pnpm prune --production

# * ====================
FROM gcr.io/distroless/nodejs:18

WORKDIR /app/

COPY --from=modules /app/node_modules node_modules
COPY --from=builder /app/build build
COPY package.json package.json

ENV NODE_ENV production

CMD ["build/index.js"]
EXPOSE 3000
