const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const token = 'grtprsn_bot'; // Replace with your Telegram Bot token

// Serve static files (e.g., index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Telegram Bot
const bot = new TelegramBot(token, { polling: true });

// Handle /start command to send the HTML file with a greeting button
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username=msg.chat.username

  bot.sendMessage(`Hello ${username}` );
});

// Handle request to fetch user data
app.get('/user', (req, res) => {
  const user = req.query.user; // Assuming you handle user data retrieval
  res.json({ first_name: user ? user.first_name : null });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
