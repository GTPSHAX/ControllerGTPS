let {Functions, execSync} = require("./modules/function"), commandsList = [];
Functions = new Functions();

Functions.print("Checking modules...");
const modules = ["discord.js", "fs"];

(async() => {
    // Checking and downloading module
    for (let i = 0; i < modules.length; i++) {
        await Functions.cekModule(modules[i]);
    }

    // Importing modules
    Functions.print("Importing modules...");
    const { Client, GatewayIntentBits, Collection } = require('discord.js');
    const fs = require('fs');

    // Reading config.json
    Functions.print("Reading config.json");
    const config = require("./config.json");

    
    // Main script
    // Definiton client bot
    const client = new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
        ],
      });
    client.commands = new Collection();

    // Reading and filtering comamnd files
    Functions.print("Loading commands...");
    const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
        commandsList.push(config.bot.prefix+command.name)
        Functions.print("Loaded command "+command.name+"!");
    }
    
    // Login to discord bot
    Functions.print("Login on discord bot...");
    await client.login(config.bot.token);
    Functions.print("Discord bot online!");
    
    // Message listener
    client.on("messageCreate", message => {
        if (!message.content.startsWith(config.bot.prefix) || message.author.bot) return; // Returning process if message not started with prefix or message from bot
    
        const args = message.content.slice(config.bot.prefix.length).split(/ +/); // Getting command name
        const commandName = args.shift().toLowerCase(); // Modify command name to lower case
    
        // Getting command with command name
        Functions.print(message.author.id)
        Functions.print(config.bot.allowed.includes(message.author.id))
        if (commandsList.includes(config.bot.prefix+commandName) && !config.bot.allowed.includes(message.author.id)) { // Returning process if user didn't have access
            message.reply(`You don't have access to use this command!`);
            return;
        }
        const command = client.commands.get(commandName);
    
        try {
            command.execute(message, commandsList, args); // Executing command
        } catch (error) {
            console.error(error);
            message.reply(`Command not found! \`${config.bot.prefix}cmd\` to see available commands`);
        }
    });
})();