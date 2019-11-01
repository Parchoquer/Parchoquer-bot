const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
    const embedHelp = new MessageEmbed()
    .setTitle("Liste des commandes disponibles", "https://discord.js.org/#/docs/main/master/general/welcome")
    .setColor('#0099ff')
    // .setThumbnail(message.guild.iconURL())
    .addField(":play_pause: play", "Jouer de la musique", true)
    .addField(":information_source: info", `Voir les information\ndu serveur`, true)
    .setFooter(message.author.tag)
    .setTimestamp();
  message.channel.send(embedHelp);
};