const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();
const jimp = require('jimp')

module.exports = {
    name: "ship",
    description: "Ver o quanto dois users se amam",
    options: [
        {
            name: "user",
            description: "O usuario que deseja shipar",
            type: 6,
            required: true
        },
        {
            name: "member",
            description: "O segundo usuario",
            type: 6,
            required: false
        },

    ],

    run: async(interaction, client) => {
    const user = interaction.options.getUser('user');
    const member = interaction.options.getUser('member') || interaction.user;

    let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 })
    let avatar2 = member.avatarURL({ dynamic: true, format: "png", size: 1024 })

    let fundo = await jimp.read(`https://media.discordapp.net/attachments/892510102555353140/903359003092979772/foooof.png?width=600&height=300`)

    let mask = await jimp.read('https://media.discordapp.net/attachments/841087435600560198/894312712367124580/mascara.png?width=410&height=410')

    let emoji = await jimp.read('https://media.discordapp.net/attachments/892510102555353140/894605645154746458/0483f2b648dcc986d01385062052ae1c.png?width=135&height=135')
    let emoji2 = await jimp.read('https://media.discordapp.net/attachments/892510102555353140/903634965600821368/9fa4e8b751cc33b92608079dcb56293f.png?width=135&height=135')
    let emoji3 = await jimp.read('https://media.discordapp.net/attachments/892510102555353140/903634865197563904/f7b3f6b926cb31a17d4928d076febab4.png?width=135&height=135')


    let p = Math.floor(Math.random() * 100) + 1;

                if(p > 60){
                    jimp.read(avatar).then(avatar => {
                    avatar.resize(150, 150)
                    mask.resize(150, 150)
                    avatar.mask(mask)

                    jimp.read(avatar2).then(avatar2 => {
                    avatar2.resize(150, 150)
                    mask.resize(150, 150)
                    avatar2.mask(mask)                

                    jimp.read(emoji).then(emoji => {
                    emoji.resize(100, 100)

                    fundo.composite(avatar, 20, 0).write('ship.png')
                    fundo.composite(avatar2, 210,0).write('ship.png')
                    fundo.composite(emoji, 135, 23).write('ship.png')

                    interaction.reply({ files: ['ship.png'] }) 

                })
            })
        })
    }
                if(p < 49){
                    jimp.read(avatar).then(avatar => {
                    avatar.resize(150, 150)
                    mask.resize(150, 150)
                    avatar.mask(mask)

                    jimp.read(avatar2).then(avatar2 => {
                    avatar2.resize(150, 150)
                    mask.resize(150, 150)
                    avatar2.mask(mask)                

                    jimp.read(emoji2).then(emoji2 => {
                    emoji2.resize(100, 100)

                    fundo.composite(avatar, 20, 0).write('ship.png')
                    fundo.composite(avatar2, 210,0).write('ship.png')
                    fundo.composite(emoji2, 135, 23).write('ship.png')

                    interaction.reply({ files: ['ship.png'] }) 

                })
            })

        })
    }
                    if(p > 49 && p < 60){
                        jimp.read(avatar).then(avatar => {
                        avatar.resize(150, 150)
                        mask.resize(150, 150)
                        avatar.mask(mask)

                        jimp.read(avatar2).then(avatar2 => {
                        avatar2.resize(150, 150)
                        mask.resize(150, 150)
                        avatar2.mask(mask)                

                        jimp.read(emoji3).then(emoji3 => {
                        emoji3.resize(100, 100)

                        fundo.composite(avatar, 20, 0).write('ship.png')
                        fundo.composite(avatar2, 210,0).write('ship.png')
                        fundo.composite(emoji3, 135, 23).write('ship.png')

                        interaction.reply({ files: ['ship.png'] }) 

                    })
                })
            })  
        }                  
    }
}