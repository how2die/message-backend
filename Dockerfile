FROM node:alpine AS build
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 8080
CMD ["server.js"]
