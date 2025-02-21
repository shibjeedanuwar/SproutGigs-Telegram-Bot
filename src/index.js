const TelegramBot = require('node-telegram-bot-api');
const config = require('./config/config');
const commandHandlers = require('./commands/handlers');
const { handleCallbackQuery } = require('./commands/handleCallbackQuery');

const userStates = new Map();
const token = config.TOKEN;
if (!token) {
  console.error("Telegram Bot Token not provided!");
  process.exit(1);
}
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Initialize command handlers
commandHandlers.init(bot, userStates);

// Update callback query handler
bot.on('callback_query', async (callbackQuery) => {
  console.log('Received callback query:', callbackQuery);
  handleCallbackQuery(bot, callbackQuery, userStates);
});

// Add logging for command execution
bot.onText(/\/start/, (msg) => {
  console.log('Received /start command from user:', msg.from.id);
  // Handle start command
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down the bot gracefully...');
  bot.stopPolling();
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('An uncaught exception occurred:', error);
  bot.stopPolling();
  process.exit(1);
});
