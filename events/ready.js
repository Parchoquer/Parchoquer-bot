module.exports = async (client) => {;
    const activity = [
        "https://github.com/Parchoquer/Parchoquer-bot",
        "!help",
        "CérveauParchoqué.js 🧠#0582",
        "JavaScript"
    ];

    setInterval(() => {
        const index = Math.floor(Math.random() * (activity.length - 1) + 1);
        client.user.setActivity(activity[index]);
    }, 5000); // 5 sec

    console.info(`\x1b[37m\x1b[44m[+]\x1b[0m Tout est opérationnel !`)

    const channel = client.channels.find(r => r.name === "logs");
    channel.send(":gear: Le bot est démarré !");
};