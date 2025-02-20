function handleStart(bot,mainKeyboard) {
    // Start command logic
    bot.onText(/start/, (msg) => {
        const welcomeMessage = `
    *Welcome to SproutGigs Bot!* 👋
    
    This is not the official SproutGigs.com bot.
    This bot was created for testing and demonstration purposes only by Shibjee Danuwar.
    
    Use the keyboard below to navigate:
    • Browse Gigs - View available gigs
    • Get Gigs - Search specific gigs
    • MicroJobs Ranking - View top performers
    • Help - Show available commands
    `;
        bot.sendMessage(msg.chat.id, welcomeMessage, {
          parse_mode: 'Markdown',
          ...mainKeyboard
              }).then(sentMessage => {
                bot.pinChatMessage(msg.chat.id, sentMessage.message_id).catch(error => {
                    console.error('Error pinning message:', error);
                });
            }).catch(error => {
                console.error('Error sending message:', error);
            });
       });
}

module.exports = { handleStart };