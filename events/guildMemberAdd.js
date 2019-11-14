module.exports = (client, member) => {
    const channel = client.channels.find(r => r.name === "logs");
    channel.send(`${member} a rejoint le serveur !`);
  };