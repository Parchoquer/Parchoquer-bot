module.exports = async (client, message) => {
    if (message.author.id !== "233402655559385088") return message.channel.send("Vous n'avez pas les permission, seul le propriétaire du bot peut l'executer");
    message.channel.send(":gear: Redémarrage en cours..").then(() => {
        process.exit(1);
    })
};