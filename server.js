const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const express = require("express");

require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
const start = async () => {
  app.use(await bot.createWebhook({ domain: process.env.MY_HEROKU_URL }));
  bot.on(message("text"), (ctx) => ctx.reply("Hello"));
  app.listen(process.env.PORT, () => console.log("Listening on port", process.env.PORT));
};
start();
// Start webhook via launch method (preferred)
