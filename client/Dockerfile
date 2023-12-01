FROM node:18.16 AS PRODUCTION

ENV NODE_ENV=production

WORKDIR /usr/src/client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Use npm to run a simple http server (http-server)
CMD ["npm", "start"]
