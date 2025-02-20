require('dotenv').config(); 

const TOKEN = require('process').env.TOKEN;
const userId = require('process').env.USER_ID;
const api_secret = require('process').env.API_SECRET;
const authString = `${userId}:${api_secret}`;
const auth = require('buffer').Buffer.from(authString).toString('base64'); // Use Buffer instead of btoa.

module.exports = {
  TOKEN,
  AUTH: auth
};