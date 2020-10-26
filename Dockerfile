FROM webdevops/php-apache:7.4-alpine

# Install base packages
RUN apk update
RUN apk upgrade

# xdebug configuration
RUN apk --no-cache add --virtual .build-deps \
        g++ \
        autoconf \
        make && \
    pecl install xdebug && \
    docker-php-ext-enable xdebug && \
    echo -e "xdebug.remote_enable=1\n\
    xdebug.remote_autostart=1\n\
    xdebug.remote_connect_back=0\n\
    xdebug.remote_port=9000\n\
    xdebug.idekey=\"PHPSTORM\"\n\
    xdebug.remote_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
