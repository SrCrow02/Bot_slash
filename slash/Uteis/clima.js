const weather = require("weather-js") //npm i weather-js
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "clima",
    description: "Ver o clima de uma cidade ou pais",
    options: [
        {
            name: "local",
            description: "O local onde deseja ver o clima",
            type: 3,
        }
    ],
    run: async(interaction, client) => {
        const local = interaction.options.getString('local')

//Emoji
const erro = client.emojis.cache.find(emoji => emoji.name === "erro");

weather.find({ search: local, degreeType: 'C', lang: 'pt-BR' }, (err, result) => {
    if (err) throw err;
    result = result[0];
    if (!result) {
        message.channel.send(`:x: | ${message.author}, **Fale um local que exista, ou coloque o nome corretamente!**`);
        return;
    }
    let current = result.current;
    let location = result.location;
    const embed = new MessageEmbed()
    .setThumbnail("https://cdn.pixabay.com/photo/2013/07/12/18/41/weather-153703_960_720.png")
    .setAuthor(`Tempo para: ${location.name}`)
    .setDescription(`${current.skytext}`)
    .addField("Fuso horário:", `UTC${location.timezone >= 0 ? "+" : ""}${location.timezone}`, true)
    .addField("Tipo de grau:", location.degreetype, true)
    .addField('Temperatura:', `${current.temperature}° C`, true)
    .addField('Sensação térmica:', `${current.feelslike}° C`, true)
    .addField('Ventos:', current.winddisplay, true)
    .addField('Umidade:', `${current.humidity}%`, true)
    .setColor('#00BFFF')

    interaction.reply({ embeds: [embed] });
});
}
}