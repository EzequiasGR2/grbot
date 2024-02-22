const { ApplicationCommandOptionType } = require("discord.js");
const db = require("../mongoDB");

module.exports = {
  name: "owner",
  description: "Obtenha informações sobre o dono do bot.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const youtubeLink =
        "https://www.youtube.com/channel/UC5a59pm4SW2D8QYyyYsOE6w";
      const InstagramLink = "https://www.instagram.com/ezequiasgr_2/";
      const { EmbedBuilder } = require("discord.js");
      const embed = new EmbedBuilder()
        .setColor("#da2a41")
        .setAuthor({
          name: "Proprietário",
          iconURL:
            "https://cdn.discordapp.com/attachments/1156866389819281418/1157310253520662638/2443-iconperson.png?ex=651824aa&is=6516d32a&hm=4f8d2da4ddeae7f47d98a5a3&",
          url: "https://discord.gg/FUEHs7RCqz",
        })
        .setDescription(
          `__**Sobre mim**__:\n\n ▶️ robei o codigo do github!😅 \n YouTube : ❤️ [EzequiasGR2](${youtubeLink})\n Instagram : 💙 [ezequiasgr_2](${InstagramLink})`,
        )
        .setTimestamp();
      interaction.reply({ embeds: [embed] }).catch((e) => {});
    } catch (e) {
      console.error(e);
    }
  },
};
