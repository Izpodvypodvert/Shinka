FROM node:18.16.0-buster-slim

WORKDIR /shinata_frontend

# ENV PATH /shinata_frontend/node_modules/.bin:$PATH

COPY package.json /shinata_frontend/package.json
COPY ./package-lock.json .

RUN npm install -g serve
RUN npm install

COPY . /shinata_frontend/

RUN npm run build
# CMD ["npm", "run", "build"]

# COPY . /shinata_frontend/