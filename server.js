const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const express = require("express");

require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome'))

if(process.env.environment == "PRODUCTION"){
  bot.launch({
    webhook:{
      
        domain: process.env.MY_HEROKU_URL,// Your domain URL (where server code will be deployed)
        hookPath: process.env.BOT_TOKEN,
        port: process.env.PORT || 8000
    }
  }).then(() => {
    console.info(`The bot ${bot.botInfo.username} is running on server`);
  });
} else { // if local use Long-polling
  bot.launch().then(() => {
    console.info(`The bot ${bot.botInfo.username} is running locally`);
  });
}