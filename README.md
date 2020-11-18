<br />
<p align="center">
  <a href="https://github.com/otasoft/otasoft-catalog">
    <img src="doc/otasoft-catalog-logo.png" alt="Otasoft Logo" width="128" height="128">
  </a>

  <h1 align="center">Otasoft Catalog - Travel Offer Catalog Microservice for Otasoft</h1>

  <p align="center">
    <!-- <a href="https://github.com/otasoft/otasoft-catalog"><strong>Explore the docs »</strong></a> -->
    <!-- <a href="https://github.com/otasoft/otasoft-catalog">View Demo</a> -->
    <!-- · -->
    <a href="https://github.com/otasoft/otasoft-catalog/issues">Report Bug</a>
    ·
    <a href="https://github.com/otasoft/otasoft-catalog/issues">Request Feature</a>
  </p>
  <p align="center">
    <!-- <a href="https://github.com/otasoft/otasoft-api/actions"><img src="https://github.com/otasoft/otasoft-api/workflows/Node.js%20CI/badge.svg?branch=master" alt="CI"></a> -->
</p>

# About The Project

Otasoft Catalog - Travel Offer Catalog Microservice for Otasoft

* MySQL 5.7 (master-slave replication)
* CQRS
* ELK stack
* Typeorm
* Nginx

Otasoft projects are and always will be open source (MIT Licence). Anyone can use and support the project. The project is currently in the development phase.

## Table of Contents

* [Getting Started](#getting-started)
* [ELK](#elk)
* [Database replication](#database-layers)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [How to support](#how-to-support)
* [Contact](#contact)
* [License](#license)

<!-- GETTING STARTED -->
## Getting Started

To start developing the project please check if you have these tools installed on your machine:

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://yarnpkg.com/getting-started/install)
* [Docker](https://www.docker.com/get-started)

Installation

1. Clone the repo

```sh
git clone https://github.com/otasoft/otasoft-core
```

2. Move into catalog microservice

```sh
cd microservices/otasoft-catalog
```

3. Install all projects dependencies

```sh
yarn
```

4. Copy .env.example file as .env and fill it with your environment variables

```sh
cp .env.example .env
```

5. Run docker-compose to start development environment (first look at the next step of this documentation for Nginx proxy, replication, etc)

```sh
docker-compose up
```

6. Run project

```sh
yarn start:dev
```

## ELK

Otasoft Catalog uses tools from ELK stack. Currently we have three instances of Elasticsearch for index searching and one instance of Kibana for data monitoring. Both Elasticsearch and Kibana are accessible through Nginx proxy with Basic Auth and HTTPS (self-signed for now). All Elasticsearch methods are located in `/src/es` directory.

### How does it work

When user searches for something using Otasoft system (i.e. types "Paris" in search bar) following procedures are triggered:

1. Request is coming from Api Gateway and is handled by appriopriate catalog module
2. Correct CQRS Query is sending request to Elastic with a request query
3. Elastic returns an object or collection of objects matching the query. This object contains a record ID
4. CQRS Query then asks the Slave DB about specific records instead of searching the database which is resource consuming
5. Result is returned to the user

Index, Update, and Delete Elasticsearch methods are also supported and implemented.

### Nginx proxy

To provide better security Elasticsearch and Kibana are accessible through the Nginx proxy. It is configured with Basic Auth and HTTPS (self signed for development purposes).

1. Move to security scripts directory

```sh
cd src/security/scripts
```

2. Run htpasswd script to generate it using env variables (remember to include proxy user and password inside .env file)

```sh
sh ./generate-htpasswd.sh
```

3. Run ssl script to generate self signed private key and public certificate

```sh
sh ./generate-ssl-cert.sh
```

After that, you can safely run `docker-compose up`

## Database replication

Using below steps you can configure master-slave replication for MySQL databases.
`Database names env variables must be the same for master and slave, otherwise it will throw an error!`

### General usage

Open Docker containers for master and slave with terminal or command line:

`docker exec -it container_hash /bin/sh;`

or with Docker Desktop

### Master DB configuration

Allow replication to a user that will be used to access master DB from slave DB

`mysql -uroot -p -AN -e "GRANT REPLICATION SLAVE ON *.* TO '$MYSQL_REPLICATION_USER'@'$MYSQL_SLAVE_ADDRESS' IDENTIFIED BY '$MYSQL_REPLICATION_PASSWORD';"`

`mysql -uroot -p -AN -e "GRANT REPLICATION SLAVE ON *.* TO '$MYSQL_REPLICATION_USER'@'%' IDENTIFIED BY '$MYSQL_REPLICATION_PASSWORD';"`

Reload privileges for the db users

`mysql -uroot -p -AN -e "FLUSH PRIVILEGES;"`

Restart MySQL

`sudo service mysql restart`

Show master status -> This will be needed later so don't close it yet. We will use MASTER_LOG_POSITION and MASTER_LOG_FILE in the slave DB

`mysql -uroot -p -e 'SHOW MASTER STATUS \G'`

### Slave DB configuration

Configure replication in slave DB using replication user from master DB and MASTER_LOG_POSITION and MASTER_LOG_FILE values from master DB

`mysql -uroot -p -AN -e "CHANGE MASTER TO master_host='$MYSQL_MASTER_ADDRESS',master_user='$MYSQL_REPLICATION_USER',master_password='$MYSQL_REPLICATION_PASSWORD',master_log_file='mysql-bin.000005',master_log_pos=154;"`

Start slave process

`mysql -uroot -p -AN -e "START SLAVE;"`

Show slave status to make sure that it works correctly

`mysql -uroot -p -e "SHOW SLAVE STATUS \G;"`

## Test with DB Client

1. I am using [Table Plus](https://tableplus.com/) as it allows for many different types of database connections (PostgreSQL, MySQL, Redis, etc)
2. Connect to the master and slave databases
3. Insert a new value to master DB inside Docker container or send an appriopriate request with [Postman](https://www.postman.com/)
4. Data inserted in master DB should also be visibile in slave DB

## Typeorm replication

By default otasoft-catalog uses Typeorm to connect and modify the databases. The project is configured to use two MySQL databases (`master` and `slave`). Thanks to that, data redundancy is provided and also requests to the databases are distributed. Read methods (SELECT's) are handled by slave DB and write methods (INSERT, UPDATE, DELETE, etc) are handled by master DB. Content of master DB is duplicated in slave DB to maintain data consistency.

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/otasoft/otasoft-catalog/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

You are welcome to contribute to Otasoft projects. Please see [contribution tips](CONTRIBUTING.md)

<!-- SUPPORT -->
## How to support

Otasoft projects are and always will be Open Source.

Core team and contributors in the Otasoft ecosystem spend their free and off work time to make this project grow. If you would like to support us you can do so by:

* contributing - it does not matter whether it is writing code, creating designs, or sharing knowledge in our e-books and pdfs. Any help is always welcome!
* evangelizing - share a good news about Otasoft projects in social media or during technology conferences ;)

<!-- CONTACT -->
## Contact

Founder -> [Jakub Andrzejewski](https://www.linkedin.com/in/jakub-andrzejewski/)

<!-- LICENSE -->
## License

Distributed under the [MIT licensed](LICENSE). See `LICENSE` for more information.