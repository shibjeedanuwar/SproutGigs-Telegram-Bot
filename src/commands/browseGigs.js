const { getAllGigs } = require('../services/apiService');
const { formatGigDetails } = require('../utils/formatGig');
const { mainKeyboard, createPaginationKeyboard } = require('../utils/keyboard');

function handleBrowseGigs(bot, userStates) {
    // Browse gigs command logic
    bot.onText(/Browse Gigs/, async (msg) => {
        const chatId = msg.chat.id;
        userStates.set(chatId, { currentPage: 1 });
        await showGigsPage(bot, chatId, 1);
      });


}
// Update showGigsPage function
async function showGigsPage(bot, chatId, page) {
    try {
      const gigsPerPage = 3;
      const gigs = await getAllGigs(20);
      const totalPages = Math.ceil(gigs.length / gigsPerPage);
      const startIndex = (page - 1) * gigsPerPage;
      const endIndex = startIndex + gigsPerPage;
      const pageGigs = gigs.slice(startIndex, endIndex);
      
      if (pageGigs.length > 0) {
        // Send header message
        await bot.sendMessage(chatId, `📋 *Showing Gigs ${startIndex + 1}-${endIndex} of ${gigs.length}*`, {
          parse_mode: 'Markdown'
        });
  
        // Send each gig
        for (const gig of pageGigs) {
          try {
            if (gig.cover_image) {
              await bot.sendPhoto(chatId, gig.cover_image);
            }
            
            await bot.sendMessage(chatId, formatGigDetails(gig), {
              parse_mode: 'Markdown',
              disable_web_page_preview: true,
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: '🔗 View on SproutGigs', url: gig.url || '#' },
                    { text: '💾 Save Gig', callback_data: `save_${gig.id}` }
                  ]
                ]
              }
            });
          } catch (gigError) {
            console.error(`Error sending gig ${gig.id}:`, gigError);
            continue;
          }
        }
  
        // Send navigation controls
        await bot.sendMessage(
          chatId, 
          `📱 *Navigation Controls*\nPage ${page} of ${totalPages}`, 
          {
            parse_mode: 'Markdown',
            ...createPaginationKeyboard(page, totalPages)
          }
        );
      } else {
        await bot.sendMessage(chatId, '❌ No more gigs available.', mainKeyboard);
      }
    } catch (error) {
      console.error('Error in showGigsPage:', error);
      await bot.sendMessage(chatId, '⚠️ Error fetching gigs: ' + error.message, mainKeyboard);
    }
  }

module.exports = {handleBrowseGigs,showGigsPage};  
