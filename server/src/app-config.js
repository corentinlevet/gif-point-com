const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

module.exports = app;
