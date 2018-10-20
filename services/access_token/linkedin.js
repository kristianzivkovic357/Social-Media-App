'use strict'

const axios = require('axios');

module.exports = getAccessTokenLinkedin;

async function getAccessTokenLinkedin (code) {
    return 'sdfsdfsdfsdf';
    const obj = await axios.get('https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=' + code + '&redirect_uri=https%3A%2F%2Flinkedin24212.localtunnel.me%2Fapi%2Fv1%2Fusers%2Fregister_access_token&client_id=7703aat9h4511g&client_secret=iwfhmuvCe4sbxdQT');
    return obj.data.access_token;
}