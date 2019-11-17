module.exports = async (client) => {;
    console.info(`\x1b[37m\x1b[44m[+]\x1b[0m Tout est opérationnel !`)
    client.user.setActivity(`!help`, { type: 'PLAYING' })
};