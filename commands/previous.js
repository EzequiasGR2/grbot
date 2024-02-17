const db = require("../mongoDB");

module.exports = {
  name: "previous",
  description: "Toca a faixa anterior.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Nenhuma música tocando!!`, ephemeral: true }).catch(e => { })
      try {
        let musicaAnterior = await queue.previous()
        interaction.reply({ content: `**Eis, a melodia encantadora do passado!!**` }).catch(e => { })
      } catch (e) {
        return interaction.reply({ content: `❌ Nenhuma faixa anterior!!`, ephemeral: true }).catch(e => { })
      }
    } catch (e) {
    console.error(e); 
  }
  },
};