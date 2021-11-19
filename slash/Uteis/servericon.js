const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'servericon',
    description: 'Ver o icone do servidor',

    run: async(interaction, client) => {    

        let icone = new MessageEmbed() // Aqui irá ser a embed que o bot irá mostrar.
        .setDescription(`**Clique [aqui](${interaction.guild.iconURL()}) para baixar o ícone do servidor!**`)
        .setImage(interaction.guild.iconURL({ dynamic: true, size: 2048 })) // Aqui, colocamos dynamic: true, size: 2048, caso o servidor tenha um gif de icone e definimos o tamanho dela para 2048
        
        interaction.reply({ embeds: [icone] })
    }
}