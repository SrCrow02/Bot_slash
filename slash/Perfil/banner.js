const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
const database = firebase.database();

module.exports = {
	name: "banner",
	description: "Loja de banners",

	run: async(interaction, client) => {

		const embed = new MessageEmbed()
		.setColor(`BLUE`)
		.setDescription(`Olá ${interaction.user}, Essa é a loja de banners para deixar o seu perfil com a sua cara\n\n **[1] Orelha de gato: \`5000\`**\n** [2] Anime nada aver:** \`10000\``)

		interaction.reply({ embeds: [embed] })
	}
}