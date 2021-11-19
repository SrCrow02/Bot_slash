const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();

module.exports = {
    name: "comprar",
    description: "comprar uma ferramenta",
    options: [
        {
            name: "ferramenta",
            description: "Escolher a ferramenta",
            type: 4,
            required: true
        },
        {
            name: "quantidade",
            description: "Quantidade de ferramentas",
            type: 4,
            required: true
        },
    ],

        run: async(interaction, client) => {
                const quantidade = interaction.options.getInteger('quantidade');
                const ferramentas = interaction.options.getInteger('ferramenta');

                let valor_picareta = quantidade * 120
                let valor_vara = quantidade * 200

                database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once("value").then(async function(db){
                    if(db.val() === null){
                        let db = await database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once('value')

                        database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).set({
                            coins: 0,
                        })

                        const embed1 = new MessageEmbed()
                        .setColor('GOLD')
                        .setDescription(`:star: | **${interaction.user}**` + '```- Você foi registrado na db de economia\n- Utilize esse comando novamente```')

                        return interaction.reply({ embeds: [embed1] })
                    }

                        if(ferramentas === 1){
                            if(db.val().coins < valor_picareta) return interaction.reply(`:x: | Você não tem dinheiro suficiente!`)

                            database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
                                coins: db.val().coins - valor_picareta
                        });
                            

                        database.ref(`Servidores/Economia/Trabalhos/Minerador/${interaction.user.id}`).once("value").then(async function(db){

                       database.ref(`Servidores/Economia/Trabalhos/Minerador/${interaction.user.id}`).update({
                           picareta: db.val().picareta + quantidade
                       })

                        const embed2 = new MessageEmbed()
                        .setColor('GOLD')
                        .setDescription(`:tada: | ${interaction.user}, Você comprou ${quantidade} picaretas no valor de ${valor_picareta}`)

                       return interaction.reply({ embeds: [embed2] }) 
                })
           }

                        if(ferramentas === 2){
                            if(db.val().coins < valor_vara) return interaction.reply(`:x: | Você não tem dinheiro suficiente!`)

                            database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
                                coins: db.val().coins - valor_vara
                        });
                            

                        database.ref(`Servidores/Economia/Trabalhos/Pescador/${interaction.user.id}`).once("value").then(async function(db){

                       database.ref(`Servidores/Economia/Trabalhos/Pescador/${interaction.user.id}`).update({
                           vara: db.val().vara + quantidade
                       })

                        const embed3 = new MessageEmbed()
                        .setColor('GOLD')
                        .setDescription(`:tada: | ${interaction.user}, Você comprou ${quantidade} varas de pesca no valor de ${valor_vara}`)

                       return interaction.reply({ embeds: [embed3] }) 
                })
            }
        })
    }
}