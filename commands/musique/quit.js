const playFile = require("./play.js");

module.exports = (client, message) => {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send(
        "❌ **Vous devez être dans un salon vocal pour utiliser cette commande**"
        );

    var dispatcher = playFile.dispatcher;

    if (typeof dispatcher == 'undefined') {
      return message.channel.send(`Il n\'y a pas de musique en ce moment`);
    }
    if (!playFile.queue) return message.channel.send(`Il n'y a pas de musique en attente !`);
    playFile.queue.length = 0;
    dispatcher.end();
    return;
};