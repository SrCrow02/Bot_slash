const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();
const jimp = require('jimp');

module.exports = {
    name: "roleta",
    description: "Apostar dinheiro na roleta",
    options: [
        {
            name: "quantia",
            description: "Quantidade de dinheiro",
            type: 4,
            required: false
        },
    ],
    run: async(interaction, client) => {
        const quantia = interaction.options.getInteger('quantia')

        //Emoji
        const est = client.emojis.cache.find(emoji => emoji.name === "estrela");
        const no = client.emojis.cache.find(emoji => emoji.name === "nocheck");

        let array1 = [':apple:', ':cherries:', ':eggplant:']
        let array2 = [':apple:', ':cherries:', ':eggplant:']
        let array3 = [':apple:', ':cherries:', ':eggplant:']

        var rand1 = array1[Math.floor(Math.random() * array1.length)];
        var rand2 = array2[Math.floor(Math.random() * array2.length)];
        var rand3 = array3[Math.floor(Math.random() * array3.length)];

        const multi = quantia * 2;

        database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once("value").then(async function(db){

            if(db.val().coins < quantia) return interaction.reply(`${no} | **Seu dinheiro não é suficiente, tente pegar um daily S2**`)

            if(quantia < 1) return interaction.reply(`${no} | **Digite um numero acima de 1**`)

            const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`${est} | **Resultados:**\n\n` + `${rand1}  ${rand2}  ${rand3}` + `\n\n${est} | ${interaction.user} Me parece que é seu dia de sorte! você apostou **${quantia}** e ganhou ${multi}`)

            const embedPerdeu = new MessageEmbed()
            .setColor(`RED`)
            .setDescription(`${no} | **Resultados:**\n\n` + `${rand1}  ${rand2}  ${rand3}` + `\n\n${no} | ${interaction.user} Me parece que não é seu dia de sorte! você apostou **${quantia}** e perdeu tudo!`)

            if(rand1 === ':apple:' && rand2 === ':apple:' && rand3 === ':apple:'){

                database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
                    coins: db.val().coins + multi
                });

                interaction.reply({ embeds: embed })

            }else if(rand1 === ':cherries:' && rand2 === ':cherries:' && rand3 === ':cherries:'){

                database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
                    coins: db.val().coins + multi
                });

                interaction.reply({ embeds: embed })

            }else if(rand1 === ':eggplant:' && rand2 === ':eggplant:' && rand3 === ':eggplant:'){

                database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
                    coins: db.val().coins + multi
                });

                interaction.reply({ embeds: embed })
                
            }else{

                database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
                    coins: db.val().coins - quantia
                });
                
                interaction.reply({ embeds: [embedPerdeu] })

            }
        })
    }
}