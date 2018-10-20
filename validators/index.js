'use strict';

const { validationResult } = require('express-validator/check');
const { ValidationError } = require('../utils/errors');
const user = require('./user');

// Append validationError middleware to each validator array
function appendValidationError (validators) {
  let newValidators = {};
  Object.keys(validators).map(function (valName) {
    newValidators[valName] = [ validators[valName], validationError ];
  });
  return newValidators;
}

// Catch validation errors
function validationError (req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new ValidationError(errors.mapped()));
  } else {
    next();
  }
}

module.exports = {
  users: appendValidationError(user)
};
