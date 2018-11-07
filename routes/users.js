'use strict';

const utils = require('../utils/utils');
const usersService = require('../services/users');
const { AuthenticationError } = require('../utils/errors');
const authc = require('./authc');
const Response = require('../utils/response');
const authService = require('../services/auth');
const tokenService = require('../services/access_token');
const enums = require('../utils/enums');

const { WEBAPP_BASE_URL } = process.env;

module.exports = {
  register,
  login,
  logout,
  registerUserCredentials,
  setUserAccountBalance,
  getUserAccountBalance,
  initPasswordChange,
  changePassForgotten,
  initTotpChange,
  changeTotpForgotten,
  me,
  accessToken,
  getPosts,
  getSleeves,
  setAnswers,
  getAnswers,
  setImage
};

async function register (req, res, next) {
  try {
    const request = utils.getSubset([
      'email', 'first_name', 'last_name'
    ], req.body);

    const user = await usersService.register(request, req.body.password);

    if (user) {
      authc.setAuthenticated(req, user);
      res.end();
    } else {
      next(new AuthenticationError());
    }

    res.status(201).end();
  } catch (err) {
    next(err);
  }
}

async function login (req, res, next) {
  try {
    const sessionProperties = await usersService.login(req.body.email, req.body.password);

    if (sessionProperties) {
      authc.setAuthenticated(req, sessionProperties);
      res.end();
    } else {
      next(new AuthenticationError());
    }
  } catch (err) {
    next(new AuthenticationError(err));
  }
}

async function registerUserCredentials (req, res, next) {
  try {
    const params = utils.getSubset([
      'apiKey', 'apiKeySecret'
    ], req.body);

    await usersService.registerUserCredentials(req.params.id, req.params.exchangeId, params);
    res.status(200).end();
  } catch (err) {
    next(new AuthenticationError(err));
  }
}

async function setUserAccountBalance (req, res, next) {
  try {
    await usersService.setUserAccountBalance(req.params.id);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    next(new AuthenticationError(err));
  }
}

async function getUserAccountBalance (req, res, next) {
  try {
    const amountObj = await usersService.getUserAccountBalance(req.params.id);
    res.send(amountObj);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

async function logout (req, res, next) {
  authc.destroy(req);
  res.status(200);
  res.send(Response.success(null));
  res.end();
}

async function initPasswordChange (req, res, next) {
  const userId = req.params.id;

  try {
    await usersService.initPasswordChange(userId);
    await usersService.sendPasswordResetEmail(userId);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

async function changePassForgotten (req, res, next) {
  try {
    await authService.changePassForgotten(req.body.user_id, req.body.change_token, req.body.new_password);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

async function initTotpChange (req, res, next) {
  const userId = +req.params.id;

  try {
    await usersService.initTotpChange(userId);
    await usersService.sendTotpResetEmail(userId);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

async function changeTotpForgotten (req, res, next) {
  try {
    await authService.changeTotpForgotten(req.body.user_id, req.body.change_token, req.body.secret);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

async function me (req, res, next) {
  const user = req.session.user;

  if (!user) { // just in case
    next(new AuthenticationError());
    return;
  }

  const userObject = await usersService.getUser(user.id, ['email_confirmed', 'first_name', 'last_name']);

  if (!userObject) {
    next(new AuthenticationError());
    return;
  }

  res.status(200).send(Response.success({
    id: user.id,
    email: user.email,
    email_confirmed: userObject.email_confirmed,
    first_name: userObject.first_name,
    last_name: userObject.last_name
  })).end();
}

async function accessToken (req, res, next) {
  try {
    const user = req.session.user;
    const network = req.params.network;

    if (!user) { // just in case
      next(new AuthenticationError());
      return;
    }

    let networkId;
    let accessToken;

    if (tokenService[network]) {
      accessToken = await tokenService[network](req.query.code);
    } else {
      res.status(400).end();
      return;
    }

    console.log(accessToken); // return : async function instead of value !
    if (!accessToken) {
      res.status(410).end();
      throw new Error();
    }

    networkId = enums.SocialNetwork[network];
    const ok = usersService.createNewToken(accessToken, req.session.user.id, networkId);

    if (!ok) {
      throw new Error();
    }

    res.redirect(WEBAPP_BASE_URL);
  } catch (err) {
    res.status(400).end();
  }
}

async function getPosts (req, res, next) {
  try {
    const userId = req.params.id;
    const networkName = req.query.networkName;

    const posts = await usersService.getPosts(userId, networkName);

    res.send(Response.success(posts)).end();
  } catch (err) {
    next(err);
  }
}

async function getSleeves (req, res, next) {
  try {
    const userId = req.params.id;

    const sleeves = await usersService.getSleeves(userId);

    res.send(Response.success(sleeves)).end();
  } catch (err) {
    next(err);
  }
}

async function setAnswers (req, res, next) {
  try {
    const userId = req.session.id;

    if (!userId) {
      next(new AuthenticationError());
      return;
    }

    const data = utils.getSubset([
      'question_first_id', 'question_second_id', 'question_third_id', 'question_fourth_id', 'question_fifth_id',
      'question_first_text', 'question_second_text', 'question_third_text', 'question_fourth_text', 'question_fifth_text'
    ], req.body);

    await usersService.setAnswers(userId, data);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
}

async function getAnswers (req, res, next) {
  try {
    const userId = req.body.user_id;

    const anwers = await usersService.getAnswers(userId);

    res.send(Response.success(anwers)).end();
  } catch (err) {
    next(err);
  }
}

async function setImage (req, res, next) {
  try {
    const userId = req.session.id;
    await usersService.setImage(userId, req.files);
    res.send().end();
  } catch (err) {
    next(err);
  }
}
