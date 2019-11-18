module.exports = async (client, message) => {
    const msg = await message.channel.send("ping!");
    msg.edit(`Pong !\n Latence bot: ${msg.createdTimestamp - message.createdTimestamp}ms.`);
};