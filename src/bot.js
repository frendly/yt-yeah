const { Telegraf } = require('telegraf');
const { link } = require('telegraf/format');
const { getYoutubeLink } = require('./utils/get-youtube-link');
const { isYouTubeUrl } = require('./utils/is-youtube-url');

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(async (ctx, next) => {
  if (isYouTubeUrl(ctx.message)) {
    await ctx.reply('Получаю видео');

    const url = await getYoutubeLink(ctx.message.text);
    const formattedLink = link('video', url)
    await ctx.reply(formattedLink);
  } else {
    await ctx.reply('Молодой человек! Я ПОНИМАЮ только ссылки на ютуб');
  }
  next();
});

bot.start((ctx) => ctx.reply('Welcome'));

bot.on('message', async (ctx) => {
  await ctx.reply(`You said: ${ctx.message.text}`);
});

// bot.launch();


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
module.exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body || '{}' ))
    return { statusCode: 200, body: "" }
  } catch (e) {
    console.error("error in handler:", e)
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
  }
}