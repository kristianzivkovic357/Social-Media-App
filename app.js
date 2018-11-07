'use strict';

require('dotenv').config();

const http = require('http');
const express = require('express');
const routes = require('./routes');
const logger = require('./utils/logger');

const { PORT } = process.env;

const app = express();
const multer = require('multer');
app.use(multer().any());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', routes);
app.disable('x-powered-by');

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Listening on ${PORT}`);
});
