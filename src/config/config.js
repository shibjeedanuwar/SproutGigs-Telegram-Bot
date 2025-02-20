require('dotenv').config(); 

const TOKEN = process.env.BOT_TOKEN;
const userId = process.env.USER_ID;
const api_secret = process.env.API_SECRET;

const authString = `${userId}:${api_secret}`;
const auth = Buffer.from(authString).toString('base64');

module.exports = {
  TOKEN,
  AUTH: auth
};
