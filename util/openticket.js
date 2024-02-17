const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require("discord.js");

module.exports = {
  run: async (client, interaction) => {
    const channel = interaction.channel;

    const newChannel = await channel.guild.channels.create(`ticket-${!interaction.member.user.id}`, {
      type: 'text',
      permissionOverwrites: [
        {
          id: channel.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: interaction.member.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
        },
      ],
    });

    newChannel.send("O ticket será fechado automaticamente após 24 horas. Se precisar de mais assistência, reabra o ticket.").then(msg => {
      setTimeout(() => {
        newChannel.delete();
      }, 86400000); // 24 hours in milliseconds
    });

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('PRIMARY')
          .setLabel('Fechar Ticket')
          .setCustomId('closeticket')
      );
    const embed = new Discord.MessageEmbed()
      .setTitle("Ticket criado!")
      .setDescription("Use o botão abaixo para fechar o ticket.")
      .setColor('GREEN');

    await newChannel.send({ embeds: [embed], components: [row] });
  }
};