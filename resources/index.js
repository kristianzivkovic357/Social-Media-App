'use strict';

module.exports = {
  vk: vk
};

/**
 * Returns full validation messages key for UI.
 *
 * @param {*} subkey key to search in validation messages
 */
function vk (subkey) {
  return 'validation_errors.' + subkey;
}
