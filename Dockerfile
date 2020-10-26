FROM webdevops/php-apache:7.4-alpine

# Install base packages
RUN apk update
RUN apk upgrade

# xdebug configuration
RUN apk add nano g++ autoconf make
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug
