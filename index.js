import dovenv from "dotenv/config";
import { Client } from "discord.js";

try {
  const token = process.env.DISCORD_TOKEN;
  const client = new Client({ intents: [] });

  await client.login(token)
  client.once("ready", () => {
    console.log("Bot is live");
  })
} catch (error) {
  console.log(`Error: ${error.message}`);
  
}
