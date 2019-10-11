FROM php:7.3.6-fpm-stretch

ARG xdebug=false
ARG tinker=false

WORKDIR /var/www

# These are considered sane defaults for the cloud deployments
ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS="0" \
    PHP_OPCACHE_MAX_ACCELERATED_FILES="100000" \
    PHP_OPCACHE_MEMORY_CONSUMPTION="192" \
    PHP_OPCACHE_MAX_WASTED_PERCENTAGE="10" \
    PHP_XDEBUG_DEFAULT_ENABLE="0" \
    PHP_XDEBUG_REMOTE_ENABLE="0"

RUN docker-php-ext-install opcache

RUN docker-php-ext-install pdo_mysql

# Conditionally install the necessary components to allow XDebug
RUN if [ "$xdebug" = "true" ] ; then pecl install xdebug && docker-php-ext-enable xdebug ; else echo Running app without XDEBUG ; fi

COPY vendor/ ./vendor/
COPY artisan server.php composer.json composer.lock ./

COPY app/ ./app/
COPY bootstrap/ ./bootstrap/
COPY config/ ./config/
COPY database/ ./database/
COPY public/ ./public/
COPY resources/ ./resources/
COPY routes/ ./routes/
COPY storage/ ./storage/

COPY environment/config/php/conf.d/*.ini /usr/local/etc/php/conf.d/
COPY environment/config/fpm/*.conf /usr/local/etc/php-fpm.d/

RUN chmod -R 777 /var/www/storage
RUN chmod -R 777 /var/www/bootstrap

RUN if [ "$tinker" = "true" ] ; then mkdir -p /.config && chmod -R 777 /.config ; else echo Running app without Tinker support ; fi

