const db = require("../mongoDB");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "clear",
  description: "Limpa a fila de músicas.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guild.id);
    
    try {
      if (!queue || !queue.playing) {
        return interaction.reply({ content: '⚠️ Nenhuma música sendo reproduzida!!', ephemeral: true });
      }

      if (!queue.songs[0]) {
        return interaction.reply({ content: '❌ Fila vazia!!', ephemeral: true });
      }

      await queue.stop(interaction.guild.id);

      const embed = new EmbedBuilder()
        .setColor('#3498db')
        .setAuthor({
          name: 'Lista Limpa',
          iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157314241393598585/4618-no-slides.png?ex=65182861&is=6516d6e1&hm=61e1bde7fed5f6a92543f951&',
          url: 'https://discord.gg/FUEHs7RCqz'
        })
        .setDescription('**Fila limpa! Esteja pronto para uma nova jornada musical.**');
       

      interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e); 
    }
  },
};