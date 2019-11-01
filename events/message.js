module.exports = async (client, message) => {
    const settings = await client.getGuild(message.guild);
    if (message.author.bot) return;
    if (message.content.indexOf(settings.prefix) !== 0) return

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLocaleLowerCase();

    if (client.commands.has(command)) client.commands.get(command)(client, message, args, settings);
};