module.exports = async (client, member) => {
    const channel = client.channels.find(r => r.name === "📰logs");
    channel.send(`${member} a quitté le serveur !`);
  };