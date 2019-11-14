const { Client, Collection } = require("discord.js");
const { TOKEN } = require("./config")
require("dotenv").config()

const client = new Client();

require("./utils/fonctions")(client);
client.mongoose = require("./utils/mongoose");
client.commands = new Collection();

// Commande utilisateur
client.commands.set("ping", require("./commands/utilisateur/ping"));
client.commands.set("info", require("./commands/utilisateur/info"));
client.commands.set("shit", require("./commands/utilisateur/shit"));
client.commands.set("help", require("./commands/utilisateur/help"));
client.commands.set("fn", require("./commands/utilisateur/fn"));
client.commands.set("img", require("./commands/utilisateur/img"));

// commande admin
client.commands.set("role", require("./commands/admin/role"));
client.commands.set("clear", require("./commands/admin/clear"));
client.commands.set("test", require("./commands/admin/test"));
client.commands.set("config", require("./commands/admin/config"));

// commande musique
client.commands.set("play", require("./commands/musique/play"));
client.commands.set("queue", require("./commands/musique/queue"));
client.commands.set("skip", require("./commands/musique/skip"));
client.commands.set("quit", require("./commands/musique/quit"))

// Evenement
client.on("ready", () => require("./events/ready.js")(client));
client.on("message", msg => require("./events/message.js")(client, msg));
// client.on("guildMemberAdd", member => require("./events/guildMemberAdd.js")(client, member));
// client.on("guildMemberRemove", member => require("./events/guildMemberRemove.js")(client, member));
client.on("guildCreate", guild => require("./events/guildCreate.js")(client, guild));

client.mongoose.init();
client.login(process.env.TOKENS); // --> client.login(TOKEN);
client.on("error", console.error);
client.on("warn", console.warn);
// client.on("debug", console.log);