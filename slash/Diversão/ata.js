const { MessageEmbed } = require('discord.js');
const jimp = require('jimp')

module.exports = {
    name: "ata",
    description: "meme da monica",
    options: [
        {
            name: "user",
            description: "O usuario que deseja colocar no ata",
            type: 6,
            required: true
        },
    ],

    run: async(interaction, client) => {
    const user = interaction.options.getUser('user') || interaction.user;

    let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 })

    let fundo = await jimp.read(`https://media.discordapp.net/attachments/865764157836361740/908421635537764503/aaaaaaaaaaaaaaa.png?width=410&height=410`)
    let fundo2 = await jimp.read(`https://media.discordapp.net/attachments/865764157836361740/908421635537764503/aaaaaaaaaaaaaaa.png?width=410&height=410`)
                    jimp.read(avatar).then(avatar => {
                    avatar.resize(300, 300)

                    fundo2.composite(avatar, 150, 0).write('ata.png')
                    fundo2.composite(fundo, 0, 0).write('ata.png')
                    return interaction.reply({ files: ['ata.png'] }) 
        })                  
    }
}