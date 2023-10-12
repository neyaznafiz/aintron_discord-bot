import chat from "../data/chat-data.js";
import { ChannelType, Client, GatewayIntentBits, Partials } from "discord.js";

class DiscordBot {
  constructor(token) {
    this.token = token;
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
      ],
      partials: [Partials.Channel],
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
      console.log(`Discord Server Name: ${guild.name}`);
      // console.log(`Guild ID: ${guild.id}`);
      // console.log(`Guild Member: ${guild.memberCount}`);
    });
  }

  onMessageCreate(message) {
    const senderName = message.author.globalName || "";
    // console.log(`${message.author.globalName} says ${message}`);

    if (!message.author.bot && message.channel.type === ChannelType.DM) {
      message.channel.sendTyping();
      message.reply(`${chat.hey} ${senderName}! ${chat.pleasantries}`);
    } else if (!message.author.bot) {
      message.channel.sendTyping();
      message.reply(`${chat.hey} ${senderName}! ${chat.help}`);
    }
  }
}

export default DiscordBot;
