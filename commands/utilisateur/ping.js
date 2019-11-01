module.exports = (client, message) => {
    message.channel.send(`Latence bot: ${message.createdTimestamp}ms`);
};