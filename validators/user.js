'use strict';

const { body, param } = require('express-validator/check');
const custom = require('./custom');
const { vk } = require('../resources');

const idParamValidation = function (idName = 'id') {
  return [ param(idName)
    .trim()
    .not().isEmpty().withMessage(vk('req'))
    .isInt([ {min: 1} ]).withMessage(vk('num'))
  ];
};

const idBodyValidation = function (idName = 'id') {
  return [ body(idName)
    .trim()
    .not().isEmpty().withMessage(vk('req'))
    .isInt([ {min: 1} ]).withMessage(vk('num'))
  ];
};

function validateTotpToken (tokenName, secretName) {
  return [
    body(tokenName)
      .trim()
      .not().isEmpty().withMessage(vk('token_req'))
      .custom(custom.validateTotpToken(secretName)).withMessage(vk('token_auth')),
    body(secretName)
      .not().isEmpty().withMessage(vk('token_secret'))
  ];
}

const register = [
  body('email')
    .trim()
    .isEmail().withMessage(vk('mail_req'))
    .isLength({ max: 128 }).withMessage(vk('mail_long'))
    .custom(custom.validateUserEmail).withMessage(vk('mail_already_use')),
  body('password')
    .not().isEmpty().withMessage(vk('pass_req'))
    .isLength({ min: 8 }).withMessage(vk('pass_min')),
  body('password_repeat')
    .not().isEmpty().withMessage(vk('pass_req'))
    .isLength({ min: 8 }).withMessage(vk('pass_min'))
    .custom(custom.isEqual('password')).withMessage(vk('pass_equal'))
    .custom(custom.hasDigits).withMessage(vk('pass_digits')),
  body('first_name')
    .trim()
    .not().isEmpty().withMessage(vk('fn_req'))
    .isLength({ max: 64 }).withMessage(vk('fn_long')),
  body('last_name')
    .trim()
    .not().isEmpty().withMessage(vk('ln_req'))
    .isLength({ max: 64 }).withMessage(vk('ln_long'))
];

const register2 = validateTotpToken('token', 'secret');

const login = [
  body('email')
    .trim()
    .isEmail().withMessage(vk('mail_valid'))
    .isLength({ max: 128 }).withMessage(vk('mail_long')),
  body('password')
    .not().isEmpty().withMessage(vk('pass_req'))
    .isLength({ min: 8 }).withMessage(vk('pass_min'))
];

const login1 = validateToken('token');

function validateToken (tokenName) {
  return [
    body(tokenName)
      .trim()
      .not().isEmpty().withMessage(vk('token_req'))
      .custom(custom.validateTotp).withMessage(vk('token_auth'))
  ];
}

const registerUserCredentials = [
  body('apiKey')
    .trim()
    .not().isEmpty().withMessage(vk('api_key_invalid'))
    .isLength({ max: 128 }).withMessage(vk('api_key_invalid')),
  body('apiKeySecret')
    .not().isEmpty().withMessage(vk('api_key_secret_invalid'))
    .isLength({ max: 128 }).withMessage(vk('api_key_secret_invalid')),
  param('id')
    .trim()
    .not().isEmpty().withMessage(vk('req'))
    .isInt([ {min: 1} ]).withMessage(vk('num'))
    .custom(custom.checkWalletNotExist).withMessage(vk('wallet_exists')),
  idParamValidation('exchangeId')
];
const setBalance = [
  idParamValidation('id')
];

const getBalance = [
  idParamValidation('id')
];

const passChangeForgotten = [
  body('new_password')
    .not().isEmpty().withMessage(vk('pass_req'))
    .isLength({ min: 8 }).withMessage(vk('pass_min'))
    .custom(custom.hasDigits).withMessage(vk('pass_digits')),
  body('confirmed_new')
    .not().isEmpty().withMessage(vk('pass_req'))
    .isLength({ min: 8 }).withMessage(vk('pass_min'))
    .custom(custom.hasDigits).withMessage(vk('pass_digits'))
    .custom(custom.isEqual('new_password')).withMessage(vk('pass_equal')),
  body('change_token')
    .not().isEmpty().withMessage(vk('pass_req')),
  body('hash')
    .not().isEmpty().withMessage(vk('pass_req'))
    .custom(custom.checkPasswordChangeHash).withMessage(vk('invalid_hash')),
  idBodyValidation('user_id')
];

const totpChangeForgotten = [
  validateTotpToken('token', 'secret'),
  body('password')
    .not().isEmpty().withMessage(vk('pass_req'))
    .isLength({ min: 8 }).withMessage(vk('pass_min'))
    .custom(custom.totpCheckPassword).withMessage(vk('pass_incorrect')),
  body('change_token')
    .not().isEmpty().withMessage(vk('pass_req')),
  idBodyValidation('user_id'),
  body('hash')
    .not().isEmpty().withMessage(vk('hash_req'))
    .custom(custom.checkTotpChangeHash).withMessage(vk('invalid_hash'))
];

const accessKey = [
  body('code')
    .not().isEmpty().withMessage(vk('code_req')),
  body('network')
    .not().isEmpty().withMessage(vk('pass_req'))
    .custom(custom.checkNetwork)
];

const getPosts = [
  idParamValidation()
];

module.exports = {
  register,
  login,
  registerUserCredentials,
  setBalance,
  getBalance,
  register2,
  login1,
  passChangeForgotten,
  validateTotpToken,
  totpChangeForgotten,
  accessKey,
  getPosts
};
