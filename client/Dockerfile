FROM node:14-alpine as builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

# CMD [ "npm", "run", "start:prod"]

# CSR 리액트 설정
RUN npm run build:prod

FROM nginx
EXPOSE 3000 
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out  /usr/share/nginx/html

