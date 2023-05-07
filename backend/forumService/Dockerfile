FROM node:19-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN apk add --update nodejs npm
RUN npm install
RUN npm install socket.io


COPY . .

EXPOSE 5004
CMD [ "node", "index.js" ]