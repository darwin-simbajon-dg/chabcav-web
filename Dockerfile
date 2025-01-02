# Stage 1: Build the React app
FROM node:18-alpine AS build
RUN apk add --no-cache bash curl
WORKDIR /app
COPY package.json ./ 
RUN npm install                         
COPY . .   
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'