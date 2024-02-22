const db = require("../../mongoDB");
const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
  if (queue) {
    if (!client.config.opt.loopMessage && queue?.repeatMode !== 0) return;
    if (queue?.textChannel) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: "Atualmente tocando uma faixa",
          iconURL:
            "https://cdn.discordapp.com/attachments/1140841446228897932/1144671132948103208/giphy.gif",
          url: "https://discord.gg/FUEHs7RCqz",
        })
        .setDescription(
          `\n ‎ \n▶️ **Detalhes :** **${song?.name}**\n▶️ **Aproveite a Experiência Musical Suprema. ** \n▶️ **Se o link quebrar, tente inserir um termo de pesquisa.**`,
        )
        .setImage(queue.songs[0].thumbnail)
        .setColor("#FF0000")
        .setFooter({ text: "Mais informações - Use o comando /help" });

      queue?.textChannel?.send({ embeds: [embed] }).catch((e) => {});
    }
  }
};
