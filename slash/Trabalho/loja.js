const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "loja",
    description: "Loja de ferramentas",

    run: async(interaction, client) => { 

        let picareta = client.emojis.cache.find(emoji => emoji.name === "daas");

            const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`Essa é a lojinha de ferramentas\n\n` + `${picareta} | **Picareta:** ` + '`R$120`' + ` a unidade [1]` + `\n\n` + `🎣 | **Vara de pesca:** ` + '`R$200`' + ` a unidade [2]\n\n` + `**utilize /comprar <numero do item> para comprar um item**`)

            interaction.reply({ embeds: [embed] })
    }
}