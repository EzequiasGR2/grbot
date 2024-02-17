const db = require("../mongoDB");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "resume",
  description: "Reproduzir a música pausada.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guild.id);

    try {
      if (!queue) {
        return interaction.reply({ content: '⚠️ A fila está vazia!!', ephemeral: true });
      }

      if (!queue.paused) {
        return interaction.reply({ content: '⚠️ Nenhuma música pausada!!', ephemeral: true });
      }

      const sucesso = queue.resume();

      const embed = new EmbedBuilder()
        .setColor('#7645fe')
        .setAuthor({
          name: 'Música Resumida',
          iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157296313549983846/8929-purple-play-icon.png?ex=651817ae&is=6516c62e&hm=e33c4bc838d9634ecfbc8e99&',
          url: 'https://discord.gg/FUEHs7RCqz'
        })
        .setDescription(sucesso ? '**A música volta à vida!!**' : '❌ Erro: Não foi possível retomar a música')
        
      return interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  },
};