const Discord = require('discord.js'); //Chamando a lib do discord
const superagent = require(`superagent`); //Chamando a api do superagent

//configuração
module.exports = {
    name: "kiss",
    description: "Beijar um membro",
    options: [
        {
            name: "user",
            description: "O usuario que deseja beijar",
            type: 6,
            required: true,
        }
    ],
//configuração

    run: async(interaction, client) => {
            superagent.get(`https://nekos.life/api/v2/img/kiss`).end((err, response) => {

            //Definindo author da mensagem
            const author = interaction.user;

            //A pessoa que vai ser abraçada
            let member = interaction.options.getUser('user');

            //Avatar do author da interação
            let avatar = author.avatarURL({ dynamic: true, format: "png", size: 1024 });

            //Embed
            const embed = new Discord.MessageEmbed()
            .setTitle('Beijo')
            .setDescription(`***${author} Deu um beijo em ${member}***`)
            .setImage(response.body.url)
            .setColor('BLUE')
            .setThumbnail(avatar)
            //Embed

            //Enviando a embed no chat
            interaction.reply({ embeds: [embed] })

        })
    }
}