const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();
const ms = require('ms')
const jimp = require('jimp');

module.exports = {
    name: "sell",
    description: "vender peixes e minerios",
    options: [
        {
            name: "escolher",
            description: "Peixes ou minerios",
            type: 3,
            required: true
        },
    ],

        run: async(interaction, client) => {
            const escolher = interaction.options.getString('escolher');

            if(escolher === 'minerios' || escolher === 'm' || escolher === 'Minerios'){
                database.ref(`Servidores/Economia/Trabalhos/Minerador/${interaction.user.id}`).once("value").then(async function(db){

                    if(db.val().minerios < 1) return interaction.reply(`:x: | Você não tem minerios para vender tente usar /minerar`)

                    let valor = db.val().minerios * 50;

                    database.ref(`Servidores/Economia/Trabalhos/Minerador/${interaction.user.id}`).update({
                        minerios: 0,
                    });
               
                    database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once("value").then(async function(db){
                        database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
                            coins: db.val().coins + valor
                        }); 

                    return interaction.reply(`:star: | Parabens ${interaction.user}, você vendeu seus minerios e conseguiu ${valor} coins`)
                    })
                }) 
            }

            if(escolher === 'peixes' || escolher === 'fish' || escolher === 'Peixes' || escolher === 'peixe'){
                database.ref(`Servidores/Economia/Trabalhos/Pescador/${interaction.user.id}`).once("value").then(async function(db){

                    if(db.val().peixes < 1) return interaction.reply(`:x: | Você não tem peixes para vender tente usar /pescar`)

                    let valor2 = db.val().peixes * 60;

                    database.ref(`Servidores/Economia/Trabalhos/Pescador/${interaction.user.id}`).update({
                        peixes: 0,
                    });

                    database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once("value").then(async function(db){
                        database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
                            coins: db.val().coins + valor2
                        }); 

                    return interaction.reply(`🐟 | Parabens ${interaction.user}, você vendeu seus peixes e conseguiu ${valor2} coins`)

                })
            })
        }
    }
}