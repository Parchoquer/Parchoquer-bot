module.exports = async (client, message) => {
    const msg = await message.channel.send(":ping_pong: ping!");
    msg.edit(`:ping_pong: Pong!\n Latence bot: ${msg.createdTimestamp - message.createdTimestamp}ms.`);
};