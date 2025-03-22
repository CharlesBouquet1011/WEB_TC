FROM node:23-alpine3.20 AS backend_node
WORKDIR /app

COPY /backend/package*.json ./ 
RUN npm install
EXPOSE 80
RUN adduser -S backend_node

RUN chown -R backend_node /app
USER backend_node
CMD ["npm","start"]

FROM nginx:1.27.4-alpine AS web_nginx
WORKDIR /app/nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
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
COPY /frontend ./
EXPOSE 3000
RUN npm install
#prod
#RUN npm run build
#en dev y a pas build
RUN adduser -S react
RUN chmod 700 /app/node_modules
RUN chown -R react /app


USER react
#prod
#CMD ["npx", "serve", "build", "-p", "3000"] 
#dev
CMD ["npm", "start"]
