FROM node:lts-alpine AS build

COPY ./package.json .

RUN npm install

COPY . .

ENV URL=http://bwbwchen.ddns.net:29345

RUN npm run build

FROM nginx:alpine AS deploy  

COPY --from=build /dist  /data/www/dist
COPY --from=build /index.html /data/www/index.html
COPY ./nginx-conf.conf /etc/nginx/nginx.conf