FROM node:18.16.0-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

EXPOSE 3000