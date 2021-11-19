const { MessageEmbed } = require('discord.js');
const firebase = require('firebase');
let database = firebase.database();
const jimp = require('jimp');

module.exports = {
    name: "jokenpo",
    description: "Pedra papel ou tesoura",
    options: [
        {
            name: "jogada",
            description: "Escolha entre: Pedra papel ou tesoura",
            type: 3,
            required: true
        },
    ],
    run: async(interaction, client) => {
        const jogada = interaction.options.getString('jogada');

            const rng = Math.floor((Math.random() * 100) + 1); //Rand

        //Declarando se venceu ou perdeu
        if (jogada === 'pedra' && rng > 0 && rng <= 34) {
            return interaction.reply('**Pedra**, empatamos :)');
        } else if (jogada === 'pedra' && rng > 34 && rng <= 67) {
            return interaction.reply('**Papel**, você perdeu! ');
        } else if (jogada === 'pedra' && rng > 67 && rng <= 100) {
            return interaction.reply('**Tesoura**, eu perdi :(');
        } else if (jogada === 'papel' && rng > 0 && rng <= 34) {
            return interaction.reply('**Papel**, empatamos :)');
        } else if (jogada === 'papel' && rng > 34 && rng <= 67) {
            return interaction.reply('**Tesoura**, você perdeu!');
        } else if (jogada === 'papel' && rng > 67 && rng <= 100) {
            return interaction.reply('**Pedra**, eu perdi :(');
        } else if (jogada === 'tesoura' && rng > 0 && rng <= 34) {
            return interaction.reply('**Tesoura**, empatamos :)');
        } else if (jogada === 'tesoura' && rng > 34 && rng <= 67) {
            return interaction.reply('**Pedra**, você perdeu!');
        } else if (jogada === 'tesoura' && rng > 67 && rng <= 100) {
            return interaction.reply('**Papel**, eu perdi :(');
        }
    }
}