const mongoose = require("mongoose");
const { Guild } = require("../models/index");

module.exports = client => {
    client.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        return client.config.defaultSettings;
    };

    client.updateGuild = async (guild, settings) => {
        let data = await client.getGuild(guild);    //On récupère les données de la guild qu'on veux modifier
        if (typeof data !== "object") data = {};    //On vérifie que les données sonts sous forme d'object 
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings [key];
        }
        return data.updateOne(settings);
    };

    client.createGuild = async guild => {
        const merged = Object.assign({_id: mongoose.Types.ObjectId() }, guild);
        const createGuild = await new Guild(merged);
        createGuild.save().then(g => console.log(`New Guild -> ${g.guildName}`));
    };
};