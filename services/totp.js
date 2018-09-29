'use strict';

const speakeasy = require('speakeasy');

module.exports = {
  validateToken
};

async function validateToken (secret, token) {
  const verified = await speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token
  });
  return verified;
}
