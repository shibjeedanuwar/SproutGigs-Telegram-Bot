// Utility function to format gig details
function formatGigDetails(gig) {
  const title = gig.title || 'No Title';
  const price = `$${gig.price || 'N/A'}`;
  const category = gig.category || 'N/A';
  const subcategory = gig.subcategory || 'N/A';
  const seller = gig.seller_nickname || 'N/A';
  const rating = gig.seller_rating_total || 'N/A';
  const totalGigs = gig.seller_gigs_total || 'N/A';
  const gigId = gig.id || 'N/A';

  return `
*${title}*

💰 *Price:* ${price}
📁 *Category:* ${category}
📂 *Subcategory:* ${subcategory}
👤 *Seller:* ${seller}
⭐ *Rating:* ${rating}
🎯 *Total Gigs:* ${totalGigs}
🆔 *Gig ID:* ${gigId}

_Click the button below to view or save this gig_`;
}


module.exports = { formatGigDetails };