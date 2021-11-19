const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "serverinfo",
    description: "Ver informaçoes do servidor",

    run: async(interaction, client) => {
        const guild = interaction.guild;

        const mod = client.emojis.cache.find(emoji => emoji.name === "moderador");
        const mundo = client.emojis.cache.find(emoji => emoji.name === "mundo");
        const coroa = client.emojis.cache.find(emoji => emoji.name === "coroa");
        const user = client.emojis.cache.find(emoji => emoji.name === "user");
        const lapis = client.emojis.cache.find(emoji => emoji.name === "lapis");
        const setaDireita = client.emojis.cache.find(emoji => emoji.name === "setaDireita");
        const web = client.emojis.cache.find(emoji => emoji.name === "internet");
        const setaP = client.emojis.cache.find(emoji => emoji.name === "setaPreta");

        let createdAt = String(guild.createdAt);
        const description = guild.description;
        const banner = guild.banner;
        const id = guild.id;
        const membersCount = guild.memberCount;
        const ownerID = guild.ownerID;
        const name = guild.name;
        const verified = guild.verified;

        createdAt = createdAt.split('.')[0]

        const response = new MessageEmbed()
            .setTitle(`**Sobre o servidor:**`)
            .setColor("#00BFFF")
            .setDescription(`**${web} | Nome:** ${name}\n\n` + `**${coroa} | Dono:** <@${ownerID}>\n\n`
             + `**${user} | Quantidade de membros:** ${membersCount}\n\n` + `**${setaP} | ID do servidor:** ${id}\n\n` + `**Criado em:** ${createdAt}`)
            .setThumbnail(guild.iconURL())

            interaction.reply({ embeds: [response] })
    }
}