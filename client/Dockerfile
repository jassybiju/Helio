FROM node:alpine as base

WORKDIR /home/next

COPY package*.json ./

RUN npm ci

COPY . .




# FROM base as production

# ENV NODE_PATH=./build

# RUN npm run dev