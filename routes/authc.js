'use strict';

const { AuthorizationError, AuthenticationError } = require('../utils/errors');

module.exports = {
  setAuthenticated,
  user,
  service,
  setTotpValidated,
  destroy
};

const STATE_AUTHENTICATED = 1;
const STATE_TOTP_VALIDATED = 2;

function setAuthenticated (req, sessionProperties) {
  if (sessionProperties) {
    req.session.user = sessionProperties;
    req.session.state = STATE_AUTHENTICATED;
  }
}

function user (req, res, next) {
  const sentUserId = +req.params.id;
  if (sentUserId !== 0 && +req.session.user.id === sentUserId) {
    next();
  } else {
    next(new AuthorizationError());
  }
}

function service (req, res, next) {
  if (req.session.user && req.session.state === STATE_AUTHENTICATED) {
    next();
  } else {
    next(new AuthenticationError());
  }
}

function setTotpValidated (req) {
  req.session.state = STATE_TOTP_VALIDATED;
}

function destroy (req) {
  req.session.destroy();
}
