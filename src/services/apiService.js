const axios = require('axios');
const { AUTH } = require('../config/config');
async function getAllGigs(resultsPerPage = 10, order = 'newest', maxGigs = 20) {
  let page = 1;
  let allGigs = [];
  let hasMore = true;

  while (hasMore && allGigs.length < maxGigs) {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://sproutgigs.com/api/gigs/get-gigs.php',
        headers: {
          'Authorization': `Basic ${AUTH}`,
          'Content-Type': 'application/json'
        },
        data: {
          page,
          results_per_page: resultsPerPage,
          order
        }
      });

      const { gigs } = response.data;

      if (gigs && gigs.length > 0) {
        const remainingCount = maxGigs - allGigs.length;
        const gigsToAdd = gigs.slice(0, remainingCount);
        allGigs = allGigs.concat(gigsToAdd);
        page++;
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error(`Error fetching gigs on page ${page}:`, error.message);
      throw new Error(`Failed to fetch gigs: ${error.message}`);
    }
  }
  return allGigs;
}

module.exports = {
  getAllGigs
};