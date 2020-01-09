const playFile = require("./play.js");

module.exports = async (client, message) => {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send("❌ Vous devez être dans un salon vocal pour utiliser cette commande");

    var dispatcher = playFile.dispatcher;

    if (typeof dispatcher == "undefined") {
        return message.channel.send(`Il n\'y a pas de musique en ce moment`);
    };
    var queue = message.guild.musicData.queue;
    if (queue >= 1) {
        queue.shift();
        return playFile.playSong(queue, message);
    }
    else {
        message.channel.send(`Musique suivante! :track_next:`);
        dispatcher.end();
    };
};