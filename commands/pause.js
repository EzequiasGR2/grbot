const db = require("../mongoDB");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "pause",
  description: "Para a reprodução da música atual.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guild.id);

    try {
      if (!queue || !queue.playing) {
        return interaction.reply({ content: '⚠️ Nenhuma música tocando!!', ephemeral: true });
      }

      const success = queue.pause();

      const embed = new EmbedBuilder()
        .setColor('#7645fe') 
        .setAuthor({
          name: 'Pause na Música',
          iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157296313013117049/8061-purple-pause-icon.png?ex=651817ae&is=6516c62e&hm=67440a1134550b846b5693b9&',
          url: 'https://discord.gg/FUEHs7RCqz'
        })
        .setDescription(success ? '**A música foi pausada por um momento!!**' : '❌ Erro no comando: Não foi possível pausar a música')
        

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  },
};