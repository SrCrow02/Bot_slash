const { MessageEmbed } = require('discord.js');
const superagent = require("superagent");

module.exports = {
    name: "gato",
    description: "Uma foto aleatoria de um gato",

    run: async(interaction, client) => { 

        let{body} = await superagent.get(`http://aws.random.cat/meow`);

        let catembed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Gatos 🐱")
        .setImage(body.file);

        interaction.reply({ embeds: [catembed] })
    }
}