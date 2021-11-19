const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();

module.exports = {
    name: "sobremim",
    description: "Alterar seu sobremim",
    options: [
        {
            name: "sobre",
            description: "O texto que deseja adicionar",
            type: 3,
            required: false
        },
    ],
    run: async(interaction, client) => {
        const sobre = interaction.options.getString('sobre')

        database.ref(`Servidores/Perfil/${interaction.user.id}`).once("value").then(async function(db){

        if(db.val() === null){
            database.ref(`Servidores/Perfil/${interaction.user.id}`).update({
                banner: 'https://media.discordapp.net/attachments/786274273194541056/894358921760878602/ataaaaaaa.jpg?width=680&height=440',
                layout: 'https://cdn.discordapp.com/attachments/786330712093622302/896168300520800266/aasdafd.png',
                sobre: 'Nada aqui tente usar /sobremim'
            }); 

            const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`:star: | **${interaction.user}**` + '```- Você foi registrado na db de perfil\n- Utilize esse comando novamente```')

            return interaction.reply({ embeds: [embed] })    
        }

            database.ref(`Servidores/Perfil/${interaction.user.id}`).update({
                sobre: `${sobre}`
            }); 

            interaction.reply(`:tada: | Você alterou seu sobremim para` + ` **${sobre}**`)
        })
    }
}