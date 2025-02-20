const TelegramBot = require('node-telegram-bot-api');
const { TOKEN } = require('./config/config');
const commandHandlers = require('./commands/handlers');
const { handleCallbackQuery } = require('./commands/handleCallbackQuery');

const userStates = new Map();

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TOKEN, { polling: true });


// Initialize command handlers
commandHandlers.init(bot, userStates);

// Update callback query handler
bot.on('callback_query', async (callbackQuery) => {
  handleCallbackQuery(bot,callbackQuery,userStates);
})
