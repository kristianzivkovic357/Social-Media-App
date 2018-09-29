'use strict';

const db = require('../models');

module.exports = {
  wrapInTx
};

async function wrapInTx (arg1, arg2) {
  if (typeof arg1 === 'function') {
    return db.sequelize.transaction(async newTx => {
      return arg1({ tx: newTx }, ...Array.prototype.splice.call(arguments, 1)); // todo: Optimize this
    });
  } else if (typeof arg2 === 'function' && !arg1.tx) {
    return db.sequelize.transaction(async newTx => {
      return arg2({
        ...arg1,
        tx: newTx
      }, ...Array.prototype.splice.call(arguments, 2));
    });
  } else if (typeof arg2 === 'function' && arg1.tx) {
    return arg2(arg1, ...Array.prototype.splice.call(arguments, 2));
  } else {
    throw new TypeError();
  }
}
