FROM node:14
WORKDIR /usr/src/app
COPY server.js index.html ./
ADD assets ./assets/
ADD css ./css/
ADD script ./script/
EXPOSE 3000
CMD ["node", "server.js"]