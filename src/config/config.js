require('dotenv').config();

const TOKEN = process.env.BOT_TOKEN;
const userId = process.env.USER_ID;
const api_secret = process.env.API_SECRET;

// Error handling for missing environment variables
if (!TOKEN || !userId || !api_secret) {
  console.error("Missing required environment variables!");
  process.exit(1);
}

const authString = `${userId}:${api_secret}`;
const auth = Buffer.from(authString).toString('base64');

module.exports = {
  TOKEN,
  AUTH: auth
};
