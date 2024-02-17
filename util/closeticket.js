const { MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (client, interaction) => {
  const channel = interaction.channel;
  await channel.send("O ticket será fechado em breve.");
  setTimeout(() => {
    channel.delete();
  }, 5000);
};