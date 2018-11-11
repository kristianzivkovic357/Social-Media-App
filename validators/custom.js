'use strict';

const userServices = require('../services/users');
const totp = require('../services/totp');
const authServices = require('../services/auth');
const enums = require('../utils/enums');

module.exports = {
  isEqual,
  hasDigits,
  validateUserEmail,
  checkWalletNotExist,
  validateTotpToken,
  validateTotp,
  checkPasswordChangeHash,
  totpCheckPassword,
  checkTotpChangeHash,
  checkReplyId,
  checkNetwork
};

const digitsRegexp = new RegExp('[0-9]');

function isEqual (paramName) {
  async function equal (value, {req}) {
    if (value !== req.body[paramName]) {
      throw new Error();
    }
  }
  return equal;
}

async function hasDigits (value) {
  if (!digitsRegexp.test(value)) {
    throw new Error();
  }
}

async function validateUserEmail (email) {
  const ok = await userServices.checkIfUserExists(email);

  if (ok) {
    throw new Error();
  }
}

async function checkWalletNotExist (userId, {req}) {
  if (!userId || !req.params.exchangeId) {
    throw new Error();
  }

  const walletAlreadyExists = await userServices.getWallet(userId, req.params.exchangeId);

  if (walletAlreadyExists) {
    throw new Error();
  }
}

function validateTotpToken (secretName) {
  async function validate (token, {req}) {
    const ok = await totp.validateToken(req.body[secretName], token);

    if (!ok) {
      throw new Error();
    }
  }
  return validate;
}

async function validateTotp (token, {req}) {
  if (!req.session || !req.session.user || !req.session.user.id) {
    throw new Error();
  }

  const userId = req.session.user.id;

  const ok = await authServices.checkTotpToken(userId, token);

  if (!ok) {
    throw new Error();
  }
}

async function checkPasswordChangeHash (hash, {req}) {
  const userIdHash = userServices.getPasswordResetEmailHash(req.body.user_id);

  if (userIdHash !== hash) {
    throw new Error();
  }
}

async function totpCheckPassword (val, {req}) {
  if (!req.body.user_id || !req.body.password) {
    throw new Error();
  }

  const ok = await authServices.checkPassword(req.body.user_id, req.body.password);

  if (!ok) {
    throw new Error();
  }
}

async function checkTotpChangeHash (hash, {req}) {
  const userIdHash = userServices.getTotpResetEmailHash(req.body.user_id);

  if (userIdHash !== hash) {
    throw new Error();
  }
}

async function checkReplyId (id) {
  if (!(id === 'null' || digitsRegexp.test(id))) {
    throw new Error();
  }
}

async function checkNetwork (val) {
  if (!enums.SocialNetwork[val]) {
    throw new Error();
  }
}
