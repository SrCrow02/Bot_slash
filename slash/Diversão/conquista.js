const Discord = require('discord.js');
const superagent = require(`superagent`)

module.exports = {
    name: "conquista",
    description: "Conquista do minecraft",
    options: [
        {
            name: "args",
            description: "Conteudo da conquista!",
            type: 3,
            required: true,
        }
    ],

    run: async(interaction, client) => {
        const argumento = interaction.options.getString('args') || '';

        //Emojis
        const mod = client.emojis.cache.find(emoji => emoji.name === "moderador");
        const eng = client.emojis.cache.find(emoji => emoji.name === "engrenagem");
        const seta = client.emojis.cache.find(emoji => emoji.name === "setaVermelha");
        const erro = client.emojis.cache.find(emoji => emoji.name === "erro");
        //Emojis

        let rnd = Math.floor((Math.random() * 39) + 1);

        let embed = new Discord.MessageEmbed()
        .setTitle(`Conquista  desbloquada`)
        .setImage(`https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=Nova+conquista&t=${argumento}`)
        .setColor('RANDOM')

        interaction.reply({ embeds: [embed] })
    }
}