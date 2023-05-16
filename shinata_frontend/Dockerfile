FROM node:18.16.0-buster-slim

WORKDIR /shinata_frontend

COPY package.json /shinata_frontend/package.json

RUN npm install

COPY . /shinata_frontend/

EXPOSE 3000

CMD ["npm", "start"]