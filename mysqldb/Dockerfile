FROM mysql:latest

WORKDIR /usr/src/mysqldb

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=campDataBase
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password

COPY create.sql .

CMD ["mysqld", "--init-file=/usr/src/mysqldb/create.sql"]
