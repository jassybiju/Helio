# === BASE STAGE ===

FROM node:24-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci

# === DEVELOPMENT STAGE ===

FROM base AS development
COPY . .

# Install Doppler CLI
RUN apk add --no-cache curl gnupg && \
    curl -Ls https://cli.doppler.com/install.sh | sh

CMD ["doppler", "run", "--", "npm", "run", "dev"]

# === BUILDER STAGE === 

FROM base AS builder

COPY . .


RUN echo "BUILDING NEW CODE"

RUN npm run build

# === PRODUCTION STAGE ===


FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
# Install Doppler CLI
RUN apk add --no-cache curl gnupg && \
    curl -Ls https://cli.doppler.com/install.sh | sh



COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/templates ./templates


EXPOSE 5000

CMD ["doppler", "run", "--", "node", "dist/server.js"]
