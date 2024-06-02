FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm i nodemon -g
RUN npm install
COPY . .
CMD [ "npm","run","start" ]