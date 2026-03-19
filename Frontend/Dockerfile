FROM node:20

WORKDIR /app

COPY chat-app-frontend/package*.json ./
RUN npm install

COPY chat-app-frontend/ .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]