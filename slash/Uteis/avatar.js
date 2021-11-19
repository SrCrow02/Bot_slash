const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Pegar avatar de um membro",
    options: [
        {
            name: "user",
            description: "O usuario que deseja pegar o avatar",
            type: 6,
        }
    ],
    run: async(interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;

        const embed = new MessageEmbed()
        .setColor('#00BFFF')
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Clique [aqui](${user.displayAvatarURL({ dynamic: true, size: 4096 })}) para baixar o avatar**`)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
        .setFooter(`Author ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))

        interaction.reply({ embeds: [embed] })
    }
}