FROM php:7
RUN apt-get update -y && apt-get install -y libpq-dev openssl zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo mbstring pgsql pdo_pgsql pdo_mysql
WORKDIR /app
COPY . .
RUN composer install

CMD php artisan serve --host=0.0.0.0 --port=8000
EXPOSE 8000
