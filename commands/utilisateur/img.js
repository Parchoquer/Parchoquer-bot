const fetch = require("node-fetch")
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, args) => {
    if (!args[0])
    return message.reply(`\nSyntaxe: !img ***<chien> <chat> <oiseau> <panda> <random>***`);

    if (args[0] === "chien") {
        const chien = await fetch("https://some-random-api.ml/img/dog")
        .then(res => res.json())
        .then(json => json.link);

        const embedChien = new MessageEmbed()
            .setImage(chien)
            .setTimestamp();
        message.channel.send(embedChien);
    }

    else if (args[0] === "chat") {
        const chat = await fetch("https://some-random-api.ml/img/cat")
        .then(res => res.json())
        .then(json => json.link);

        const embedChat = new MessageEmbed()
            .setImage(chat)
            .setTimestamp();
        message.channel.send(embedChat);
    }

    else if (args[0] === "oiseau") {
        const oiseau = await fetch("https://some-random-api.ml/img/birb")
        .then(res => res.json())
        .then(json => json.link);

        const embedBrid = new MessageEmbed()
            .setImage(oiseau)
            .setTimestamp();
        message.channel.send(embedBrid);
    }

    else if (args[0] === "panda") {
        const panda = await fetch("https://some-random-api.ml/img/panda")
        .then(res => res.json())
        .then(json => json.link);

        const embedPanda = new MessageEmbed()
            .setImage(panda)
            .setTimestamp();
        message.channel.send(embedPanda);
    }

    else if (args[0] === "random") {
        const random = await fetch("https://picsum.photos/1920/1080.jpg")
        const embedRandom = new MessageEmbed()
            .setImage(random.url)
            .setTimestamp();
        message.channel.send(embedRandom);
    }

    else {
        message.channel.send(`**"${args[0]}"** n'est pas disponible\nRecherche possible: **chien**, **chat**, **oiseau**, **panda**, **random**`);
    }
};