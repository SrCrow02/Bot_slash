const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();
const jimp = require('jimp');

module.exports = {
    name: "perfil",
    description: "Ver perfil",
    options: [
        {
            name: "user",
            description: "O perfil de um usuario",
            type: 6,
            required: false
        },
    ],
    run: async(interaction, client) => {
        const user = interaction.options.getUser('user') || interaction.user;
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 })

        let fonte = await jimp.loadFont(jimp.FONT_SANS_16_WHITE)
        let mask = await jimp.read('https://media.discordapp.net/attachments/841087435600560198/894312712367124580/mascara.png?width=410&height=410')

            database.ref(`Servidores/Perfil/${user.id}`).once("value").then(async function(db){

            if(db.val() === null){
                database.ref(`Servidores/Perfil/${interaction.user.id}`).set({
                    banner: 'https://media.discordapp.net/attachments/786318876542631976/894654472188473384/demonio-assassino-shinobu-kochou-papel-de-parede-1920x1080_48.jpg?width=680&height=440',
                    sobre: 'Nada aqui tente usar /sobremim'
                }); 

                const embed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`:star: | **${interaction.user}**` + '```- Você foi registrado na db de perfil\n- Utilize esse comando novamente```')

                return interaction.reply({ embeds: [embed] })    
            }

            let banner = await jimp.read(db.val().banner);
            let layout = await jimp.read('https://cdn.discordapp.com/attachments/786330712093622302/896168300520800266/aasdafd.png');

                jimp.read(avatar).then(avatar => {
                    avatar.resize(100, 100)
                    mask.resize(100, 100)
                    avatar.mask(mask)

                    jimp.read(layout).then(layout => {
                    layout.resize(680, 440)

                    banner.composite(layout, 0, 0).write('ship.png')
                    banner.print(fonte, 50, 365, `${db.val().sobre}`)
                    banner.print(fonte, 102, 30, user.username)
                    banner.composite(avatar, 2, 3).write('ship.png')

                    return interaction.reply({ files: ["ship.png"] })
                  })
               })
            })
        }
    }