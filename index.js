const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

let user={}

const app = express();
const port = process.env.PORT || 3000;
const token = '7261460030:AAHhZ-j1KXD1d9DWspXkTPTFhhGbxST5FU4'; // Replace with your Telegram Bot token

// Serve static files (e.g., index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Telegram Bot
const bot = new TelegramBot(token, { polling: true });

// Handle /start command to send the HTML file with a greeting button
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username=msg.chat.username

  user[`${chatId}`]=username
  

  bot.sendMessage(chatId,`Check the website on bot bro`);

});

// Handle request to fetch user data
app.get('/', (req, res) => {

  let chat=req.query.chatId
  let username=user[chat]

    res.send(`Hello ${username}`)
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
