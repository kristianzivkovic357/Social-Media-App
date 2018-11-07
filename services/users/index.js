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
const enums = require('../../utils/enums');
const dataMapper = require('./dataMapper');
var stream = require('stream');
const drive = require('../drive');

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
  createNewToken,
  getPosts,
  getSleeves,
  getUser,
  setAnswers,
  getAnswers,
  setImage,
  getImages
};

const sessionProperties = ['id', 'email'];
const {EMAIL_SECRET, WEB_APP_BASE_URL, PASS_CHANGE_PATH, TOTP_CHANGE_PATH} = process.env;

async function getUser (id, attributes = undefined) {
  const user = await db.User.findOne({
    where: {
      id: id
    },
    attributes: attributes
  });
  return user && user.dataValues;
}

async function register (request, password) {
  try {
    const user = await db.sequelize.transaction(async t => {
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
    return getSessionProperties(user.dataValues);
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

async function getPosts (userId, networkName) {
  const query = {
    user_id: userId
  };

  if (networkName) {
    query.social_network_id = enums.SocialNetwork[networkName];
  }

  const posts = await db.Post.findAndCountAll({
    where: query
  });

  return posts;
}

async function getSleeves (userId) {
  const accessTokens = await db.AccessToken.findAll({
    where: {
      user_id: userId
    },
    include: [{
      model: db.SocialNetwork,
      required: true,
      attributes: ['id', 'name']
    }],
    attributes: ['id', 'created_at']
  });

  return accessTokens;
}

async function setAnswers (userId, data) {
  await setAnswer(userId, data.question_first_id, data.question_first_text);
  await setAnswer(userId, data.question_second_id, data.question_second_text);
  await setAnswer(userId, data.question_third_id, data.question_third_text);
  await setAnswer(userId, data.question_fourth_id, data.question_fourth_text);
  await setAnswer(userId, data.question_fifth_id, data.question_fifth_text);
}

async function setAnswer (userId, questionId, answer) {
  await db.Answer.create({answer: answer, question_id: questionId, user_id: userId});
}

async function getAnswers (userId, attributes = undefined) {
  const answers = await db.Answer.findAll({
    where: {
      user_id: userId
    },
    include: [{
      model: db.Question,
      require: true
    }]
  });

  return answers && dataMapper.mapAnswerAndQuestion(answers);
}

async function setImage (userId, buffers) {
  let auth = await drive.authDrive(drive.create);

  for (let i in buffers) {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffers[i].buffer);

    const fileId = await drive.create(auth, bufferStream);
    setFile(userId, fileId);
  }
}

async function getImages (userId) {
  const files = await db.File.findAll({
    row: true,
    where: {
      user_id: userId
    },
    attributes: ['file_id']
  });
  return dataMapper.mapFile(files);
}

async function setFile (userId, fileId) {
  await db.File.create({ user_id: userId, file_id: fileId });
}
