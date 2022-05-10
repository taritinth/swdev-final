FROM node:16.13.2-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

ENV NODE_ENV=production

EXPOSE 8081

CMD [ "npm", "start" ]
