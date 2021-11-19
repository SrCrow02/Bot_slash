const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();

module.exports = {
    name: "comprar-banner",
    description: "Comprar banner para o /perfil",
    options: [
        {
            name: "comprar",
            description: "O banner que deseja comprar",
            type: 4,
            required: true
        },
    ],
    run: async(interaction, client) => {
        const comprar = interaction.options.getInteger('comprar')

            database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once("value").then(async function(db){
                if(db.val() === null){
                    return interaction.reply(`Você não esta registrado no meu sistema de economia, tente usar /daily`)
                }

                if(comprar === 1 && db.val().coins >= 5000){
                    database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).set({
                        coins: db.val().coins - 5000,
                    }) 
                }
                else if(comprar === 2 && db.val().coins >= 10000){
                    database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).set({
                        coins: db.val().coins - 10000,
                    }) 
                } else {
                    interaction.reply(`:sob: | Que pena ${interaction.user}, Você não tem a quantia certa pra realizar essa compra! Tente pegar o /daily`)
                }
            }) 

            database.ref(`Servidores/Perfil/${interaction.user.id}`).once("value").then(async function(db){

            if(db.val() === null){
                database.ref(`Servidores/Perfil/${interaction.user.id}`).set({
                    banner: 'https://media.discordapp.net/attachments/786318876542631976/894654472188473384/demonio-assassino-shinobu-kochou-papel-de-parede-1920x1080_48.jpg?width=680&height=440',
                    sobre: 'Nada aqui tente usar /sobremim'
                }); 

                const embed = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`:star: | **${interaction.user}**` + '```- Você foi registrado na db de perfil\n- Utilize esse comando novamente```')

                return interaction.reply({ embeds: [embed] })    
            }
        
            if(comprar === 1){
                database.ref(`Servidores/Perfil/${interaction.user.id}`).set({
                    banner: 'https://media.discordapp.net/attachments/865764157836361739/905867828492660816/Anime_Feminino_com_Orelha_de_Gato.jpg?width=680&height=440',
                    sobre: db.val().sobre
            });

                return interaction.reply(`:tada: | Voce comprou o perfil **1**`)   

            }

            else if(comprar === 2){

                database.ref(`Servidores/Perfil/${interaction.user.id}`).set({
                    banner: 'https://media.discordapp.net/attachments/865752017900273664/905870355573399572/1280x720_shoufukucho-anime-girl-look-wind1.jpg?width=680&height=440',
                    sobre: db.val().sobre
            });

                return interaction.reply(`:tada: | Voce comprou o perfil **2**`) 

            }
        })
    }
}