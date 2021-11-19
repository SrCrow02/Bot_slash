const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'botinfo',
	description: 'Ver informaçoes do bot',

	run: async(interaction, client) => {

	const user = interaction.options.getUser('user') || interaction.user;

	//Emojis
    const js = client.emojis.cache.find(emoji => emoji.name === "JS");
    const pingE = client.emojis.cache.find(emoji => emoji.name === "API");
    const net = client.emojis.cache.find(emoji => emoji.name === "internet");
    const lapis = client.emojis.cache.find(emoji => emoji.name === "lapis");
    const mod = client.emojis.cache.find(emoji => emoji.name === "moderador");
    const sim = client.emojis.cache.find(emoji => emoji.name === "ba");
    const dev = client.emojis.cache.find(emoji => emoji.name === "dev");

	const embed = new MessageEmbed()
    .setColor('#00BFFF')
    .setDescription(`Olá ${interaction.user}, Abaixo está uma listinha sobre mim:\n\n` + ` Informações
     ${pingE} | Ping: **${Math.round(client.ws.ping)}ms**
     ${net} | Estou em **${client.guilds.cache.size} servidores**
     ${js} | Discord.js: **V13**
     ${lapis} | Meu ID: **785567076302979113**
     ${sim} | Prefixo nesse server:** Sou uma bot em slash [/]**
     ${mod} | Versão do bot: **1.0.3**
     ${dev} | Dev:` +  '``Crowler#1435``')

    interaction.reply({ embeds: [embed] })

    }
}