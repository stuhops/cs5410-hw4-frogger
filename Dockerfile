FROM node:18
WORKDIR /usr/src/app
COPY . .
EXPOSE 3100
CMD ["node", "server.js"]