const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();

module.exports = {
    name: "notas",
    description: "notas",
    options: [
        {
            name: "nota",
            description: "Mudar seu bloco de notas",
            type: 3,
            required: false
        },
    ],
    run: async(interaction, client) => {
        const nota = interaction.options.getString('nota')

        database.ref(`Servidores/Notas/${interaction.user.id}`).once("value").then(async function(db){
            if(db.val() === null){
                database.ref(`Servidores/Notas/${interaction.user.id}`).set({
                    nota: "Digite /nota para alterar"
                })  

                const embed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`:star: | **${interaction.user}**` + '```- Você foi registrado na db de notas\n- Utilize esse comando novamente```')

                return interaction.reply({ embeds: [embed] })
            }
            if(!nota){
                const embed2 = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`Essas são as suas anotaçoes:\n` + '```' + `${db.val().nota}` + '```')

                return interaction.reply({ embeds: [embed2] })

            } else {

                database.ref(`Servidores/Notas/${interaction.user.id}`).set({
                    nota: `${nota}`
                })  

                const embed3 = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`Você alterou suas notas para **${nota}**`)

                return interaction.reply({ embeds: [embed3] })

            }
        })
    }
}