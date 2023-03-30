const  { Telegraf }  =require("telegraf");
const { message } =  require('telegraf/filters');
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on(message("text"), ctx => ctx.reply("Hello"));

// Start webhook via launch method (preferred)
bot.launch({
  webhook: {
    // Public domain for webhook; e.g.: example.com
    domain: process.env.MY_HEROKU_URL,

    // Port to listen on; e.g.: 8080
    port: 8080,

    // Optional path to listen for.
    // `bot.secretPathComponent()` will be used by default

    // Optional secret to be sent back in a header for security.
    // e.g.: `crypto.randomBytes(64).toString("hex")`
  },
});