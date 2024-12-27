require('dotenv').config();
const { Telegraf } = require('telegraf');
const { link } = require('telegraf/format');
const { getYoutubeLink } = require('./index');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

function isYouTubeUrl(message) {
  const urlRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(\&t=([a-zA-Z0-9_-]+))?$/;
  const youtubeRegex = /^(https?:\/\/)?(www\.)?youtu\.be\/([a-zA-Z0-9_-]+)$/;

  return urlRegex.test(message.text) || youtubeRegex.test(message.text);
}

bot.use(async (ctx, next) => {
  if (isYouTubeUrl(ctx.message)) {
    console.log('ctx.message', ctx.message);
    
    // await ctx.reply('Detected YouTube link!');
    const url = await getYoutubeLink(ctx.message.text);
    const formattedLink = link('video', url)
    console.log('url', url);
    await ctx.reply(formattedLink);
  }
  next();
});

bot.start((ctx) => ctx.reply('Welcome'));
bot.on('message', async (ctx) => {
  // await ctx.reply(`You said: ${ctx.message.text}`);
});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));