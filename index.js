const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const config = require('./src/config/config');
const commandHandlers = require('./src/commands/handlers');
const { handleCallbackQuery } = require('./src/commands/handleCallbackQuery');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(config.TOKEN, { 
    polling: true,
    // Add polling options for better reliability
    polling: {
        interval: 300, // Poll every 300ms
        autoStart: true,
        params: {
            timeout: 10 // Long polling timeout
        }
    }
});

// Initialize user states
const userStates = new Map();

// Initialize command handlers
commandHandlers.init(bot, userStates);

// Bot error handling
bot.on('polling_error', (error) => {
    console.error('Polling error:', error.message);
    // Attempt to restart polling on error
    setTimeout(() => {
        bot.stopPolling().then(() => {
            console.log('Restarting polling...');
            bot.startPolling();
        });
    }, 5000); // Wait 5 seconds before restart
});

bot.on('error', (error) => {
    console.error('General bot error:', error.message);
});

// Process error handling
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    // Attempt graceful shutdown
    gracefulShutdown();
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled rejection:', error);
    // Attempt graceful shutdown
    gracefulShutdown();
});

// Graceful shutdown function
function gracefulShutdown() {
    console.log('Attempting graceful shutdown...');
    bot.stopPolling()
        .then(() => {
            console.log('Bot polling stopped');
            // Give active operations 5 seconds to complete
            setTimeout(() => {
                process.exit(1);
            }, 5000);
        })
        .catch(error => {
            console.error('Error during shutdown:', error);
            process.exit(1);
        });
}

// Handle shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Update callback query handler with better error handling
bot.on('callback_query', async (callbackQuery) => {
    try {
        await handleCallbackQuery(bot, callbackQuery, userStates);
    } catch (error) {
        console.error("Error handling callback query:", error);
        // Attempt to notify user of error
        try {
            await bot.answerCallbackQuery(callbackQuery.id, {
                text: 'Sorry, an error occurred. Please try again.',
                show_alert: true
            });
        } catch (notifyError) {
            console.error("Error sending error notification:", notifyError);
        }
    }
});

// Express routes
// Health check endpoint
app.get('/health', (req, res) => {
    const uptime = process.uptime();
    const memory = process.memoryUsage();
    
    res.status(200).json({
        status: 'OK',
        uptime: `${Math.floor(uptime / 60)} minutes`,
        memory: {
            heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(memory.heapTotal / 1024 / 1024)}MB`
        },
        botPolling: bot.isPolling(),
        activeUsers: userStates.size
    });
});

// Basic request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Express error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Telegram bot is running...');
    console.log(`Health check available at http://localhost:${PORT}/health`);
});

// Export for testing purposes
module.exports = { bot, app };