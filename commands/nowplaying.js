const { EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "nowplaying",
  description: "Obtém informações da música atual.",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {

      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Nenhuma música sendo reproduzida!!`, ephemeral: true }).catch(e => { })

      const track = queue.songs[0];
      if (!track) return interaction.reply({ content: `⚠️ Nenhuma música sendo reproduzida!!`, ephemeral: true }).catch(e => { })

      const embed = new EmbedBuilder();
      embed.setColor(client.config.embedColor);
      embed.setThumbnail(track.thumbnail);
      embed.setTitle(track.name)
      embed.setDescription(`> **Áudio** \`%${queue.volume}\`
> **Duração :** \`${track.formattedDuration}\`
> **URL :** **${track.url}**
> **Modo de Repetição :** \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Toda a Fila' : 'Esta Música') : 'Desligado'}\`
> **Filtro**: \`${queue.filters.names.join(', ') || 'Desligado'}\`
> **Por :** <@${track.user.id}>`);


      interaction.reply({ embeds: [embed] }).catch(e => { })

    }  catch (e) {
    console.error(e); 
  }
  },
};