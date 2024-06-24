const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
    register(client) {
        client.commands.set(this.data.name, this);
        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;
            const { commandName } = interaction;
            if (commandName === this.data.name) {
                await this.execute(interaction);
            }
        });
    },
};
