FROM node:20-alpine 
WORKDIR /app

COPY package.json db.json ./

RUN npm install json-server

EXPOSE 3000

CMD ["npx", "json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "3000"]