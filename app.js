'use strict';

require('dotenv').config();

const http = require('http');
const express = require('express');
const routes = require('./routes');
const logger = require('./utils/logger');

const { PORT } = process.env;

const app = express();

app.use('/', routes);
app.disable('x-powered-by');

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Listening on ${PORT}`);
});
