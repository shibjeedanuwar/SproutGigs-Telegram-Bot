const { rankingsData, getTotalPages } = require('../services/ranking');
const { mainKeyboard } = require('../utils/keyboard');

function handleMicroJobsRanking(bot, userStates) {
    // Micro jobs ranking command logic
    bot.onText(/MicroJobs Ranking/, async (msg) => {
    
        // console.log(totalPages);
        const initialPage = 1;
        sendRankingPage(bot, msg.chat.id, initialPage);
        userStates.set(msg.chat.id, { currentPage: initialPage });
      });
}
const sendRankingPage = (bot, chatId, page) => {
    const pageSize = 5;
    const totalPages = getTotalPages(pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const rankingData = rankingsData.slice(startIndex, endIndex);
  
    const rankingMessage = `🏆👏 Here are the top rankings! 🚀`;
    const rankingList = rankingData.map((user, index) => {
      const nickname = user.nickname.replace(/([_*[\`])/g, '\\$1');
      const country = user.country.replace(/([_*[\`])/g, '\\$1');
      const flag = user.flag;
      const success = user.success;
      const earned = user.earned;
      const tasks = user.tasks;
  
      return `
  ${startIndex + index + 1}. NickName: ${nickname} 
  Country: ${country} ${flag}
  Success Rate: ${success}  
  Earned:${earned} 
  Completed tasks:${tasks} 
  =========================
  `;
    }).join('');
  
    const inlineKeyboard = { inline_keyboard: [] };
    const navButtons = [];
  
    if (page > 1) {
      navButtons.push({ text: '⬅️ Previous', callback_data: `rankingPage_${page - 1}` });
    }
    if (page < totalPages) {
      navButtons.push({ text: 'Next ➡️', callback_data: `rankingPage_${page + 1}` });
    }
    if (navButtons.length) {
      inlineKeyboard.inline_keyboard.push(navButtons);
    }
  
    bot.sendMessage(chatId, `*MicroJobs Ranking (Page ${page}/${totalPages}):*\n${rankingMessage}\n${rankingList}`, {
      parse_mode: 'Markdown',
      reply_markup: inlineKeyboard
    });
  };

module.exports = { handleMicroJobsRanking, sendRankingPage };
