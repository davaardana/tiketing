FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --production
COPY . .
RUN mkdir -p public/uploads data
EXPOSE 3000
CMD ["node","app.js"]
