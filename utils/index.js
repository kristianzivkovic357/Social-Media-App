'use strict';

const getSubset = (keys, obj) => keys.reduce((a, c) => ({ ...a, [c]: obj[c] }), {});
const invert = (data) => Object.entries(data).reduce((obj, [key, value]) => ({ ...obj, [value]: key }), {});

module.exports = {
  getSubset,
  invert
};
