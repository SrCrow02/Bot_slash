const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();
const ms = require('ms')

module.exports = {
    name: "daily",
    description: "Coletar dinheiro diario",

    run: async(interaction, client) => {   

        let no = client.emojis.cache.find(emoji => emoji.name === "nocheck"); 
        let est = client.emojis.cache.find(emoji => emoji.name === "estrela");

        //Tempo de espera pra cada daily
        let tempo_esgotado = 84000000;

        let amount = Math.floor(Math.random() * 100) + 300;

        database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once("value").then(async function(db){

        //Embeds
            const embed1 = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`${est} | **${interaction.user}**` + '```- Você foi registrado na db de economia\n- Utilize esse comando novamente```')

            const embed2 = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`${est} | Parabéns ${interaction.user}, você ganhou ||**${amount}**|| no daily diário! Espere mais **1 dia** para realizar outro daily.`)
        //Embeds

            if(db.val() === null){
                let db = await database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once('value')

                database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).set({
                    coins: 0,
                })

            return interaction.reply({ embeds: [embed1] })

            }

            //Se tempo não for concluido embedErro
            if(db.val().author !== null && tempo_esgotado - (Date.now() - db.val().author) > 0){
                let time = ms(tempo_esgotado - (Date.now() - db.val().author));
                return interaction.reply(`${no} | ${interaction.user},** Desculpe mas você já pegou seu daily diario, Volte mais tarde!**`);
            }

            database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
                coins: amount + db.val().coins,
                author: Date.now()
            });

            interaction.reply({ embeds: [embed2] }) 
             
        })
    }
}