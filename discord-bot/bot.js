import { Client, GatewayIntentBits } from "discord.js";

class DiscordBot {
  constructor(token) {
    this.token = token;
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
  }

  async login() {
    try {
      this.client.login(this.token);
    } catch (error) {
      console.error("Error occurred to logging in!", error);
    }
  }

  listenEvents() {
    this.client.once("ready", () => this.onReady());
    this.client.on("messageCreate", (message)=> this.onMessageCreate())
  }

  onReady() {
    console.log("Bot is online");
    this.client.guilds.cache.forEach(guild => {
      console.log(`Guild Name: ${guild.name}`);
      console.log(`Guild ID: ${guild.id}`);
      console.log(`Guild Member: ${guild.memberCount}`);
      
    })
  }
}

export default DiscordBot;
