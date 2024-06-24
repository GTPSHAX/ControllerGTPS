module.exports = {
    name: 'cmd',
    description: 'Showing command list',
    execute(message, commandsList) {
        let commands = "";
        commandsList.forEach(command  => {
            commands += "- " + command + "\n";
        });
        message.reply(`**Available commands:**\n\`\`\`${commands}\`\`\``);
    },
};