const db = require("../mongoDB");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "autoplay",
  description: "Alternar o autoplay da fila.",
  options: [],
  permissions: "0x0000000000000800",
  run: async (client, interaction) => {
    try {
      const queue = client?.player?.getQueue(interaction?.guild?.id);
      if (!queue || !queue?.playing) {
        return interaction?.reply({ content: '⚠️ Nenhuma música sendo reproduzida!!', ephemeral: true });
      }

      queue?.toggleAutoplay();

      const embed = new EmbedBuilder()
        .setColor('#2f58fe')
        .setTitle('Sua Música, Sua Escolha!!')
        .setDescription(queue?.autoplay ? '**✅ Autoplay ATIVADO**' : '**❌ Autoplay DESATIVADO**');


      interaction?.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  },
};