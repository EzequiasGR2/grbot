const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "queue",
  description: "Mostra a lista de reprodução.",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {

    try {

     const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: '⚠️ Nenhuma música tocando!!', ephemeral: true }).catch(e => { })
      if (!queue.songs[0]) return interaction.reply({ content: '⚠️ A fila está vazia!!', ephemeral: true }).catch(e => { })

      const trackl = []
      queue.songs.map(async (track, i) => {
        trackl.push({
          title: track.name,
          author: track.uploader.name,
          user: track.user,
          url: track.url,
          duration: track.duration
        })
      })

      const backId = "emojiVoltar"
      const forwardId = "emojiAvançar"
      const backButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "⬅️",
        customId: backId
      });

      const deleteButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "❌",
        customId: "fechar"
      });

      const forwardButton = new ButtonBuilder({
        style: ButtonStyle.Secondary,
        emoji: "➡️",
        customId: forwardId
      });


      let quantidade = 8
      let pagina = 1
      let a = trackl.length / quantidade

      const generateEmbed = async (inicio) => {
        let contador = pagina === 1 ? 1 : pagina * quantidade - quantidade + 1
        const atual = trackl.slice(inicio, inicio + quantidade)
        if (!atual || !atual?.length > 0) return interaction.reply({ content: '⚠️ A fila está vazia!!', ephemeral: true }).catch(e => { })
        return new EmbedBuilder()
          .setTitle(`${interaction.guild.name}  Fila de Reprodução`)
          .setThumbnail(interaction.guild.iconURL({ size: 2048, dynamic: true }))
          .setColor(client.config.embedColor)
          .setDescription(`▶️ Tocando agora: \`${queue.songs[0].name}\`
    ${atual.map(data =>
            `\n\`${contador++}\` | [${data.title}](${data.url}) | (Executado por <@${data.user.id}>)`
          )}`)
          .setFooter({ text: `Página ${pagina}/${Math.floor(a + 1)}` })
      }

      const cabeEmUmaPagina = trackl.length <= quantidade

      await interaction.reply({
        embeds: [await generateEmbed(0)],
        components: cabeEmUmaPagina
          ? []
          : [new ActionRowBuilder({ components: [deleteButton, forwardButton] })],
        fetchReply: true
      }).then(async Message => {
        const filtro = i => i.user.id === interaction.user.id
        const coletor = Message.createMessageComponentCollector({ filtro, time: 120000 });

        let currentIndex = 0
        coletor.on("collect", async (button) => {
          if (button?.customId === "fechar") {
            coletor?.stop()
           return button?.reply({ content: 'Comando cancelado', ephemeral: true }).catch(e => { })
          } else {

            if (button.customId === backId) {
              pagina--
            }
            if (button.customId === forwardId) {
              pagina++
            }

            button.customId === backId
              ? (currentIndex -= quantidade)
              : (currentIndex += quantidade)

            await interaction.editReply({
              embeds: [await generateEmbed(currentIndex)],
              components: [
                new ActionRowBuilder({
                  components: [
                    ...(currentIndex ? [backButton] : []),
                    deleteButton,
                    ...(currentIndex + quantidade < trackl.length ? [forwardButton] : []),
                  ],
                }),
              ],
            }).catch(e => { })
            await button?.deferUpdate().catch(e => { })
          }
        })

        coletor.on("end", async (button) => {
          button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("⬅️")
              .setCustomId(backId)
              .setDisabled(true),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("❌")
              .setCustomId("fechar")
              .setDisabled(true),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("➡️")
              .setCustomId(forwardId)
              .setDisabled(true))

          const embed = new EmbedBuilder()
            .setTitle('Timeout do Comando')
            .setColor(`#ecfc03`)
            .setDescription('▶️ Execute o comando de fila novamente!!')
          return interaction?.editReply({ embeds: [embed], components: [button] }).catch(e => { })

        })
      }).catch(e => { })

    } catch (e) {
    console.error(e); 
  }
  }
}