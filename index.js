const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const port = 3000;



const token = 'grtprsn_bot';


const bot = new TelegramBot(token, { polling: true });


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const username = msg.chat.username;

  bot.sendMessage(chatId, `Hello ${username}! Welcome to the bot.`);
});


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});