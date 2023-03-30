const {Telegraf} = require('telegraf')
const express = require('express')
const expressApp = express()
require("dotenv").config();
const port = process.env.PORT || 3000
expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})
expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.hears(/./, (ctx) => ctx.reply('Hello'))
bot.startPolling()