FROM node:16.13.2-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

FROM node:16.13.2-alpine

WORKDIR /app
COPY --from=builder /app  .

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000

EXPOSE 5000

CMD [ "npm", "start" ]