const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "playsong",
  description: "Tocar uma faixa.",
  permissions: "0x0000000000000800",
  options: [
    {
      name: "normal",
      description: "Abrir música de outras plataformas.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "Digite o nome da música.",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    },
    {
      name: "playlist",
      description: "Digite o nome da sua playlist.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "Digite o nome da playlist que deseja criar.",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    },
  ],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      let stp = interaction.options.getSubcommand()

      if (stp === "playlist") {
        // Lógica da playlist aqui
      }

      if (stp === "normal") {
        const name = interaction.options.getString('name');
        if (!name) {
          return interaction.reply({ content: '▶️ Informe um texto ou link', ephemeral: true }).catch(e => {});
        }

        const embed = new EmbedBuilder()
          .setColor('#3498db')
          .setDescription('**🎸 Prepare-se para uma jornada musical!**');

        await interaction.reply({ embeds: [embed] }).catch(e => {});

        try {
          await client.player.play(interaction.member.voice.channel, name, {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction
          });
        } catch (e) {
          const errorEmbed = new EmbedBuilder()
            .setColor('#e74c3c')
            .setDescription('❌ Nenhum resultado encontrado!!');

          await interaction.editReply({ embeds: [errorEmbed], ephemeral: true }).catch(e => {});
        }
      }

    } catch (e) {
      const errorNotifer = require("../functions.js")
      errorNotifer(client, interaction, e, pint)
    }
  },
};