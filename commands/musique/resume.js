const playFile = require("./play.js");

module.exports = (client, message) => {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send(
        "❌ Vous devez être dans un salon vocal pour utiliser cette commande"
        );
    const dispatcher = playFile.dispatcher;

    if (typeof dispatcher == 'undefined') {
    return message.channel.send(`Il n\'y a pas de musique en ce moment`);
    }
    message.channel.send('lecture :play_pause:');
    dispatcher.resume();
}