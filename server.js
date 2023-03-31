const { Telegraf } = require("telegraf");
const express = require("express");
const { message } = require("telegraf/filters");
const axios = require("axios");

const expressApp = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
expressApp.get("/", (req, res) => {
  res.send("Hello World!");
});



const bot = new Telegraf(process.env.BOT_TOKEN);

expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



bot.on(message("text"), async (ctx) => {
  let bodyContent = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: ctx.update.message.text }],
  });
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CHAT_GPT_TOKEN}`,
  };
  let reqOptions = {
    url: "https://api.openai.com/v1/chat/completions",
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };

  try {
    await ctx.telegram.sendChatAction(ctx.message.chat.id, "typing");
    let response = await axios.request(reqOptions);
    await ctx.telegram.sendMessage(
      ctx.message.chat.id,
      response.data.choices[0].message["content"]
    );
  } catch (error) {
    await ctx.telegram.sendMessage(ctx.message.chat.id, error?.message);
  }
});
bot.startPolling();
