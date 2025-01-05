# Stage 1: Build the React app
FROM node:18-alpine AS build
RUN apk add --no-cache bash curl
WORKDIR /app
COPY chabcav-web/package.json . 
RUN npm install                         
COPY chabcav-web/ .   fdsf

# ARG REACT_APP_API_BASE_URL
ARG VITE_APP_API_BASE_URL
# ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
ENV VITE_APP_API_BASE_URL=$VITE_APP_API_BASE_URL


RUN npm run build

# Stage 2: Serve the React app with Nginx server
FROM nginx:alpine
COPY nginx-dev.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'