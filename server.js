const fastify = require("fastify");

const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();

let token = process.env.BOT_TOKEN;
let chat_gpt_model = process.env.CHAT_GPT_MODEL;
let chat_gpt_token = process.env.CHAT_GPT_TOKEN;
let port = process.env.PORT;

let baseURL = "https://api.openai.com/v1/chat/completions";

const start = async () => {
  try {
    const bot = new Telegraf(token);
    const app = fastify();
    let webhookURL = process.env.MY_HEROKU_URL;

    bot.on(message("text"), async (ctx) => {
      let bodyContent = JSON.stringify({
        model: chat_gpt_model,
        messages: [{ role: "user", content: ctx.update.message.text }],
      });
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${chat_gpt_token}`,
      };
      let reqOptions = {
        url: baseURL,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };
      await ctx.telegram.sendChatAction(ctx.message.chat.id, "typing");
      let response = await axios.request(reqOptions);
      await ctx.telegram.sendMessage(
        ctx.message.chat.id,
        response.data.choices.at(-1).message["content"]
      );
    });

    app.listen({ port: port });
    bot.launch({
      webhook: {
        domain: webhookURL,
        hookPath: token,
        port: port,
      },
    });
  } catch (err) {
    console.log(err);
    app.log.error(err);
    process.exit(1);
  }
};
start();
