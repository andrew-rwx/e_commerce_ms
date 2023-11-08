FROM node:18.17.1

WORKDIR /registration_service

COPY package.*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm","start"]
