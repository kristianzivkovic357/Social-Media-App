'use strict';

const mailsender = require('mailsender');
const {CONFIRMATION_LINK_BASE_URL, EMAIL_SECRET, EMAIL_PASSWORD} = process.env;

module.exports = {
  sendConfirmationEmail,
  sendEmail
};

async function sendConfirmationEmail (toAddress, hmac, data) {
  try {
    const emailConfirm = CONFIRMATION_LINK_BASE_URL + '?hash=' + hmac + '&email=' + toAddress;

    const options = {
      subject: 'Confirm your registration',
      to: toAddress
    };

    data.link = encodeURI(emailConfirm);
    data.toAddress = toAddress;
    await sendEmail(data, options);
  } catch (err) {
    throw new Error();
  }
}

async function sendEmail (data, option = undefined) {
  mailsender
    .from(EMAIL_SECRET, EMAIL_PASSWORD)
    .to(data.toAddress)
    .body('Server', 'asd ' + data.link)
    .send();
}
