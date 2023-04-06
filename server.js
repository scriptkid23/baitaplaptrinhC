const { Telegraf } = require("telegraf");
const express = require("express");
const { message } = require("telegraf/filters");
const axios = require("axios");

const handleSendImageUsingGPT = async (ctx, message) => {
  let bodyContent = JSON.stringify({
    "prompt": message,
    "n": 1,
    "size": "1024x1024",
  });

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.CHAT_GPT_TOKEN}`,
  };

  let reqOptions = {
    url: "https://api.openai.com/v1/images/generations",
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };
  try {
    await ctx.telegram.sendChatAction(ctx.message.chat.id, "typing");
    let response = await axios.request(reqOptions);
    await ctx.replyWithPhoto(response.data.data[0].url)
   
  } catch (error) {
    await ctx.telegram.sendMessage(ctx.message.chat.id, error?.message);
  }

}
const handleMessageUsingGPT = async (ctx, message) => {
  let bodyContent = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message}],
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
};

const start = async () => {
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

  bot.command("msg", async (ctx) => {
    const regex = /(\/msg)?(.*)/im;
    let msg_raw = ctx.update.message.text;
    let msg = regex.exec(msg_raw)[2];
    if (msg === "") return;

    await handleMessageUsingGPT(ctx, msg);
  });

  bot.command("img", async (ctx) => {
    const regex = /(\/img)?(.*)/im;
    let msg_raw = ctx.update.message.text;
    let msg = regex.exec(msg_raw)[2];
    if (msg === "") return;

    await handleSendImageUsingGPT(ctx, msg);
  })
  bot.on(message("text"), async (ctx) => {});

  // if (process.env.ENVIRONMENT.toLowerCase() === "production") {
  //   expressApp.use(
  //     await bot.createWebhook({
  //       domain: process.env.WEB_HOOK_DOMAIN,
  //       path: process.env.BOT_TOKEN,
  //     })
  //   );
  // }

  bot.startPolling();
};

start();
