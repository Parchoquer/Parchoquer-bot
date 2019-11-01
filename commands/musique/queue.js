const { MessageEmbed } = require('discord.js');
const playFile = require("./play.js");


module.exports = async (client, message) => {
    const queue = playFile.queue;
    if (!queue) return message.channel.send(`Il n'y a pas de musique en attente !`);
    const titleArray = [];
    queue.map(obj => {
        titleArray.push(obj.title);
    });
    var queueEmbed = new MessageEmbed()
        .setColor('#6432FF')
        .setTitle('Musique en attente')
        // .setImage("https://cdn.discordapp.com/attachments/635731474104057857/635740645490950149/Layer_0_1.png")
    for (let i = 0; i < titleArray.length; i++) {
        queueEmbed.addField(`${i + 1}:`, `${titleArray[i]}`);
    }
        return message.channel.send(queueEmbed);
};

