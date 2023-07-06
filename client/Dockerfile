# FROM node:14-alpine as builder

# WORKDIR /app

# COPY package.json ./

# RUN npm install

# COPY ./ ./

# CMD [ "npm", "run", "start:prod"]

# CSR 리액트 설정
# RUN npm run build:prod

# FROM nginx
# EXPOSE 3000 
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/out  /usr/share/nginx/html

FROM node:14-alpine as builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY ./ ./

# Next.js 애플리케이션의 프로덕션 빌드 생성
RUN npm run build:prod

# 프로덕션 빌드를 실행하는 단계로 변경
FROM node:14-alpine as runner

WORKDIR /app

COPY package.json ./
RUN npm install --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

CMD [ "npm", "run", "start:prod" ]


