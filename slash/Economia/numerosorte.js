const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();
const ms = require('ms')

module.exports = {
    name: "numero-da-sorte",
    description: "Acerte o numero e fique rico",
        options: [
        {
            name: "numero",
            description: "Coloque o numero da sorte",
            type: 4,
            required: true
        }
    ],

        run: async(interaction, client) => {

                const numero = interaction.options.getInteger('numero');

                //Emoji
                const no = client.emojis.cache.find(emoji => emoji.name === "nocheck");
                const est = client.emojis.cache.find(emoji => emoji.name === "estrela");
                //Emoji

                let numero_da_sorte = Math.floor(Math.random() * 100) + 1;

                if(numero > 100) return interaction.reply(`${no} | **Digite um numero de 1 a 100**`)

                if(numero < 1) return interaction.reply(`${no} | **Digite um numero acima de 1**`)

                const embed = new MessageEmbed()
                .setColor(`GOLD`)
                .setDescription(`:tada: | Parabéns ${interaction.user}, Você ganhou **R$10000** por ter acertado o numero da sorte!!!`)

                const embed2 = new MessageEmbed()
                .setColor(`GOLD`)
                .setDescription(`${no} | Que pena ${interaction.user}, Você não acertou o numero da sorte! peguei uma taxinha de **R$100** estrelinhas :)` + '```' + `${numero_da_sorte}` + '```')


                database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once("value").then(async function(db){

                const embed5 = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`${estrela} | **${interaction.user}**` + '```- Você foi registrado na db de economia\n- Utilize esse comando novamente```')

                if(db.val() === null){
                    let db = await database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once('value')

                    database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).set({
                        coins: 0,
                    })

                return interaction.reply({ embeds: [embed5] })

                }

                if(db.val().coins < 100){
                    return interaction.reply(`:x: | Você precisa ter um valor minimo de 100 coins para poder apostar na sorte`)
                }

                if(numero === `${numero_da_sorte}`){

                        database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
                            coins: db.val().coins + 10000,
                        });
                        
                        return interaction.reply({ embeds: [embed] })

                } else if(numero != `${numero_da_sorte}`) {

                        database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
                            coins: db.val().coins - 100,
                        });  

                        return interaction.reply({ embeds: [embed2] })     

                }
                }) 
        }
}

