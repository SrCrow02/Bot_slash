module.exports = {
    name: "unmute",
    description: "Permitir que o usuario fale novamente",
    permissions: "MANAGE_MESSAGES",
    options: [
        {
            name: "user",
            description: "Usuario para tirar o mute",
            type: 6,
            required: true
        }
    ],
    run: async(interaction) => {
        const user = interaction.options.getMember('user');

        let no = client.emojis.cache.find(emoji => emoji.name === "nocheck"); 
        let est = client.emojis.cache.find(emoji => emoji.name === "estrela");

        const muteRole = interaction.guild.roles.cache.find(role => role.name == 'Mutado');
        if (!user.roles.cache.has(muteRole.id)) {
            return interaction.reply({ content: `${no} | Esse usuario não esta mutado!` })
        }
        try {
            user.roles.remove(muteRole, `By: ${interaction.user.tag}`)
            interaction.reply({ content: `✅ | O mute do **${user}** foi retirado!` })
        } catch (e) {
            return interaction.reply({ content: `:x: | Erro: **${e}**` })
        }
    }
}