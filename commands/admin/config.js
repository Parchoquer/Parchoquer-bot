module.exports = async (client, message, args, settings) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return undefined;   //Si le client n'est pas de rôle administrateur sur la guild alors on ne répond pas

    const getSettings = args[0];
    const newSettings = args.slice(1).join(" ");

    switch (getSettings) {
        case "prefix": {
            if (newSettings) {
                await client.updateGuild(message.guild, { prefix: newSettings });
                return message.channel.send(`Préfix mis à jour: \`${settings.prefix}\` -> \`${newSettings}\``);
            }
            message.channel.send(`Prefix actuel: \`${settings.prefix}\``);
            break;
        }

        case "welcomeChannel": {
            if (newSettings) {
                await client.updateGuild(message.guild, { welcomeChannel: newSettings });
                return message.channel.send(`WelcomeChannel mis à jour: \`${settings.welcomeChannel}\` -> \`${newSettings}\``);
            }
            message.channel.send(`WelcomeChannel actuel: \`${settings.welcomeChannel}\``);
            break;
        }
    }
};