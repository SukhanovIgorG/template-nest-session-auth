FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install --production

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "-r", "tsconfig-paths/register", "dist/src/main.js"]