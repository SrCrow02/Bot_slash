const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "coinflip",
    description: "Jogar uma moeda para o ar",

    run: async(interaction, client) => {
        let array = ['cara', 'coroa']

        var rand = array[Math.floor(Math.random() * array.length)];

        if(rand === 'coroa'){
            const embed = new MessageEmbed()
            .setColor('GOLD')
            .setDescription(`**A moeda caiu em...**\n\n:crown: | **Coroa**`)
            .setThumbnail('https://media.discordapp.net/attachments/845091740222226462/909057982543843348/11b9d8164d204c7fd48a88a515745c1d.png?width=113&height=113')

            return interaction.reply({ embeds: [embed] })
        }

        else if(rand === 'cara'){
            const embed = new MessageEmbed()
            .setColor('GOLD')
            .setDescription(`**A moeda caiu em...**\n\n:smiley: | **Cara**`)
            .setThumbnail('https://media.discordapp.net/attachments/845091740222226462/909057982543843348/11b9d8164d204c7fd48a88a515745c1d.png?width=113&height=113')

            return interaction.reply({ embeds: [embed] })
        }

    }
}