FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm i
RUN npm run build


FROM nginx:alpine
WORKDIR /app
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/course-redux-app /var/www/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
