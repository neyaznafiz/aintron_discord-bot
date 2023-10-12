import { ChannelType, Client, GatewayIntentBits } from "discord.js";

class DiscordBot {
  constructor(token) {
    this.token = token;
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
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
    this.client.on("messageCreate", (message) => this.onMessageCreate(message));
  }

  onReady() {
    console.log("Bot is online");
    this.client.guilds.cache.forEach((guild) => {
      console.log(`Guild Name: ${guild.name}`);
      console.log(`Guild ID: ${guild.id}`);
      console.log(`Guild Member: ${guild.memberCount}`);
    });
  }

  onMessageCreate(message) {
    console.log(`${message.author.globalName} says ${message}`);
    console.log(message.author);
    if (!message.author.bot && message.channel.type === ChannelType.DM) {
      message.channel.sendTyping();
      message.reply(`Hi ${message.author.globalName}! How are you ?`);
    }
  }
}

export default DiscordBot;
