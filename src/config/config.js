const TOKEN = '';
const user_id = '';
const api_secret = '';
const authString = `${user_id}:${api_secret}`;
const auth = Buffer.from(authString).toString('base64'); // Use Buffer instead of btoa.

module.exports = {
  TOKEN,
  AUTH: auth
};