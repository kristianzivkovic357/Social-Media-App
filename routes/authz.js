'use strict';

const { AuthorizationError } = require('../utils/errors');
const { Role } = require('../utils/enums');

module.exports = {
  user,
  roles
};

/**
 * Checks for standard user service access: SYSTEM_SUPPORT is allowed,
 * standard webapp roles can access only it's user data.
 *
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 */
function user (req, res, next) {
  if (isUserInRole(req, Role.CREATOR)) {
    next();
  } else if (isUserInAnyRole(req, [Role.HOLDER, Role.VALIDATOR, Role.CREATOR])) {
    next(new AuthorizationError());
  }
}

/**
 * Checks if user belongs to any of the roles supplied.
 *
 * @param {*} roles array of role ids
 */
function roles (roles) {
  return function user (req, res, next) {
    if (isUserInRole(req, roles)) {
      next();
    } else {
      next(new AuthorizationError());
    }
  };
}

function isUserInRole (req, roleId) {
  const all = req.session.user.role_id || [];
  return roleId[0] >= all;
}

function isUserInAnyRole (req, roles) {
  const all = req.session.user.role_id || [];
  const test = roles || [];

  for (let i = 0; i < test.length; i++) {
    if (all.indexOf(test[i]) >= 0) {
      return true;
    }
  }

  return false;
}