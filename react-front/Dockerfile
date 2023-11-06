#Instruction
FROM node:18.17.1

#setting working dir
WORKDIR /react_front

#copy package-lock and package json
COPY package*.json ./

#dependencies installation
RUN npm install

#copying source code
COPY . .

#exposing container on the port 
EXPOSE 3000

CMD ["npm", "run", "dev"]