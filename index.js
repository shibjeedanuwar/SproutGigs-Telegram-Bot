const TelegramBot = require('node-telegram-bot-api');
const config = require('./src/config/config');
const commandHandlers = require('./src/commands/handlers');
const { handleCallbackQuery } = require('./src/commands/handleCallbackQuery');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(config.TOKEN, { polling: true });

const userStates = new Map();

// Initialize command handlers
commandHandlers.init(bot, userStates);

// Update callback query handler
bot.on('callback_query', async (callbackQuery) => {
    try {
        await handleCallbackQuery(bot, callbackQuery, userStates);
    } catch (error) {
        console.error("Error handling callback query:", error);
    }
});

// Optionally, log that the bot is running
console.log('Telegram bot is running...');
