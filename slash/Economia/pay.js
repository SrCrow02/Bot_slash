const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();

module.exports = {
    name: "pay",
    description: "Pagar um usuario",
    options: [
        {
            name: "user",
            description: "O usuario que deseja pagar",
            type: 6,
            required: true
        },
        {
            name: "quantia",
            description: "Quantia pra pagar",
            type: 4,
            required: true
        }
    ],

    run: async(interaction, client) => {
        const user = interaction.options.getUser('user');
        const quantia = interaction.options.getInteger('quantia');

        let no = client.emojis.cache.find(emoji => emoji.name === "nocheck"); 
        let est = client.emojis.cache.find(emoji => emoji.name === "estrela");

        const embed = new MessageEmbed()
        .setColor('GOLD')
        .setDescription(`${est} | ${interaction.user}, Você pagou **${quantia}** moedas para o(a) ${user}!`)

        database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once("value").then(async function(db){
            if(db.val() === null){
                let db = await database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).once('value')

            database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).set({
             coins: 0
            })

            const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`${est} | **${user}**` + '```- Você foi registrado na db de economia\n- Utilize esse comando novamente```')

            return interaction.reply({ embeds: [embed] })
        }

        if(db.val().coins < quantia) return interaction.reply(`${no} | ${interaction.user}, Você não possui essa quantia, Tente usar \`/daily\` para pegar seu dinheiro diario!`)

        if(user === interaction.user) return interaction.reply(`${no} | Você não pode pagar você mesmo!`)

        database.ref(`Servidores/Economia/Coins/${user.id}`).update({
            coins: quantia
        });

        database.ref(`Servidores/Economia/Coins/${interaction.user.id}`).update({
            coins: db.val().coins - quantia
        });

        interaction.reply({ embeds: [embed] })

       })
    }
}