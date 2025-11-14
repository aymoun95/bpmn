# Backend Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build && cp -r ./src/assets ./dist/assets
CMD ["node", "dist/index.js"]
