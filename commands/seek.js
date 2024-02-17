const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "seek",
  description: "Pular para o horário especificado",
  permissions: "0x0000000000000800",
  options: [{
    name: "time",
    description: "Digite o horário",
    type: ApplicationCommandOptionType.String,
    required: true
  }],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {

      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Nenhuma música tocando!!`, ephemeral: true }).catch(e => { })

      let posicao = getSeconds(interaction.options.getString("position"))
      if(isNaN(posicao)) return interaction.reply({ content: `uso: 2:40`, ephemeral: true }).catch(e => { })

      queue.seek(posicao)
      interaction.reply({ content: `▶️ **Levando você em uma jornada de viagem no tempo para o horário especificado.**`}).catch(e => { })

    } catch (e) {
      console.error(e);
    }
  },
};

function getSeconds(str) {
    if (!str) {
        return 0; 
    }

    var p = str.split(':');
    var s = 0;
    var m = 1;
    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    return s;
}