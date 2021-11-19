const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();
const ms = require('ms')
const jimp = require('jimp');

module.exports = {
    name: "minerar",
    description: "Minerar",

    run: async(interaction, client) => {
        const rng = Math.floor((Math.random() * 7) + 1); //Rand

        let array = ["não", "quebrou"]
        var rand = array[Math.floor(Math.random() * array.length)];

        let tempo_esgotado = 84000000;

        let picareta = client.emojis.cache.find(emoji => emoji.name === "daas");
        
            database.ref(`Servidores/Economia/Trabalhos/Minerador/${interaction.user.id}`).once("value").then(async function(db){

            //Embeds
                const embed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`:star: | **${interaction.user}**` + '```- Você foi registrado na db de mineração\n- Utilize esse comando novamente```')

                const embed2 = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`${picareta} | Parabéns ${interaction.user}, você foi minerar e coletou ||**${rng}**|| minerios!`)

                const embed3 = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`${picareta} | Parabéns ${interaction.user}, você foi minerar e coletou ||**${rng}**|| minerios!` + '```' + '- Sua picareta quebrou' + '```')
            //Embeds

                if(db.val() === null){
                    let db = await database.ref(`Servidores/Economia/Trabalhos/Minerador/${interaction.user.id}`).once('value')

                    database.ref(`Servidores/Economia/Trabalhos/Minerador/${interaction.user.id}`).set({
                    minerios: 0,
                    picareta: 1
                })

                return interaction.reply({ embeds: [embed] })
            }

            if(db.val().picareta < 1) {
                return interaction.reply(`:x: | **Você não tem uma picareta tente comprar usando \`/loja\`**`)
            }

            //Se tempo não for concluido embedErro
                if(db.val().author !== null && tempo_esgotado - (Date.now() - db.val().author) > 0){
                    let time = ms(tempo_esgotado - (Date.now() - db.val().author));
                    return interaction.reply(`:x: | ${interaction.user}, Você ja minerou hoje tente descançar um pouco`);
                }

            database.ref(`Servidores/Economia/Trabalhos/Minerador/${interaction.user.id}`).update({
                minerios: rng + db.val().minerios,
                author: Date.now()
            });

            if(array === 'não'){
                database.ref(`Servidores/Economia/Trabalhos/Minerador/${interaction.user.id}`).update({
                minerios: rng + db.val().minerios,
                author: Date.now()
                });

                return interaction.reply({ embeds: [embed2] })

            } else {
                database.ref(`Servidores/Economia/Trabalhos/Minerador/${interaction.user.id}`).update({
                minerios: rng + db.val().minerios,
                picareta: db.val().picareta - 1,
                author: Date.now()
                }); 

                return interaction.reply({ embeds: [embed3] })
            }     
        })
    }
}