FROM node:18.16 AS PRODUCTION

ENV NODE_ENV=production

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD ["node", "index.js"]
