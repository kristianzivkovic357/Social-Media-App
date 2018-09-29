'use strict';

const services = require('../services/users');
const authServices = require('../services/auth');

module.exports = {
  checkTotp
};

const digitsRegexp = new RegExp('^[0-9]{1,6}$');

async function checkTotp (req, res, next) {
  try {
    const userId = validateUserId(req.body.user_id);
    const totpToken = validateTotpToken(req.body.token);

    const secret = await services.findSecretById(userId);

    if (!secret) {
      throw new Error();
    }

    const ok = await authServices.validateToken(secret, totpToken);

    if (!ok) {
      throw new Error();
    }

    res.status(200).json();
  } catch (err) {
    res.status(401).json();
  }
}

function validateUserId (userId) {
  if (!(+userId > 0)) {
    throw new Error();
  } else {
    return +userId;
  }
}

function validateTotpToken (totpToken) {
  if (!digitsRegexp.test(totpToken)) {
    throw new Error();
  } else {
    return totpToken;
  }
}
