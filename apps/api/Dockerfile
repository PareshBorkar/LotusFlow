FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY turbo.json ./

COPY apps/api ./apps/api
COPY packages ./packages

RUN npm install

RUN npm run build -- --filter=api

EXPOSE 3000

CMD ["npm", "start", "--workspace=apps/api"]