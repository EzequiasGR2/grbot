const { ApplicationCommandOptionType } = require("discord.js");
const db = require("../mongoDB");

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { ButtonStyle } = require("discord.js");

module.exports = {
  name: "help",
  description: "Obtenha informações sobre o bot e comandos.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const musicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle("🎸 **Comandos de Música**")
        .addFields(
          {
            name: "🎹 Play",
            value:
              "Transmitir uma música a partir de um link fornecido ou texto de fontes",
          },
          {
            name: "⏹️ Stop",
            value:
              "Faz com que o bot pare de tocar música e saia do canal de voz",
          },
          {
            name: "📊 Queue",
            value: "Visualizar e gerenciar a fila de músicas deste servidor",
          },
          {
            name: "⏭️ Skip",
            value: "Pular a música que está sendo reproduzida",
          },
          {
            name: "⏸️ Pause",
            value: "Pausar a música que está sendo reproduzida",
          },
          { name: "▶️ Resume", value: "Retomar a música que está pausada" },
          {
            name: "🔁 Loop",
            value: "Alternar o modo de repetição para a fila e a música atual",
          },
          {
            name: "🔄 Autoplay",
            value:
              "Ativar ou desativar o autoplay [reproduzir músicas aleatórias]",
          },
          {
            name: "⏩ Seek",
            value: "Ir para um momento específico na música atual",
          },
          {
            name: "⏮️ Previous",
            value: "Reproduzir a música anterior na fila",
          },
          { name: "🔀 Shuffle", value: "Embaralhar as músicas na fila" },
        )
        .setImage(
          `https://cdn.discordapp.com/attachments/1004341381784944703/1165201249331855380/RainbowLine.gif?ex=654f37ba&is=653cc2ba&hm=648a2e070fab36155f4171962e9c3bcef94857aca3987a181634837231500177&`,
        );

      const basicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle("✨ **Comandos Básicos**")
        .addFields(
          { name: "🏓 Ping", value: "Verifique a latência do bot" },
          {
            name: "🗑️ Clear",
            value: "Limpar a fila de músicas deste servidor",
          },
          {
            name: "⏱️ Time",
            value: "Exibir o tempo de reprodução da música atual",
          },
          {
            name: "🎧 Filter",
            value: "Aplicar filtros para melhorar o som como você gosta",
          },
          {
            name: "🎵 Now Playing",
            value: "Exibir informações da música atualmente sendo reproduzida",
          },
          {
            name: "🔊 Volume",
            value:
              "Ajustar o volume da música [ouvir em volumes altos é arriscado]",
          },
        )
        .setImage(
          "https://c.tenor.com/9HwQBKqPChIAAAAC/tenor.gif",
        );
      const button1 = new ButtonBuilder()
        .setLabel("YouTube")
        .setURL("https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A")
        .setStyle(ButtonStyle.Link);

      const button2 = new ButtonBuilder()
        .setLabel("Discord")
        .setURL("https://discord.gg/FUEHs7RCqz")
        .setStyle(ButtonStyle.Link);

      const button3 = new ButtonBuilder()
        .setLabel("Code")
        .setURL("https://replit.com/@BEASTGAMERS1?tab=community")
        .setStyle(ButtonStyle.Link);

      const row = new ActionRowBuilder().addComponents(
        button1,
        button2,
        button3,
      );

      interaction
        .reply({
          embeds: [musicCommandsEmbed, basicCommandsEmbed],
        })
        .catch((e) => {});
    } catch (e) {
      console.error(e);
    }
  },
};
