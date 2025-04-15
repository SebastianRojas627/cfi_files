FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 5003

CMD ["node", "dist/main"]