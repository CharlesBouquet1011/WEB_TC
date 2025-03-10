FROM node:23-alpine3.20 as backend_node
WORKDIR /app

COPY package*.json ./ 
RUN npm install
EXPOSE 80
RUN adduser -S backend_node

RUN chown -R backend_node /app
USER backend_node
CMD ["npm","start"]


