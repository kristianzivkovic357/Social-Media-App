'use strict';

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.photos.readonly',
  'https://www.googleapis.com/auth/drive.readonly'
];
const TOKEN_PATH = './token.json';

module.exports = {
  create,
  authDrive
};

async function authDrive (callback) {
  let pr = new Promise(function (resolve, reject) {
    fs.readFile('./credentials.json', async (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      // authorize(JSON.parse(content), listFiles);
      let credentials = JSON.parse(content);

      const {client_secret, client_id, redirect_uris} = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
      let b = new Promise(function (resolve, reject) {
        fs.readFile(TOKEN_PATH, (err, token) => {
          if (err) return getAccessToken(oAuth2Client, callback);
          oAuth2Client.setCredentials(JSON.parse(token));
          resolve(oAuth2Client);
        });
      });
      await b;
      resolve(b);
    });
  });
  await pr;
  return pr;
}

async function create (auth, buffer) {
  const drive = google.drive({version: 'v3', auth});

  const fileMetadata = {
    'name': 'photo.jpg'
  };

  const media = {
    mimeType: 'image/jpeg',
    body: buffer
  };

  let fileId = new Promise(function (resolve, reject) {
    drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    }, function (err, file) {
      if (err) {
        // Handle error
        // reject();
      } else {
        console.log('File Id: ', file.data.id);
        resolve(file.data.id);
      }
    });
  });
  await fileId;
  return fileId;
}

function getAccessToken (oAuth2Client, callback) {
  oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
