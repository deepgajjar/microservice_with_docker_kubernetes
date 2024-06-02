FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm i nodemon -g
RUN npm i
COPY . .

CMD [ "npm","run","start" ]