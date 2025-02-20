const { getStaticJobs } = require('../services/staticJobs');
const { mainKeyboard } = require('../utils/keyboard');


function handleGigs(bot) {
    // Gigs command logic
    bot.onText(/Get Gigs/, async (msg) => {
        const staticJobs = await getStaticJobs();
        // Start from page 1 when user clicks the Get Gigs button
        await showStaticJobsPage(bot, msg.chat.id, 1, staticJobs);
      });
}

// Function to display static jobs with pagination (5 per page)
async function showStaticJobsPage(bot, chatId, page, staticJobs) {
    try {
      const jobsPerPage = 5;
      const totalPages = Math.ceil(staticJobs.jobs.length / jobsPerPage);
      const startIndex = (page - 1) * jobsPerPage;
      const endIndex = startIndex + jobsPerPage;
      const pageJobs = staticJobs.jobs.slice(startIndex, endIndex);
  
      if (pageJobs.length > 0) {
        // Send header message
        await bot.sendMessage(chatId, `📋 *Showing Jobs ${startIndex + 1}-${Math.min(endIndex, staticJobs.jobs.length)} of ${staticJobs.jobs.length}*`, {
          parse_mode: 'Markdown'
        });
  
        // Send each job
        for (const job of pageJobs) {
          const jobMessage = `
          ${job.title}
  
          🌍  *Region:* ${job.region.name}
          📊  *Level:* ${job.level.name}
          📅  *Remaining:* ${job.progress.remaining}/ ${job.progress.total}
          👤  *Client:* ${job.client.name}
          💰  *Payment:* ${job.payment.amount} ${job.payment.currency} / ${job.payment.duration} 💵
          📋  *Categories:* ${job.categories.join(', ')}
        `;
          await bot.sendMessage(chatId, jobMessage, {
            parse_mode: 'Markdown'
          });
        }
  
        // Build inline keyboard for navigation
        const inlineKeyboard = { inline_keyboard: [] };
        const navButtons = [];
  
        if (page > 1) {
          navButtons.push({ text: '⬅️ Previous', callback_data: `staticPage_${page - 1}` });
        }
        if (page < totalPages) {
          navButtons.push({ text: 'Next ➡️', callback_data: `staticPage_${page + 1}` });
        }
        if (navButtons.length) {
          inlineKeyboard.inline_keyboard.push(navButtons);
        }
  
        // Send navigation controls if needed
        await bot.sendMessage(chatId, `📱 *Navigation Controls*\nPage ${page} of ${totalPages}`, {
          parse_mode: 'Markdown',
          reply_markup: inlineKeyboard
        });
      } else {
        await bot.sendMessage(chatId, '❌ No jobs available.', mainKeyboard);
      }
    } catch (error) {
      console.error('Error in showStaticJobsPage:', error);
      await bot.sendMessage(chatId, '⚠️ Error fetching jobs: ' + error.message, mainKeyboard);
    }
  }

module.exports = {handleGigs,showStaticJobsPage};
