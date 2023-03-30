const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const axios = require("axios");

require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.on(message("text"), async (ctx) => {
  let bodyContent = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: ctx.update.message.text }],
  });
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer ?"
  };
  let reqOptions = {
    url: "https://api.openai.com/v1/chat/completions",
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };
  await ctx.telegram.sendChatAction(ctx.message.chat.id,"typing")
  let response = await axios.request(reqOptions);
  await ctx.telegram.sendMessage(ctx.message.chat.id, response.data.choices.at(-1).message['content']);
});
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
