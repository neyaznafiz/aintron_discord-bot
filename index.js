import dovenv from "dotenv/config";
import DiscordBot from "./discord-bot/bot.js";

async function main() {
  try {
    const token = process.env.DISCORD_TOKEN;
    const bot = new DiscordBot(token);
    await bot.login();
    bot.listenEvents();
  } catch (error) {
    console.error("Error Occurred", error);
  }
}

main()