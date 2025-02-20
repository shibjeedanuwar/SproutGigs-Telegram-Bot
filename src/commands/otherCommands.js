function handleOtherCommands(bot, mainKeyboard) {
    // Other command logic
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        // console.log(msg);
        const userMessage = msg.text; 
        const allowedCommands = ['/Browse Gigs', '/Get Gigs', '/MicroJobs Ranking', '/Help'];

        if (!allowedCommands.includes(userMessage) && !msg.text.startsWith('/start')) {
            const preventMessage = `
            I didn't understand that. Please use a recognized command.
            s
            *Available Commands:*
            
            • *Browse Gigs* - Browse all available gigs
            • *Get Gigs* - Search for specific gigs
            • *MicroJobs Ranking* - View top performers
            • *Help* - Show this help message
            
            _Use the keyboard below to navigate_
            `;
            bot.sendMessage(chatId, preventMessage, {
                parse_mode: 'Markdown',
                reply_markup: mainKeyboard
            });
        } 
    });
}


module.exports = handleOtherCommands;