
FROM node:24-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM base AS development

CMD ["npm", "run", "dev"]


FROM base AS builder
RUN echo "BUILDING NEW CODE"

RUN npm run build


FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/templates ./templates


EXPOSE 5000

CMD ["node", "dist/server.js"]

# FROM base as production

# ENV NODE_PATH=./build

# RUN npm run dev