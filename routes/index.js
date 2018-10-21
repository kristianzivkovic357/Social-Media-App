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

router.get(`${baseUrl}/users/me`, authc.service, userRoutes.me);
router.post(`${baseUrl}/users/register`, val.users.register, userRoutes.register);
router.post(`${baseUrl}/users/login`, val.users.login, userRoutes.login);
router.post(`${baseUrl}/users/logout`, userRoutes.logout);

router.get(`${baseUrl}/users/register_access_token`, authc.service, authc.user, val.users.accessKey, userRoutes.accessToken);
router.post(`${baseUrl}/users/:id/register_access_token`, authc.service, authc.user, val.users.accessKey, userRoutes.accessToken);

router.get(`${baseUrl}/users/:id/posts`, authc.service, authc.user, val.users.getPosts, userRoutes.getPosts);
router.get(`${baseUrl}/users/:id/sleeves`, authc.service, authc.user, val.users.getSleeves, userRoutes.getSleeves);

router.use(h.error);

module.exports = router;
