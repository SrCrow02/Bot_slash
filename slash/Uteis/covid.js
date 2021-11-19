const { MessageEmbed } = require('discord.js');
const axios = require('axios')
const ms = require('ms')
const jimp = require('jimp');

module.exports = {
    name: "covid",
    description: "Ver os casos de covid no mundo",
    options: [
        {
            name: "local",
            description: "O local que deseja ver os casos da covid-19",
            type: 3,
        }
    ],
    run: async(interaction, client) => {
        const local = interaction.options.getString('local')

        const baseUrl = "https://corona.lmao.ninja/v2";

        let url, response, corona;

        try {
            url = local ? `${baseUrl}/countries/${local}`:`${baseUrl}/all`
            response = await axios.get(url)
            corona = response.data
        } catch (error) {
            return interaction.reply(`:x: | ***${local}*** não existe ou os dados não estão sendo coletados`)
        }

        const embed = new MessageEmbed()
            .setTitle(local ? `${local.toUpperCase()} Stats` : 'Total de casos de Corona em todo o mundo')
            .setColor('#00BFFF')
            .setThumbnail(local ? corona.countryInfo.flag : 'https://i.giphy.com/YPbrUhP9Ryhgi2psz3.gif')
            .addFields(
                {
                    name: 'Total De Casos:',
                    value: corona.cases.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Total De Mortes:',
                    value: corona.deaths.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Total De Recuperações:',
                    value: corona.recovered.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Casos Ativos:',
                    value: corona.active.toLocaleString(),
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true
                },
                {
                    name: 'Casos Críticos:',
                    value: corona.critical.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Recuperações De Hoje:',
                    value: corona.todayRecovered.toLocaleString().replace("-", ""),
                    inline: true
                },
                {
                    name: 'Mortes De hoje:',
                    value: corona.todayDeaths.toLocaleString(),
                    inline: true
                })

            interaction.reply({embeds: [embed]})

    }
}