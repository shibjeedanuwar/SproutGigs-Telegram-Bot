const fs = require('fs');
const rankingsData = JSON.parse(fs.readFileSync('./src/data/rankings.json', 'utf8'));

const countryFlags = {
    'Azerbaijan': '🇦🇿',
    'Venezuela': '🇻🇪',
    'Egypt': '🇪🇬',
    'Philippines': '🇵🇭',
    'Brazil': '🇧🇷',
    'Indonesia': '🇮🇩',
    'Morocco': '🇲🇦',
    'Vietnam': '🇻🇳',
    'Colombia': '🇨🇴',
    'Mozambique': '🇲🇿',
    'India': '🇮🇳',
    'Argentina': '🇦🇷',
    'Sri Lanka': '🇱🇰',
    'Turkey': '🇹🇷',
    'Nigeria': '🇳🇬',
    'Uganda': '🇺🇬',
    'Bangladesh': '🇧🇩',
    'Nepal': '🇳🇵',
    'Kenya': '🇰🇪',
    'Madagascar': '🇲🇬',
    'Pakistan': '🇵🇰',
    'Algeria': '🇩🇿',
};

function getTotalPages(pageSize) {
    return Math.ceil(rankingsData.length / pageSize);
}

function rank() {
    return rankingsData.map(user => {
        return {
            ...user,
            flag: countryFlags[user.country] || '' // Default to empty string if country not found
        };
    });
}

module.exports = { getTotalPages, rank, rankingsData };