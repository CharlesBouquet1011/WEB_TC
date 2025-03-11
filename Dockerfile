FROM node:23-alpine3.20 AS backend_node
WORKDIR /app

COPY package*.json ./ 
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