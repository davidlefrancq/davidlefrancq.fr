FROM node:alpine as build

COPY ./ /app
WORKDIR /app
RUN npm install
RUN npm build

FROM debian

# Update
RUN apt-get update
RUN apt-get -y upgrade

# Apache
RUN apt-get install -y apache2

# App
COPY apache2/conf-available/dlreact.conf /etc/apache2/conf-available/dlreact.conf
COPY apache2/sites-available/dlreact.conf /etc/apache2/sites-available/dlreact.conf
COPY apache2/sites-available/dlreactssl.conf /etc/apache2/sites-available/dlreactssl.conf
RUN a2dissite 000-default.conf
RUN a2enmod ssl
RUN a2enconf dlreact
#RUN a2ensite dlreact
#RUN a2ensite dlreactssl

COPY --from=build /app/build /app

WORKDIR /app
EXPOSE 80 443

CMD ["/usr/sbin/apache2ctl","-DFOREGROUND"]
