const { MessageEmbed } = require("discord.js");

module.exports = (client, message, settings) => {
  // console.log(settings)
    const embedHelp = new MessageEmbed()
    .setTitle("__**Liste des commandes disponibles:**__")
    .setDescription("  \n__**Musique**__:\n``play`` ``queue`` ``pause`` ``resume`` ``skip`` ``quit``\n\n__**Utilisateur**__:\n``img`` ``info`` ``ping`` ``fn`` ``help`` \n\n__**Adminisrateur**__:\n``clear`` ``config`` ``role``")
    // .addField(":paperclip: ", `${settings.prefix}`, false)
    .setColor('#0099ff')
    .setFooter(message.author.tag)
    .setTimestamp();
  message.channel.send(embedHelp);
};