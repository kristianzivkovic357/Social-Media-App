'use strict';

const crypto = require('crypto');

module.exports = {
  digestHex: digestHex
};

function digestHex (secret, data) {
  const hmac = crypto.createHmac('sha512', secret);
  hmac.update(data);
  return hmac.digest('hex');
}
