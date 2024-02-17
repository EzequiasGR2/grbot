const { EmbedBuilder } = require("discord.js");

exports.run = async (client, message, args) => {
  let semperm = new EmbedBuilder()
    .setDescription(`⚠ | você não tem permissão para usar esse comando!`);
  let embed1 = new EmbedBuilder()
    .setDescription(`⚠ | forneça um número de até **99 mensagens** a serem excluídas`);
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.reply({ embeds: [semperm] });
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 99)
    return message.reply({ embeds: [embed1] });

  const fetched = await message.channel.messages.fetch({
    limit: deleteCount + 1
  });
  message.channel.bulkDelete(fetched);
  message.channel.send(`**${args[0]} mensagens limpas nesse chat!**`)
    .then(msg => msg.delete({ timeout: 5000 }))
    .catch(error => console.log(`Não foi possível deletar mensagens devido a: ${error}`));
};