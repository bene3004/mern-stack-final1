FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g nodemon

CMD ["npm", "start"]
EXPOSE 1717