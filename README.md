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

> If you want to use the provided Docker:
- [Docker](https://docs.docker.com/engine/install/)
- [Docker compose](https://docs.docker.com/compose/install/)

> If you want to use your local dependecies
- [Node.js](https://nodejs.org/en) v20.8.0

## Launch the project
There are two ways to launch the project:

> Using Docker compose

First, build the containers using:
```bash
docker compose up --build
```

Once the containers are up, you can attach to the application container using:

```bash
docker attach react-app
```

> Using your local installation

Run the installation process using:
```bash
npm install
```

Then, you just need to run the command:
```bash
npm start
```
