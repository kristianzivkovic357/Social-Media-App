'use strict';

const Response = require('../utils/response');
const path = require('path');
const utilService = require('../services/resources');
const resourceService = require('../services/resources');

const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE;
const cache = {};

module.exports = {
  getResources,
  getTickers,
  getCurrencyList,
  getQuestions
};

function getResources (req, res, next) {
  try {
    const lang = res.locals.lang || DEFAULT_LANGUAGE;

    if (typeof cache[lang] === 'undefined') {
      cache[lang] = createResourceMap(lang);
    }

    res.status(200).send(Response.success(cache[lang])).end();
  } catch (err) {
    next(err);
  }
}

function createResourceMap (lang) {
  return {
    ...langIndependant,
    countries: requireResource('countries', lang),
    ui: requireResource('webapp', lang)
  };
}

const langIndependant = {
  calling_code: requireResource('call_codes'),
  document_type: requireResource('document_types')
};

function requireResource (mod, lang) {
  return require(path.join('../resources/', lang || '.', mod));
}

async function getTickers (req, res, next) {
  try {
    const data = await utilService.getTickers(res.locals.pagination, res.locals.sort);
    res.send(Response.success(data)).end();
  } catch (err) {
    next(err);
  }
}

async function getCurrencyList (req, res, next) {
  try {
    const data = await utilService.getCurrencyList(res.locals.pagination);
    res.send(Response.success(data)).end();
  } catch (err) {
    next(err);
  }
}

async function getQuestions (req, res, next) {
  try {
    const data = await resourceService.getQuestions();
    res.send(data).end();
  } catch (err) {
    next(err);
  }
}