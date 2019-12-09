const { MessageEmbed, MessageAttachment } = require('discord.js');
const Youtube = require('simple-youtube-api');
const Canvas = require("canvas");
const ytdl = require('ytdl-core');
const { YOUTUBEAPI } = require('../../config');
const youtube = new Youtube(process.env.YOUTUBEAPI);

var queue = [];
var isPlaying;

module.exports = async (client, message, args) => {
    if (!args[0])
    return message.reply(`\nSyntaxe: !play ***<Url Youtube ou tapez votre recherche>***`);

    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send(
        "❌ **Vous devez être dans un salon vocal pour utiliser cette commande**"
        );

    let rech = args.join(" ");
    if (rech.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
        const url = rech;
        try {
            rech = rech
                .replace(/(>|<)/gi, '')
                .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            const id = rech[2].split(/[^0-9a-z_\-]/i)[0];
            const video = await youtube.getVideoByID(id);

            // commenter pour autoriser la lecture de stream 
            if (video.raw.snippet.liveBroadcastContent === "live") {
                return message.channel.send("❌ **La lecture des flux direct n'est pas supporter !**");
            }

            const title = video.title;
            let duration = formatDuration(video.duration);
            const thumbnail = video.thumbnails.high.url;
            if (duration == '00:00') duration = 'Live Stream';
            const song = {
                url,
                title,
                duration,
                thumbnail,
                voiceChannel
            };

            if (queue.length > 10) {
                return message.channel.send(
                    "**La queue est pleine, attendez un peut** ⏳"
                );
            }

            queue.push(song);
            if (isPlaying == false || typeof isPlaying == 'undefined') {
                isPlaying = true;
                return playSong(queue, message);
            } 
            else if (isPlaying == true) {
                return message.channel.send(`${song.title} **ajouter a la queue** :white_check_mark:`);
            }
        } 
        catch (err) {
            console.error(err);
            return message.channel.send(`❌ **Quelque chose s'est mal passé, veuillez essayer plus tard**`);
        }
    }

    try {
        const videos = await youtube.searchVideos(rech, 7);
        if (videos.length < 7) {
            return message.channel.send(
                `❌ **J\'ai du mal à comprendre votre recherche, veuillez réessayer**`
            );
        }
        const vidNameArr = [];
        for (let i = 0; i < videos.length; i++) {
            vidNameArr.push(`${i + 1}: ${videos[i].title}`);
        }
        vidNameArr.push('exit');

        const canvas = Canvas.createCanvas(800, 600);
        const ctx = canvas.getContext('2d');
        const imgMusic = await Canvas.loadImage("./././img/logoMusicv1.png");
        
        ctx.drawImage(imgMusic, 0, 0);
        ctx.font = "25px fast99";
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fillText(vidNameArr[0], 10, 100);
        ctx.fillText(vidNameArr[1], 10, 155);
        ctx.fillText(vidNameArr[2], 10, 210);
        ctx.fillText(vidNameArr[3], 10, 265);
        ctx.fillText(vidNameArr[4], 10, 320);
        ctx.fillText(vidNameArr[5], 10, 375);
        ctx.fillText(vidNameArr[6], 10, 430);

        const attachmentMusic = new MessageAttachment(
            canvas.toBuffer(),
            "imgMusic.png"
        );
        var songEmbed = await message.channel.send(attachmentMusic);

        try {
            var response = await message.channel.awaitMessages(
                msg => (msg.content > 0 && msg.content < 6) || msg.content === 'exit',
                {
                    max: 1,
                    maxProcessed: 1,
                    time: 30000,
                    errors: ['time']
                }
            );
            var videoIndex = parseInt(response.first().content);
        } 
        catch (err) {
            console.error(err);
            return message.channel.send("❌ **Vous avez mis trop de temps a répondre, veuillez réessayer et entrez un nombre compris entre 1 et 5**");
        }

        if (response.first().content === 'exit') return; //songEmbed.delete();

        try {
            var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
            if (video.raw.snippet.liveBroadcastContent === 'live') {
                songEmbed.delete();
                return message.channel.send("❌ **Les flux en direct ne sont pas autoriser**");
                }
        }
        catch (err) {
            console.error(err);
            return message.channel.send(`❌ **Une erreur est survenue lors de la tentative d\'obtention de l\'identifiant vidéo de youtube**`);
        }

        const url = `https://www.youtube.com/watch?v=${video.raw.id}`;
        const title = video.title;
        let duration = formatDuration(video.duration);
        const thumbnail = video.thumbnails.high.url;
        try {
            if (duration == '00:00') duration = 'Live Stream';
            const song = {
                url,
                title,
                duration,
                thumbnail,
                voiceChannel
            };

            if (queue.length > 10) {
                return message.channel.send(
                    '**La queue est pleine! Attendez un peut**'
                );
            }
            queue.push(song);
            if (isPlaying == false || typeof isPlaying == 'undefined') {
                isPlaying = true;
                playSong(queue, message);
            } 
            else if (isPlaying == true) {
                return message.channel.send(`${song.title} **ajouter a la queue** :white_check_mark:`);
            }
        } 
        catch (err) {
            console.error(err);
            return message.channel.send(`processus de file d'attente a mal tourné`);
        }
    }
    catch (err) {
        console.error(err);
        if (songEmbed) {
        }
        return message.channel.send('❌ **Une erreur s\'est produite lors de la recherche**');
    }
};

function playSong(queue, message) {
  let voiceChannel;
  queue[0].voiceChannel
    .join()
    .then(connection => {
    const dispatcher = connection
        .play(
            ytdl(queue[0].url, {
                volume: 0.1,
                quality: 'highestaudio',
                highWaterMark: 1024 * 1024 * 10
            })
        )

        .on('start', () => {
            module.exports.dispatcher = dispatcher;
            module.exports.queue = queue;
            voiceChannel = queue[0].voiceChannel;
            const videoEmbed = new MessageEmbed()
                .setThumbnail(queue[0].thumbnail)
                .setColor('#6432FF')
                .addField(':arrow_down: En lecure ', queue[0].title)
                .addField(':timer: Durée ', queue[0].duration);
            if (queue[1]) videoEmbed.addField('Musique suivante:️', queue[1].title);
            message.channel.send(videoEmbed);
            return queue.shift();
        })

        .on('finish', () => {
            if (queue.length >= 1) {
            return playSong(queue, message);
            } else {
                isPlaying = false;
            return voiceChannel.leave();
            }
        })

        .on('error', e => {
            message.channel.send('❌ Impossible de jouer la musique');
            console.error(e);
            return voiceChannel.leave();
        });
    })
    .catch(e => {
      console.error(e);
      return voiceChannel.leave();
    });
}

function formatDuration(durationObj) {
    const duration = `${durationObj.hours ? durationObj.hours + ':' : ''}${
        durationObj.minutes ? durationObj.minutes : '00'
    }:${
        durationObj.seconds < 10
        ? '0' + durationObj.seconds
        : durationObj.seconds
        ? durationObj.seconds
        : '00'
    }`;
    return duration;
}