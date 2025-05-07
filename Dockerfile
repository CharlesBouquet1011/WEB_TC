FROM node:23-alpine3.20 AS backend_node
WORKDIR /app

COPY /backend/package*.json ./ 
#prod
#COPY ./backend/ /app/
RUN npm install
EXPOSE 80
RUN adduser -S backend_node

RUN chown -R backend_node /app
USER backend_node
#prod
CMD ["npm","start"]
#dev
#CMD ["npm","run","dev"]

FROM nginx:1.27.4-alpine-slim AS web_nginx
WORKDIR /app/nginx
#dev
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
#prod
#COPY nginx.prod.conf /etc/nginx/conf.d/default.conf
#donner les permissions à l'utilisateur du conteneur (sinon erreur de permissions au démarrage et pour le fonctionnement)
RUN chown -R nginx:nginx /app/nginx && \
    chown -R nginx:nginx /etc/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /var/run && \
    chmod 777 /var/run

CMD ["nginx", "-g", "daemon off;"]

FROM node:23-alpine3.20 AS react
WORKDIR /app
COPY ./frontend/package.json /app/
EXPOSE 3000

RUN adduser -S react
#prod
#COPY ./frontend /app
#fin prod
RUN chown -R react /app && chmod -R 755 /app
USER react
RUN npm install

#prod
#RUN npm run build
#en dev y a pas build
#prod
#RUN npm run build
#en dev y a pas build
#prod
#CMD ["npx", "serve", "build", "-p", "3000"] 
#dev
CMD ["npm", "start"]