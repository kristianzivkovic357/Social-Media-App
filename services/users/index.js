'use strict';

const db = require('../../models');
const passwords = require('../../utils/passwords');
const auth = require('../auth');
const utils = require('../../utils/utils');
const hmac = require('../../utils/hmac');
const emailSender = require('../email');
const config = require('../../config');
const url = require('url');
const querystring = require('querystring');

module.exports = {
  register,
  login,
  checkIfUserExists,
  verifyEmail,
  initPasswordChange,
  sendPasswordResetEmail,
  getPasswordResetEmailHash,
  initTotpChange,
  sendTotpResetEmail,
  createNewToken
};

const sessionProperties = ['id', 'email'];
const {EMAIL_SECRET, WEB_APP_BASE_URL, PASS_CHANGE_PATH, TOTP_CHANGE_PATH} = process.env;

async function register (request, password) {
  try {
    await db.sequelize.transaction(async t => {
      const User = await db.User.create(request, {transaction: t});

      if (!User) {
        throw new Error('Failed to create a user');
      }

      const hash = await passwords.createHashHex(password);

      await Promise.all([
        db.UserAuth.create({'user_id': User.id, 'hash': hash}, {transaction: t}),
        sendConfirmationEmail(request.email, request)
      ]);

      return User;
    });
  } catch (err) {
    throw err;
  }
}

async function sendConfirmationEmail (email, data) {
  const hmacKey = hmac.digestHex(EMAIL_SECRET, email);

  const dataObj = {
    first_name: data.first_name,
    last_name: data.last_name,
    company_name: 'Cryptodash' // todo: check & externalize
  };

  const ok = await emailSender.sendConfirmationEmail(email, hmacKey, dataObj);
  return ok;
}

async function login (email, password) {
  const User = await getUserByEmail(email);
  if (!User) {
    return false;
  }

  const ok = await auth.checkPassword(User.get('id'), password);

  if (!ok) {
    return false;
  }

  return getSessionProperties(User.dataValues);
}

async function getUserByEmail (userEmail) {
  const User = await db.User.findOne({
    where: {
      email: userEmail
    }
  });

  return User;
}

async function checkIfUserExists (email) {
  const found = await db.User.findOne({ where: { email: email }, attributes: ['email'], raw: true });
  return found != null;
}

function getSessionProperties (User) {
  const obj = utils.getSubset(sessionProperties, User);
  return obj;
}

async function verifyEmail (data) {
  const newHash = hmac.digestHex(EMAIL_SECRET, data.email);

  if (newHash !== data.hash) {
    throw new Error();
  }

  await db.User.update({email_confirmed: true}, {
    where: {
      email: data.email
    }
  });
}

async function initPasswordChange (userId) {
  const resetInfo = {
    change_token: utils.getPasswordChangeSecret(),
    change_timeframe: Date.now() + (config.constants.passwordChangeWindowMins * 60 * 1000)
  };

  const result = await db.UserAuth.update(resetInfo, {
    where: {
      user_id: userId
    }
  });

  if (!result[0]) {
    throw new Error();
  }
}

async function sendPasswordResetEmail (userId) {
  const user = await getUserWithAuth(userId);
  const auth = user.get('UserAuth');

  const changeUrl = url.resolve(WEB_APP_BASE_URL, PASS_CHANGE_PATH);

  const changeQuery = querystring.stringify({
    user_id: userId,
    secret: auth.change_token,
    hash: getPasswordResetEmailHash(userId)
  });

  const emailData = {
    link: [changeUrl, changeQuery].join('?'),
    toAddress: user.get('email')
  };

  await emailSender.sendEmail(emailData);
}

async function getUserWithAuth (id) {
  const user = await db.User.findOne({
    where: {
      id: id
    },
    include: [{
      model: db.UserAuth,
      required: true
    }]
  });

  return user;
}

function getPasswordResetEmailHash (userId) {
  return hmac.digestHex(EMAIL_SECRET, Buffer.from('' + userId));
}

function getTotpResetEmailHash (userId) {
  return hmac.digestHex(EMAIL_SECRET, Buffer.from('' + userId));
}

async function initTotpChange (userId) {
  const resetInfo = {
    change_token: utils.getTotpChangeSecret(),
    change_timeframe: Date.now() + (config.constants.totpChangeWindowMins * 60 * 1000)
  };

  const result = await db.UserTotp.update(resetInfo, {
    where: {
      user_id: userId
    }
  });

  if (!result[0]) {
    throw new Error();
  }
}

async function sendTotpResetEmail (userId) {
  const user = await getUserWithTotp(userId);

  const totp = user.get('UserTotp');

  var changeUrl = url.resolve(WEB_APP_BASE_URL, TOTP_CHANGE_PATH);
  const changeQuery = querystring.stringify({
    user_id: userId,
    secret: totp.change_token,
    hash: getTotpResetEmailHash(userId)
  });

  const emailOptions = {
    firstName: user.get('first_name'),
    lastName: user.get('last_name')
  };

  const emailData = {
    toAddress: user.get('email'),
    link: [changeUrl, changeQuery].join('?')
  };

  emailSender.sendEmail(emailData, emailOptions);
}

async function getUserWithTotp (id, attributes = undefined) {
  const user = await db.User.findOne({
    where: {
      id: id
    },
    attributes: attributes,
    include: [{
      model: db.UserTotp,
      required: true
    }]
  });
  return user;
}

async function createNewToken (accessToken, userId, networkId) {
  try {
    const resp = await db.AccessToken.findOrCreate({
      where: {
        user_id: userId,
        social_network_id: networkId
      },
      defaults: {
        access_token: accessToken
      }
    });

    if (!resp[1]) {
      await db.AccessToken.update({
        user_id: userId,
        access_token: accessToken,
        social_network_id: networkId
      }, {
        where: {
          id: resp[0].get('id')
        }
      });
    }

    return true;
  } catch (err) {
    console.log(err);
    return null;
  }
}
