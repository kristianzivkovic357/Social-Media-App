'use strict';

const crypto = require('crypto');

module.exports = {
  createHashHex,
  getSaltHex,
  check
};
// NIST SP 800-132
const DIGEST = 'sha512';
const ITERATIONS = 100000; // min 1000, more the better
const KEY_LEN = 64; // 512 bit (PBKDF2-HMAC-SHA-512)
const SALT_BYTES = 256 / 8;

function createHashHex (password, salt = getSaltHex(), iterations = ITERATIONS) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, +iterations, KEY_LEN, DIGEST, (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve([derivedKey.toString('hex'), salt, +iterations].join(':'));
      }
    });
  });
}

function getSaltHex () {
  return crypto.randomBytes(SALT_BYTES).toString('hex');
}

async function check (password, hash) {
  const p = hash.split(':');

  if (p.length === 3) {
    const newHash = await createHashHex(password, p[1], p[2]);
    return newHash === hash;
  }

  return false;
}
