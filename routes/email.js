'user strict';

const utils = require('../utils/utils');
const services = require('../services/users');

module.exports = {
  verify
};

async function verify (req, res, next) {
  const data = utils.getSubset([
    'email', 'hash'
  ], req.query);

  await services.verifyEmail(data);
  res.send('End').end();
}
