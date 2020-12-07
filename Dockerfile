FROM node:12.19.1

WORKDIR /var/star-server

COPY package.json ./package.json

RUN npm install

CMD npm start
