FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install -g nodemon

CMD ["npm", "start"]
EXPOSE 1001