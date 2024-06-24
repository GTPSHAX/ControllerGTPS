
let {Functions, execSync} = require("./modules/function");
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
    const { Client, Intents } = require('discord.js');
    const fs = require('fs');

    // Reading config.json
    Functions.print("Reading config.json");
    const config = require("./config.json");

    
    // Main script
    // Definiton client bot
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

    // Reading and filtering comamnd files
    const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    // Registering commands to discord API
    Functions.print("Registering commands...")
    for (const commandName of commands) {
        const command = require(`./commands/${commandName}`);
        command.register(client);
        Function.print(commandName+" has registered!")
    }

    // Login to Discord with your app's token
    Functions.print("Logging in...");
    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
    
    client.login(config.bot.token);
})();