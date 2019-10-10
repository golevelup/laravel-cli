FROM nginx:1.17

WORKDIR /var/www

ENV FAST_CGI_HOST="localhost"

ADD environment/config/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template

COPY ./public ./public

CMD [ "/bin/sh", "-c", "envsubst '${FAST_CGI_HOST}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'" ]