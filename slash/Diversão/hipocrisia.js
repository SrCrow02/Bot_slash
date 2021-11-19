const { MessageEmbed } = require('discord.js');
const jimp = require('jimp')

module.exports = {
    name: "hipocrisia",
    description: "Meme da hipocrisia",
    options: [
        {
            name: "frase",
            description: "A frase da hipocrisia",
            type: 3,
            required: true
        },
    ],

	    run: async(interaction, client) => {
	    		const frase = interaction.options.getString('frase');

            //jimp
            let img = jimp.read("https://media.discordapp.net/attachments/865752017900273664/909094785556557904/hipocrita.jpg?width=405&height=237")

            img.then(image => {
                jimp.loadFont(jimp.FONT_SANS_32_WHITE).then(font => {
                    image.resize(685, 494)
                    image.print(font, 100, 100, frase, 600)
                    image.getBuffer(jimp.MIME_PNG, (err, i) => {
                        return interaction.reply( { files: [{ attachment: i, name: "hipocrisia.png"}] } )
                    })
                })
            })
        }
    }