

const Discord = require('discord.js');
const superagent = require(`superagent`)

module.exports = {
    name: "recaptcha",
    description: "Realizar um recaptcha",
    options: [
        {
            name: "args",
            description: "Conteudo do recaptcha!",
            type: 3,
            required: true,
        }
    ],

    run: async(interaction, client) => {
        const argumento = interaction.options.getString('args') || '';

        let embed = new Discord.MessageEmbed()
        .setTitle(`Recaptcha`)
        .setImage(`https://api.no-api-key.com/api/v2/recaptcha?text=${argumento}`)
        .setColor('RANDOM')

        interaction.reply({ embeds: [embed] })

        }
    }