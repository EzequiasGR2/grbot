const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "owner",
  description: "Obtenha informações sobre o dono do bot.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const youtubeLink = 'https://discord.gg/FUEHs7RCqz';
      const InstagramLink = 'https://www.instagram.com/rtxxgg/';
      const { EmbedBuilder } = require('discord.js')
        const embed = new EmbedBuilder()
            .setColor('#da2a41')
            .setAuthor({
          name: 'Proprietário',
          iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157310253520662638/2443-iconperson.png?ex=651824aa&is=6516d32a&hm=4f8d2da4ddeae7f47d98a5a3&',
          url: 'https://discord.gg/FUEHs7RCqz'
        })
            .setDescription(`__**Sobre mim**__:\n\n ▶️ Me chamo Shiva, também conhecido como RTX. Sou um desenvolvedor de bots do discord e desenvolvedor web. Eu amo jogar, assistir anime e construir diferentes aplicações webserver. Você receberá respostas mais rápidas no Instagram do que em outras mídias sociais. Sinta-se à vontade para entrar em contato comigo!\n YouTube : ❤️ [RTX GAMING](${youtubeLink})\n Instagram : 💙 [rtxxgg](${InstagramLink})`)
            .setTimestamp();
      interaction.reply({ embeds: [embed] }).catch(e => {});

    } catch (e) {
    console.error(e); 
  }
  },
};