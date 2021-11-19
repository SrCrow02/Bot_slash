const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "mute",
    description: "Mutar um usuario",
    permissions: "MANAGE_MESSAGES",
    options: [
        {
            name: "user",
            description: "Usuario que sera mutado",
            type: 6,
            required: true
        },
        {
            name: "motivo",
            description: "Motivo de mute",
            type: 3
        }
    ],
    timeout: 3000,
    run: async(interaction) => {
        const user = interaction.options.getMember('user');
        const motivo = interaction.options.getString('motivo') || '';

        let no = client.emojis.cache.find(emoji => emoji.name === "nocheck"); 
        let est = client.emojis.cache.find(emoji => emoji.name === "estrela");

        if (interaction.user.id === user.id) {
            return interaction.reply({ content: `${no} | Você não pode se silenciar` })
        }
        const botRole = interaction.guild.me.roles.highest.position;
        const role = user.roles.highest.position;
        const authorRole = interaction.member.roles.highest.position;

        if (authorRole <= role) {
            const embed = new MessageEmbed()
            .setTitle(`${no} | **Não posso silenciar este membro porque ele tem uma posição de função superior à minha ou igual a você!**`)
            .setColor('#ff0000')
            return interaction.reply({ embeds: [embed] })
        }
        if (botRole <= role) {
            const embed = new MessageEmbed()
            .setTitle(`${no} | **Não posso silenciar este membro porque ele tem uma posição de função superior à minha ou igual a você!**`)
            .setColor('#ff0000')
            return interaction.reply({ embeds: [embed] })
        }
        try {
            const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Mutado');
            if (!muteRole) {
                this.createMutedRole = await interaction.guild.roles.create({
                    name: "Mutado",
                    motivo: "Configurar função silenciada para comando silenciado"
                })
            }
            if (user.roles.cache.has(this.createMutedRole.id)) {
                return interaction.reply({ content: `${no} | Este usuário já está silenciado` })
            }
            interaction.guild.channels.cache.forEach((channel) => {
                channel.permissionOverwrites.edit(this.createMutedRole.id, { SEND_MESSAGES: false, ADD_REACTIONS: false })
            })
            await user.roles.add(this.createMutedRole, `Author: ${interaction.user.tag} Motivo: ${motivo}`)
            interaction.reply({ content: `✅ | ${interaction.user}, O **@${user.user.username} Foi mutado!**` })
        } catch (e) {
            console.error(e);
            return interaction.reply({ content: `${no} | **Ocorreu um erro, verifique minha permissão e posição da função!**` })
        }
    }
}