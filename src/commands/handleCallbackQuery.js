//callback data handeler.
const { getStaticJobs } = require('../services/staticJobs');
const { showGigsPage } = require('./browseGigs');
const { showStaticJobsPage } = require('./gigs');
const { sendRankingPage }  = require('./microJobsRanking');

//call back handeler function.
async function handleCallbackQuery(bot, callbackQuery,userStates) {
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const data = callbackQuery.data;

  try {
    if (data.startsWith('page_')) {
      const newPage = parseInt(data.split('_')[1]);
      userStates.set(chatId, { currentPage: newPage });
      await showGigsPage(bot, chatId, newPage);
    } else if (data.startsWith('rankingPage_')) {
      const newPage = parseInt(data.split('_')[1]);
      userStates.set(chatId, { currentPage: newPage });
      await sendRankingPage(bot, chatId, newPage);
    } else if (data.startsWith('microJobsRankingPage_')) {
      const newPage = parseInt(data.split('_')[1]);
      userStates.set(chatId, { currentPage: newPage });
      await sendMicroJobsRankingPage(bot, chatId, newPage);
    } else if (data.startsWith('staticPage_')) {
      const page = parseInt(data.split('_')[1], 10); // Extract the page number
      const staticJobs = getStaticJobs(); // Fetch the static jobs
      await showStaticJobsPage(bot, chatId, page, staticJobs);
    } else if (data.startsWith('rankingPage_')) {
      const newPage = parseInt(data.split('_')[1]);
      userStates.set(chatId, { currentPage: newPage });
      await sendRankingPage(bot, chatId, newPage);
    } else if (data === 'main_menu') {
      await bot.sendMessage(chatId, 'Welcome back to main menu!', mainKeyboard);
    }
    
    // Answer callback query
    await bot.answerCallbackQuery(callbackQuery.id);
  } catch (error) {
    console.error('Error in callback query:', error);
    await bot.answerCallbackQuery(callbackQuery.id, {
      text: 'Error processing request',
      show_alert: true
    });
  }
    
}

module.exports = { handleCallbackQuery };
