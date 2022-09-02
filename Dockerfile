FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock wait.sh ./
COPY index.js /app/index.js
COPY api /app/api
COPY auth /app/auth
COPY db /app/db
COPY migrations /app/migrations

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
RUN yarn install --frozen-lockfile

EXPOSE 3000
CMD /wait && yarn start