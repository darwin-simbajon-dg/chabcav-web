# Stage 1: Build the React app
FROM node:18-alpine AS build
WORKDIR /app
COPY chabcav-web/package*.json .
COPY chabcav-web/tsconfig.json .
COPY chabcav-web/tsconfig.app.json .
COPY chabcav-web/tsconfig.node.json .
COPY nginx-dev.conf .
RUN npm install     

COPY chabcav-web/ .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
