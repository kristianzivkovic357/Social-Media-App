'use strict';

const axios = require('axios');

module.exports = getAccessTokenFacebook;

async function getAccessTokenFacebook (code) {
  return 'sdfsdfsdfsdf';
  const obj = await axios.get('https://graph.facebook.com/v3.1/oauth/access_token?client_id=912430772286226&redirect_uri=https://facebookgetpost.localtunnel.me/api/v1/users/register_access_token/facebook&client_secret=0ec39bf949ac1c017916a0ea9ab1e9b0&code=' + code);
  return obj.data.access_token;
}
