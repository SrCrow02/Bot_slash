const { MessageEmbed } = require('discord.js'); //Chamando a lib do discord

const firebase = require('firebase'); //Chamando o firebase(banco de dados)
let database = firebase.database(); //A database

//Configuração
module.exports = {
    name: "atm",
    description: "Ver a quantidade de moedas de um usuario",
        options: [
        {
            name: "user",
            description: "O usuario que deseja ver a carteira",
            type: 6,
            required: false
        }
    ],
//Configuração

    run: async(interaction, client) => {
        //A pessoa que sera mostrada a carteira
        const user = interaction.options.getUser('user') || interaction.user;

        //Emoji
        let dinheiro = client.emojis.cache.find(emoji => emoji.name === "dinheiroTemp");
        let lapis = client.emojis.cache.find(emoji => emoji.name === "lapis");
        let no = client.emojis.cache.find(emoji => emoji.name === "nocheck");
        //Emoji

        //avatar
        let avatar = user.displayAvatarURL({format: 'png'});

        //Conectando na db
        database.ref(`Servidores/Economia/Coins/${user.id}`).once("value").then(async function(db){

            //Se a db do usuario for nula seta ela pra 0
            if(db.val() === null){
                let db = await database.ref(`Servidores/Economia/Coins/${user.id}`).once('value')

                database.ref(`Servidores/Economia/Coins/${user.id}`).set({
                    coins: 0
                })

            //Embed
            const embed1 = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`:star: | **${user}**` + '```- Você foi registrado na db de economia\n- Utilize esse comando novamente```')

            return interaction.reply({ embeds: [embed1] })

            }  

            //Embed
            let embed2 = new MessageEmbed()
            .setColor(`GOLD`)
            .setDescription(`${dinheiro} | Dinheiro: **R$${db.val().coins}**`)
            .setThumbnail(`${avatar}`)
            .setAuthor(user.tag, avatar)  

            return interaction.reply({ embeds: [embed2] })

        })
    }
}