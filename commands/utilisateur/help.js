const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
    let settingGuild = await client.getGuild(message.guild);
    const embedHelp = new MessageEmbed()
    .setTitle("__**Liste des commandes disponibles:**__")
    .setDescription("  \n__**Musique**__:\n``play`` ``queue`` ``pause`` ``resume`` ``skip`` ``quit``\n\n__**Utilisateur**__:\n``img`` ``info`` ``ping`` ``fn`` ``help`` \n\n__**Adminisrateur**__:\n``clear`` ``config`` ``role``")
    .addField(":paperclip: ", `Préfix: ${settingGuild.prefix}`, false)
    .setColor('#0099ff')
    .setFooter(message.author.tag)
    .setTimestamp();
    message.channel.send(embedHelp);
};