module.exports = (client, message, args,) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas les permission");
    if (!args[0])
        return message.reply(
            `\nSyntaxe: clear <***NombreMessage***>`
        );
  
    message.delete();
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel
        .send(`J'ai supprimer ***${args[0]}***  messages pour vous ❤️ !`)
        .then(msg => msg.delete({ timeout: 5000 }));    // 5 secondes
  });
};