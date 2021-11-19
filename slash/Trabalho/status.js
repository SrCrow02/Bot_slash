const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
const database = firebase.database();

module.exports = {
	name: "status",
	description: "Ver seus minerios",

	run: async(interaction, client) => {

		database.ref(`Servidores/Economia/Trabalhos/Minerador/${interaction.user.id}`).once("value").then(async function(db){


		database.ref(`Servidores/Economia/Trabalhos/Pescador/${interaction.user.id}`).once("value").then(async function(db){
			const embed = new MessageEmbed()
			.setColor(`BLUE`)
			.setDescription(`Itens do ${interaction.user},\n\n Minerios: **${db.val().minerios}**\n Peixes: **${db.val().peixes}**`)

			interaction.reply({ embeds: [embed] })
		})
	})
	}
}