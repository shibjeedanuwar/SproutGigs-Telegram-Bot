function handleHelp(bot,mainKeyboard) {
    // Help command logic
    bot.onText(/Help/, (msg) => {
        const helpMessage = `
    *Available Commands:*
    
    • *Browse Gigs* - Browse all available gigs
    • *Get Gigs* - Search for specific gigs
    • *MicroJobs Ranking* - View top performers
    • *Help* - Show this help message
    
    _Use the keyboard below to navigate_
    `;
        bot.sendMessage(msg.chat.id, helpMessage, {
          parse_mode: 'Markdown',
          ...mainKeyboard
        });
      });
}

module.exports = handleHelp;