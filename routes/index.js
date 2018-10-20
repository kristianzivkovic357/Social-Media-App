'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./users');
const h = require('./handlers');
const val = require('../validators');
const session = require('./session');
const authc = require('./authc');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(session);

const baseUrl = '/api/v1';

router.get(`${baseUrl}/users/me`, h.sendCsurfHeader, authc.service, userRoutes.me);
router.post(`${baseUrl}/users/register`, val.users.register, userRoutes.register);
router.post(`${baseUrl}/users/login`, val.users.login, userRoutes.login);
router.post(`${baseUrl}/users/logout`, userRoutes.logout);

router.post(`${baseUrl}/users/register_access_token`, val.users.accessKey, userRoutes.accessToken);
router.get(`${baseUrl}/users/register_access_token`, userRoutes.accessToken);
router.use(h.error);

module.exports = router;
