'use strict';

const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);
const { sessionStoreOtions } = require('../config');

const sessionStore = new MySQLStore(sessionStoreOtions);

var session = expressSession({
  key: process.env.SESSION_KEY,
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  unset: 'destroy',
  createDatabaseTable: true,
  resave: false,
  saveUninitialized: true // todo: research this one
});

module.exports = session;
