'use strict';

const axios = require('axios');
const crypto = require('crypto');

const getSubset = (keys, obj) => keys.reduce((a, c) => ({ ...a, [c]: obj[c] }), {});
const invert = (data) => Object.entries(data).reduce((obj, [key, value]) => ({ ...obj, [value]: key }), {});

module.exports = {
  coinList,
  getPasswordChangeSecret,
  getSubset,
  invert,
  getTotpChangeSecret,
  calculatePercentage
};

async function coinList () {
  let response = await axios.get('https://api.coinmarketcap.com/v2/listings/');
  const data = response.data.data;

  const coinListStructure = {};
  for (let i in data) {
    coinListStructure[data[i].symbol] = data[i].id;
  }
  return coinListStructure;
}

function getPasswordChangeSecret () {
  return getRandomString(64);
}

function getTotpChangeSecret () {
  return getRandomString(64);
}

function getRandomString (length) {
  return crypto.randomBytes(length).toString('hex');
}

function calculatePercentage (objOne, objTwo) {
  const percentageChanges = {};

  for (let i in objOne) {
    var decreaseValue = objOne[i] - objTwo[i];
    percentageChanges[i] = (decreaseValue / objTwo[i]) * 100;
  }

  return percentageChanges;
}
