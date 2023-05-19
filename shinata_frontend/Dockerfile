FROM node:18.16.0-buster-slim

WORKDIR /shinata_frontend

ENV NODE_OPTIONS=--max_old_space_size=2048

COPY package.json /shinata_frontend/package.json
COPY ./package-lock.json .

RUN npm install -g serve
RUN npm install

COPY . /shinata_frontend/

RUN npm run build
# CMD ["npm", "run", "build"]

# COPY . /shinata_frontend/