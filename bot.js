const { Client, GatewayIntentBits, Message, Partials, EmbedBuilder, InteractionType, Collection, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, ModalBuilder, TextInputBuilder, Intents, TextInputStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ChannelType, PermissionsBitField} = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { DeezerPlugin } = require("@distube/deezer");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { printWatermark } = require('./util/pw');
const config = require("./config.js");
const fs = require("fs");
const path = require('path');

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});

client.config = config;
client.player = new DisTube(client, {
  leaveOnStop: config.opt.voiceConfig.leaveOnStop,
  leaveOnFinish: config.opt.voiceConfig.leaveOnFinish,
  leaveOnEmpty: config.opt.voiceConfig.leaveOnEmpty.status,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin(),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
    new DeezerPlugin(),
  ],
});

const player = client.player;

fs.readdir("./events", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0]; 
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});
fs.readdir("./events/player", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const player_events = require(`./events/player/${file}`);
    let playerName = file.split(".")[0];
    player.on(playerName, player_events.bind(null, client));
    delete require.cache[require.resolve(`./events/player/${file}`)];
  });
});

client.commands = [];
fs.readdir(config.commandsDir, (err, files) => {
  if (err) throw err;
  files.forEach(async (f) => {
    try {
      if (f.endsWith(".js")) {
        let props = require(`${config.commandsDir}/${f}`);
        client.commands.push({
          name: props.name,
          description: props.description,
          options: props.options,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
});

//prefix hardler

client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.channel.type === 'DM') return;
  if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

  const args = message.content.trim().slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./basiccommands/${command}.js`);
    commandFile.run(client, message, args, config);
  } catch (err) {
    console.log(err);
  }
});

//goodbye & welcome.db

client.on('guildMemberAdd', member => {
  const guild = client.guilds.cache.get("1206410205907132496");
  const channel = guild.channels.cache.get("1206410206293008385");

  const welembed = new EmbedBuilder()
  .setColor("#7c2ae8")
  .setAuthor({
      name: member.user.tag,
      iconURL: member.user.displayAvatarURL()
  })
  .setTitle(`${member.user.username} entrou no servidor!`)
  .setImage("https://media.tenor.com/cM84j4ctDeMAAAAC/banner-anime.gif")
  .setDescription(`**${member.user.username}**, Olá, espero que você se divirta no meu servidor!`)
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
  
  channel.send({ embeds: [welembed] });
});

//////////////////////////////////////////////////////////////////////

client.on('guildMemberRemove', member => {
  const guild = client.guilds.cache.get("1206410205907132496");
  const channel = guild.channels.cache.get("1206410206293008386");

    const byeembed = new EmbedBuilder()
    .setColor("#7c2ae8")
    .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL()
    })
      .setTitle(`${member.user.username} saiu do servidor!`)
      .setImage("https://media.tenor.com/cM84j4ctDeMAAAAC/banner-anime.gif")
      .setDescription(`**${member.user.username}**, foi para o death note 📓!`)
      

  channel.send({ embeds: [byeembed] });
});

//botões
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId == 'verificar') {
    await interaction.member.roles.add("1206410205924040779");
    await interaction.reply("Você foi verificado com sucesso!").then(msg => msg.delete({timeout: 100000}))
  }

/*  if (interaction.customId == 'openticket') {
    openticket.run(client, interaction);
    await interaction.reply("Ticket solicitado com sucesso!").then(msg => msg.delete({timeout: 100000}))
  }

  if (interaction.customId == 'closeticket') {
    closeticket.run(client, interaction);
    await interaction.reply("Ticket fechado com sucesso!").then(msg => msg.delete({timeout: 100000}))
  }*/
}); 

//token

if (config.TOKEN || process.env.TOKEN) {
  client.login(config.TOKEN || process.env.TOKEN).catch((e) => {
    console.log('TOKEN ERROR❌❌');
  });
} else {
  setTimeout(() => {
    console.log('TOKEN ERROR❌❌');
  }, 2000);
}


if(config.mongodbURL || process.env.MONGO){
  const mongoose = require("mongoose")
  mongoose.connect(config.mongodbURL || process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }).then(async () => {
    console.log('\x1b[32m%s\x1b[0m', `|    🍔 Connected MongoDB!`)
  }).catch((err) => {
    console.log('\x1b[32m%s\x1b[0m', `|    🍔 Failed to connect MongoDB!`)})
  } else {
  console.log('\x1b[32m%s\x1b[0m', `|    🍔 Error MongoDB!`)
  }


const express = require("express");
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  const imagePath = path.join(__dirname, 'index.html');
  res.sendFile(imagePath);
});
app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
  console.log(`✨ Happy New Year Welcome To 2024`);
});
printWatermark();
