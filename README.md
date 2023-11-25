# gif-point-com

## **Table of contents**
- [gif-point-com](#gif-point-com)
  - [**Table of contents**](#table-of-contents)
  - [**Description**](#description)
    - [Developers](#developers)
  - [Requirements](#requirements)
  - [Launch the project](#launch-the-project)

## **Description**
The aim of this project is to create a React application that transforms multiple images into one GIF.

### Developers
- Corentin Levet    (corentin.levet@epitech.eu)


## Requirements
For this project you will need at least on your computer:

> If you want to use the provided Docker installation
- [Docker](https://docs.docker.com/engine/install/)
- [Docker compose](https://docs.docker.com/compose/install/)

> If you want to use your local dependecies
- [Node.js](https://nodejs.org/en) v20.8.0
- [MariaDB](https://mariadb.org/download/) (latest version)

## Launch the project
There are two ways to launch the project:

> Using Docker compose

First, build the containers using:
```bash
docker compose build
```

Once the containers are built, you can run the project by using:

```bash
docker compose up -d
```

Now you should be able to access the project on [localhost:3000](http://localhost:3000) !

> Using your local installation

- For the application:
```bash
cd app
npm install
npm start
```

- For the server:
```bash
cd server
npm install
npm start
```

Now you should be able to access the project on [localhost:3000](http://localhost:3000) !
