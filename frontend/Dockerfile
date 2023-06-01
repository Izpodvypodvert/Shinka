FROM node:18.16.0-buster-slim

WORKDIR /frontend

ENV NODE_OPTIONS=--max_old_space_size=2048

COPY package.json /frontend/package.json
COPY ./package-lock.json .

RUN npm install -g serve
RUN npm install

COPY . /frontend/

RUN npm run build
