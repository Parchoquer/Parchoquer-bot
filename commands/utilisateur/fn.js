const Fortnite = require("fortnite");
const { MessageEmbed } = require("discord.js");
const { TNF } = require('../../config')
const fortniteclient = new Fortnite(process.env.TNF);

module.exports = async (client, message, args, settings) => {
    if (!args.join(" "))
    return message.reply(`Seulement pour PC!\nSyntaxe: **${settings.prefix}fn 'Pseudo'**`);
    
    var userName = args.join(" ");
    
    fortniteclient.user(userName, "pc").then( data => {
        // console.log(data)
        const embedStats = new MessageEmbed()
        .setColor(`#00A7FF`)
        .setTitle(`**${data.username}**`)
        .setDescription(`**Top Placement**
        \n**Top 3:** *${data.stats.lifetime.top_3}*
        \n**Top 12:** *${data.stats.lifetime.top_12}*
        \n**Top 25:** *${data.stats.lifetime.top_25}*`)
        .addField("**Matche Jouer**", data.stats.lifetime.matches, true)
        .addField("**Victoire**", data.stats.lifetime.wins, true)
        .addField("**Kills**", data.stats.lifetime.kills, true)
        .addField("**Ratio K/D**", data.stats.lifetime.kd, true)
        .setThumbnail("https://cdn.discordapp.com/attachments/635731474104057857/651914748946022400/fortnite-logo-playstation-4-battle-royale-game-png-favpng-hwMWq5rmfvQpqsN5DHNvGgGk7.png")
        message.channel.send(embedStats);
    })
    
    .catch(err => {
        console.log(err);
        message.channel.send("Joueur introuvable !");
    })
    // fortniteclient.store().then(console.log);
};