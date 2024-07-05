const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const token = '7337053205:AAGQHD9AxMWny8nURm9PpPg0r2-jV8ATWXQ'; // Replace with your Telegram Bot token

const bot = new TelegramBot(token, { polling: true });

// Serve static files (e.g., index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.chat.username;

  // Respond with a link to the web app
  const link = `https://robitcoin.000webhostapp.com/home.html/?chatId=${chatId}&username=${encodeURIComponent(username)}`;
  bot.sendMessage(chatId, `Hello ${username}! Click this link to store your username: ${link}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
