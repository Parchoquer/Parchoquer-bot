const Fortnite = require("fortnite");
const { MessageEmbed } = require("discord.js");
const { TNF } = require('../../config')
const fortniteclient = new Fortnite(process.env.TNF);

module.exports = async (client, message, args) => {
    if (!args[0])
    return message.reply(`\nSyntaxe: !fn ***<Pseudo> <Platforme>***`);
    if (!args[1])
    return message.reply(`\nSyntaxe: !fn ***<Pseudo> <Platforme>***`)

    var userName = args[0];
    var Platfome = args[1];

    fortniteclient.user(userName, Platfome).then( data => {
        // console.log(data)
        const embedStats = new MessageEmbed()
        .setColor(`#00A7FF`)
        .setDescription(`**Top Placement**
                        \n**Top 3:** *${data.stats.lifetime.top_3}*
                        \n**Top 12:** *${data.stats.lifetime.top_12}*
                        \n**Top 25:** *${data.stats.lifetime.top_25}*`)
        .setTitle(`**Statistique de ${data.username}**`)
        .addField("**Matche Jouer**", data.stats.lifetime.matches, true)
        .addField("**Victoire**", data.stats.lifetime.wins, true)
        .addField("**Kills**", data.stats.lifetime.kills, true)
        .addField("**Ratio K/D**", data.stats.lifetime.kd, true)
        message.channel.send(embedStats);
    })
    
    .catch(err => {
        console.log(err);
        message.channel.send("Joueur introuvable !");
    })
    // fortniteclient.store().then(console.log);
};