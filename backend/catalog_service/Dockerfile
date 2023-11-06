#Instruction
FROM node:18.17.1

#setting working dir
WORKDIR /catalog_service

#copy package-lock and package json
COPY package*.json ./

#dependencies installation
RUN npm install

#copying source code
COPY . .

#exposing container on the port 
EXPOSE 3005

CMD ["npm", "start"]