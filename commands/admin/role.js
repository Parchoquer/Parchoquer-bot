module.exports = (client, message, args, settings) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas les permission");
    
    const channel = client.channels.find(r => r.name === `${settings.welcomeChannel}`);
    const role = message.guild.roles.find(r => r.name === args[0]);
    if (!role) return message.channel.send("Ce rôle n'existe pas !");
  
    if (message.member.roles.find(r => r.name === args[0])) {
      message.member.roles.remove(role);
      channel.send(`J'ai supprimé le rôle ${role} à ${message.author}.`);
    } else {
      message.member.roles.add(role);
      channel.send(`J'ai ajouté le rôle ${role} à ${message.author}.`);
    }
  };