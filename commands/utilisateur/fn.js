const Fortnite = require("fortnite");
const Canvas = require("canvas")
const { MessageAttachment } = require("discord.js");
const { TNF } = require("../../config")
const fortniteclient = new Fortnite(process.env.TNF);

module.exports = async (client, message, args, settings) => {
    if (!args.join(" "))
    return message.reply(`Seulement pour PC!\nSyntaxe: **${settings.prefix}fn 'Pseudo'**`);
    
    var userName = args.join(" ");
    const myCanvas = Canvas.createCanvas(585, 308);
    const ctx = myCanvas.getContext('2d');
    const myImg = await Canvas.loadImage("./././img/fortnite_stats.png");
    
    fortniteclient.user(userName, "pc").then( data => {
        var namePlayer = args.join(" ");
        var wins = data.stats.lifetime.wins;
        var matchPlayed = data.stats.lifetime.matches;
        var kills = data.stats.lifetime.kills;
        var ratio = data.stats.lifetime.kd;
        var top3 = data.stats.lifetime.top_3;
        var top6 = data.stats.lifetime.top_6;
        var top12 = data.stats.lifetime.top_12;
        var top25 = data.stats.lifetime.top_25;

        ctx.drawImage(myImg, 0, 0,);
        ctx.font = "35px Dyuthi";
        ctx.fillStyle = ("rgba(255, 255, 255, 1");
        ctx.textAlign = "center"
        ctx.fillText(namePlayer, 290, 50);
        ctx.fillText(wins, 78, 150);
        ctx.fillText(ratio, 220, 150);
        ctx.fillText(matchPlayed, 362, 150);
        ctx.fillText(kills, 503, 150);
        ctx.fillText(top3, 78, 245);
        ctx.fillText(top6, 220, 245);
        ctx.fillText(top12, 362, 245);
        ctx.fillText(top25, 503, 245);

        const attachment = new MessageAttachment(
            myCanvas.toBuffer(),
            "statsFortnite.png"
        );

        message.channel.send(attachment);
    })
    
    .catch(err => {
        console.log(err);
        message.channel.send("Joueur introuvable !");
    })
    // fortniteclient.store().then(console.log);
};