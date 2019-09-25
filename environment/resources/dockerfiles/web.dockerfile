FROM nginx:1.17

ADD environment/config/nginx/vhost.conf /etc/nginx/conf.d/default.conf
