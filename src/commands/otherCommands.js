function handleOtherCommands(bot, mainKeyboard) {
    // Other command logic
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;

        // Check if msg.text is defined
        if (msg.text) {
            const userMessage = msg.text; 
            const allowedCommands = ['/Browse Gigs', '/Get Gigs', '/MicroJobs Ranking', '/Help'];

            if (!allowedCommands.includes(userMessage) && !userMessage.startsWith('/start')) {
                const preventMessage = `
                I didn't understand that. Please use a recognized command.
                *Available Commands:*
                
                • *Browse Gigs* - Browse all available gigs
                • *Get Gigs* - Search for specific gigs
                • *MicroJobs Ranking* - View top performers
                • *Help* - Show this help message
                
                _Use the keyboard below to navigate_
                `;
                bot.sendMessage(chatId, preventMessage, { reply_markup: mainKeyboard });
            }
        }
    });
}


module.exports = handleOtherCommands;