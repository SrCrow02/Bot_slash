const { MessageEmbed } = require('discord.js'); //Chamando a lib do discord

const firebase = require('firebase'); //Chamando o firebase(banco de dados)
let database = firebase.database(); //A database

//Configuração
module.exports = {
    name: "add-money",
    description: "Adicionar dinheiro a um usuario",
        options: [
        {
            name: "user",
            description: "Usuario para add o money",
            type: 6,
            required: true
        },
        {
            name: "quantia",
            description: "Quantia pra adicionar",
            type: 4,
            required: true  
        }
    ],
//Configuração

    run: async(interaction, client) => {

        if(interaction.user.id != '765761364526366740'){
            interaction.reply(`:x: | Só staffs podem usar esse comando!`)
        }
        //A pessoa que sera mostrada a carteira
        const user = interaction.options.getUser('user') || interaction.user;
        const quantia = interaction.options.getInteger('quantia')

        database.ref(`Servidores/Economia/Coins/${user.id}`).once("value").then(async function(db){
            database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
                coins: db.val().coins + quantia,
            });
        })

        return interaction.reply(`O ${user} recebeu **${quantia}** em coins!`)
    }
}