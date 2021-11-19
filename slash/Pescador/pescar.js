const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();
const ms = require('ms')
const jimp = require('jimp');

module.exports = {
    name: "pescar",
    description: "Pescar",

    run: async(interaction, client) => {
        const rng = Math.floor((Math.random() * 20) + 1); //Rand

        let no = client.emojis.cache.find(emoji => emoji.name === "nocheck");
        let est = client.emojis.cache.find(emoji => emoji.name === "estrela");

        let array = ["não", "quebrou", "Bota"]
        var rand = array[Math.floor(Math.random() * array.length)];

        let tempo_esgotado = 84000000;

        database.ref(`Servidores/Economia/Trabalhos/Pescador/${interaction.user.id}`).once("value").then(async function(db){
            if(db.val() === null){
                let db = await database.ref(`Servidores/Economia/Trabalhos/Pescador/${interaction.user.id}`).once('value')

                database.ref(`Servidores/Economia/Trabalhos/Pescador/${interaction.user.id}`).set({
                    peixes: 0,
                    vara: 1
                })

                const embed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`:star: | **${interaction.user}**` + '```- Você foi registrado na db de Pescador\n- Utilize esse comando novamente```')

                return interaction.reply({ embeds: [embed] })
            }

            if(db.val().vara < 1){
                return interaction.reply(`${no} | Você não tem nenhuma vara_de_pesca use \`/loja\` para comprar`)
            }

            //Se tempo não for concluido embedErro
            if(db.val().author !== null && tempo_esgotado - (Date.now() - db.val().author) > 0){
                let time = ms(tempo_esgotado - (Date.now() - db.val().author));
                return interaction.reply(`${no} | ${interaction.user},** Desculpe mas você já pescou hoje, Volte mais tarde!**`);
            }

            if(rand === 'não'){
                database.ref(`Servidores/Economia/Trabalhos/Pescador/${interaction.user.id}`).update({
                    peixes: db.val().peixes + rng,
                    author: Date.now()
                });
                
                const embedNao = new MessageEmbed()
                .setColor(`BLUE`)
                .setDescription(`🎣 |  ${interaction.user}, Você foi pescar e conseguiu ||**${rng}**|| peixes! Espere mais **1 dia** para poder realizar uma pesca.`)

                return interaction.reply({  embeds: [embedNao] })
            }
            else if(rand === 'quebrou'){
                database.ref(`Servidores/Economia/Trabalhos/Pescador/${interaction.user.id}`).update({
                    peixes: db.val().peixes + rng,
                    vara: db.val().vara - 1,
                    author: Date.now()
                });

                const embedQuebrou = new MessageEmbed()
                .setColor(`BLUE`)
                .setDescription(`🎣 |  ${interaction.user}, Você foi pescar e conseguiu ||**${rng}**|| peixes! Espere mais **1 dia** para poder realizar uma pesca.` + '```' + `- Sua vara quebrou` + '```')

                return interaction.reply({  embeds: [embedQuebrou] })
            }

            else if(rand === 'Bota'){
                const embedBota = new MessageEmbed()
                .setColor(`BLUE`)
                .setDescription(`🎣 |  ${interaction.user}, Você foi pescar e conseguiu **uma bota!** Espere mais **1 dia** para poder realizar uma pesca.`)

                return interaction.reply({  embeds: [embedBota] })   
            }            
        })

    }
}