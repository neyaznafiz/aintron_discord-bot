import { chat } from "../data/content-data.js";
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
    let senderAnswer = "";

    let messageContentArray = message.content.toLowerCase().split(" ");
    for (let content of messageContentArray) {
      if (content === "fine" || "good") { senderAnswer = "pleasantries"; }
      else if (content === "hi" || "hello" || "hey") { senderAnswer = "wave"; }
    }

    if (!message.author.bot) {
      if (senderAnswer === "wave") {
        message.channel.sendTyping();
        message.reply(`${chat.hey} ${senderName}! ${chat.pleasantries}`);
      } else if (senderAnswer === "pleasantries") {
        message.channel.sendTyping();
        message.reply(`${chat.help}`);
      } else {
        message.channel.sendTyping();
        message.reply(`${chat.apologies}`);
      }
    }
  }
}

export default DiscordBot;
