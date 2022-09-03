FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
COPY index.js /app/index.js
COPY api /app/api
COPY auth /app/auth
COPY db /app/db
COPY migrations /app/migrations

RUN yarn install --frozen-lockfile

EXPOSE 3000
CMD yarn start