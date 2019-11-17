module.exports = async (client, message, args) => {
    function clean(text) {
      if (typeof text === "string") 
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      return text;
    }
  
    if (message.author.id !== "233402655559385088") return message.channel.send("Vous n'avez pas les permission, seul le propriétaire du bot peut l'executer");
    const code = args.join(" ");
    const evaled = eval(code);
    const cleanCode = await clean(evaled);
    message.channel.send(cleanCode, { code: "js" });
  };

//Commande d'évaluation permet de déclancher un evenement pour le tester
//La commande renvoi 'true' ou 'false'

//Ex: !test client.emit("guildMemberAdd", message.author);