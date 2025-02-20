const mainKeyboard = {
  reply_markup: {
    keyboard: [
      ['/Browse Gigs', '/Get Gigs'],
      ['/MicroJobs Ranking', '/Help']
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Utility function to create pagination keyboard
function createPaginationKeyboard(currentPage, totalPages) {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          currentPage > 1 ? { text: '⏮ First', callback_data: 'page_1' } : null,
          currentPage > 1 ? { text: '◀️ Prev', callback_data: `page_${currentPage - 1}` } : null,
          { text: `📄 ${currentPage}/${totalPages}`, callback_data: 'current_page' },
          currentPage < totalPages ? { text: 'Next ▶️', callback_data: `page_${currentPage + 1}` } : null,
          currentPage < totalPages ? { text: 'Last ⏭', callback_data: `page_${totalPages}` } : null
        ].filter(Boolean)
      ]
    }
  };
}


module.exports = {
  mainKeyboard,
  createPaginationKeyboard
};