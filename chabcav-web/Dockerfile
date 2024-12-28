# Stage 1: Build the React app
FROM node:18-alpine AS build
RUN apk add --no-cache bash curl
WORKDIR /app
COPY package.json ./ 
COPY nginx.conf /etc/nginx/nginx.conf
RUN npm install                         
COPY . .   
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
ENV LISTEN_PORT 8080
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]