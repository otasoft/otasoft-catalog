# REPLICATION

This directory contains configuration files and step by step implementation of master-slave replication for MySQL 5.7.
All SQL commands can be run while being logged in to mysql (without `mysql -uroot -p$MYSQL_MASTER_ROOT_PASSWORD -AN -e`). It is considered as a safer approach to not use the root password in the command line.

## General usage

Open Docker containers for master and slave with terminal or command line:

`docker exec -it container_hash /bin/sh;`

or with Docker Desktop

## Master DB configuration

Allow replication to a user that will be used to access master DB from slave DB

`mysql -uroot -p$MYSQL_MASTER_ROOT_PASSWORD -AN -e "GRANT REPLICATION SLAVE ON *.* TO '$MYSQL_REPLICATION_USER'@'%' IDENTIFIED BY '$MYSQL_REPLICATION_PASSWORD';"`

Reload privileges for the db users

`mysql -uroot -p$MYSQL_MASTER_ROOT_PASSWORD -AN -e "FLUSH PRIVILEGES;"`

Restart MySQL

`sudo service mysql restart`

Show master status -> This will be needed later so don't close it yet. We will use MASTER_LOG_POSITION and MASTER_LOG_FILE in the slave DB

`mysql -uroot -p$MYSQL_MASTER_ROOT_PASSWORD -e 'SHOW MASTER STATUS \G'`

## Slave DB configuration

Configure replication in slave DB using replication user from master DB and MASTER_LOG_POSITION and MASTER_LOG_FILE values from master DB

`mysql -uroot -p$MYSQL_SLAVE_ROOT_PASSWORD -AN -e "CHANGE MASTER TO master_host='$MYSQL_MASTER_ADDRESS',master_user='$MYSQL_REPLICATION_USER',master_password='$MYSQL_REPLICATION_PASSWORD',master_log_file='mysql-bin.000004',master_log_pos=154;"`

Start slave process

`mysql -uroot -p$MYSQL_SLAVE_ROOT_PASSWORD -AN -e "START SLAVE;"`

Show slave status to make sure that it works correctly

`mysql -uroot -p$MYSQL_SLAVE_ROOT_PASSWORD -e "SHOW SLAVE STATUS \G;"`

## Test with DB Client

1. I am using [Table Plus](https://tableplus.com/) as it allows for many different types of database connections (PostgreSQL, MySQL, Redis, etc)
2. Connect to the master and slave databases
3. Insert a new value to master DB inside Docker container or send an appriopriate request with [Postman](https://www.postman.com/)
4. Data inserted in master DB should also be visibile in slave DB
