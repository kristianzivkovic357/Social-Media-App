'use strict';

const querystring = require('querystring');
const axios = require('axios');

const { INSTA_TOKEN_REDIRECT_URI } = process.env;

module.exports = getAccessToken;

async function getAccessToken (code) {
  try {
    const response = await axios.post('https://api.instagram.com/oauth/access_token', querystring.stringify({
      redirect_uri: INSTA_TOKEN_REDIRECT_URI,
      code: code,
      grant_type: 'authorization_code',
      client_id: '5df48e0684bc4e349f2f093cd9cf953c',
      client_secret: '9e39e5d9f0b0408c8683abe26396495d'
    }));

    return response.data.access_token;
  } catch (err) {
    console.log(err);
    return null;
  }
}
