FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm update npm -g

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "start"]  
