const {handleStart} = require('./start');
const {handleMicroJobsRanking} = require('./microJobsRanking');
const handleHelp = require('./help');
const { handleBrowseGigs } = require('./browseGigs');
const { mainKeyboard } = require('../utils/keyboard');
const { handleGigs } = require('./gigs');
const  handleOtherCommands  = require('./otherCommands');

function init(bot, userStates) {
    handleStart(bot,mainKeyboard);
    handleMicroJobsRanking(bot, userStates);
    handleGigs(bot);
    handleHelp(bot,mainKeyboard);
    handleBrowseGigs(bot, userStates);
    handleOtherCommands(bot,mainKeyboard);
}

module.exports = { init };
