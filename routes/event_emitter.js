'use strict';

const EventEmitter = require('events');
const mailSender = require('../services/email');
const { EMAIL_CONNECTION } = process.env;

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

module.exports = {
  myEmitter
};

myEmitter.on('connection', () => {
  let data = {};
  data.toAddress = EMAIL_CONNECTION;
  mailSender.sendEmail(data);
});
