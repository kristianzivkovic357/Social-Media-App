'use strict';

const db = require('../models');

module.exports = {
  getTickers,
  getCurrencyList
};

const currencyList = {
  count: null,
  rows: {}
};

async function setCurrencyList () {
  const { count, rows } = await db.Currency.findAndCountAll();

  for (let i in rows) {
    currencyList.rows[rows[i].id] = rows[i];
  }

  currencyList.count = count;
}

async function getTickers (pagination, sort) {
  const data = await db.NewestTicker.findAndCountAll({
    limit: pagination.limit,
    offset: pagination.offset,
    order: [[sort.column, sort.order]]
  });

  return data;
}

async function getCurrencyList (pagination) {
  return currencyList;
}

setCurrencyList();
