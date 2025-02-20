# SproutGigs Telegram Bot

## Project Overview
This project is a SproutGigs Telegram bot built using Node.js and the `node-telegram-bot-api` library. The bot is designed to interact with users and handle various commands related to gigs and micro jobs.

## Key Components:

1. **Main Entry Point**:
   - The bot is initialized in `src/index.js`, where it sets up command handlers and manages callback queries.

2. **Dependencies**:
   - **axios**: Used for making HTTP requests.
   - **node-telegram-bot-api**: The core library for interacting with the Telegram Bot API.

3. **Command Handling**:
   - Commands are organized in the `src/commands` directory, including functionalities for browsing gigs, providing help, and managing micro job rankings.
   - The command handlers are initialized in `src/commands/handlers.js`.

4. **Configuration**:
   - To set up the configuration, you need to create a configuration file in the `src/config` directory.
   - **Obtaining User ID from SproutGigs**:
     1. Log in to your account on [sproutgigs.com](https://sproutgigs.com).
     2. Navigate to your profile settings.
     3. Find your user ID in the profile settings page.
   - **Getting API Key from SproutGigs**:
     1. Log in to your account on [sproutgigs.com](https://sproutgigs.com).
     2. Navigate to your account settings.
     3. Find your API key in the account settings page.
   - **Creating a Telegram Bot and Obtaining Bot Token**:
     1. Open Telegram and search for [BotFather](https://t.me/botfather).
     2. Start a conversation with BotFather.
     3. Follow the instructions provided by BotFather to create a new bot.
     4. Obtain your bot token from BotFather after creating the bot.
   - Store the user ID, API key, and bot token in the configuration file as follows:

```javascript
const TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const USER_ID = 'YOUR_SPROUTGIGS_USER_ID';
const API_KEY = 'YOUR_SPROUTGIGS_API_KEY';

module.exports = { TOKEN, USER_ID, API_KEY };
```

5. **Utilities**:
   - Utility functions are located in the `src/utils` directory, providing helper functions for various tasks.

## How to Run
- To start the bot, run the following command:
  ```bash
  npm start
  ```

- Ensure that the necessary dependencies are installed by running:
  ```bash
  npm install
  ```

## License
This project is licensed under the ISC License.
