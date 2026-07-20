FROM node:24-alpine AS base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY . .




# FROM base as production

# ENV NODE_PATH=./build

# RUN npm run dev