FROM php:7.3.6-fpm-stretch

ARG xdebug=false

# These are considered sane defaults for the cloud deployments
ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS="0" \
    PHP_OPCACHE_MAX_ACCELERATED_FILES="100000" \
    PHP_OPCACHE_MEMORY_CONSUMPTION="192" \
    PHP_OPCACHE_MAX_WASTED_PERCENTAGE="10" \
    PHP_XDEBUG_DEFAULT_ENABLE="0" \
    PHP_XDEBUG_REMOTE_ENABLE="0"

RUN docker-php-ext-install opcache

RUN docker-php-ext-install pdo_mysql

RUN if [ "$xdebug" = "true" ] ; then pecl install xdebug && docker-php-ext-enable xdebug ; else echo Running app without XDEBUG ; fi

COPY environment/config/php/conf.d/*.ini /usr/local/etc/php/conf.d/
COPY environment/config/fpm/*.conf /usr/local/etc/php-fpm.d/







