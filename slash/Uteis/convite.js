const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "addbot",
    description: "Adicione a ursa no seu servidor",

    run: async(interaction, client) => {
        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`**Clique [aqui](https://discord.com/api/oauth2/authorize?client_id=785567076302979113&permissions=8&scope=bot%20applications.commands) para me adicionar no seu servidor\n [Meu site](https://ursabot.000webhostapp.com)**`)

        interaction.reply({ embeds: [embed] })
    }
}