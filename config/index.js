'use strict';

require('dotenv').config();

const config = {
  [process.env.NODE_ENV]: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },

  sequelizeOptions: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  sessionStoreOtions: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  constants: { // todo: authOptions?
    passwordMissesAllowed: 10,
    totpMissesAllowed: 10,
    totpChangeWindowMins: 1440, // 1 day
    passwordChangeWindowMins: 1440, // 1 day
    totpWindow: 1,
    timeIntervalMS: 31536000000, // 1 year
    coinMarketCapUrl: 'https://api.coinmarketcap.com/v2/ticker/',
    coinCapTTL: 2000
  }
};

module.exports = config;
