const Discord = require("discord.js");
const { Client, Intents } = require('discord.js');
const firebase = require('firebase')

const config = require('./config.json');
const token = config.token;

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_BANS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS
]});

const { initializeApp } = require("firebase/app") ;

const firebaseConfig = {
  apiKey: "AIzaSyD0_DaGcaIbgaf6oiUyFLiKXM4q38qrIG0",
  authDomain: "economia-6cb82.firebaseapp.com",
  databaseURL: "https://economia-6cb82-default-rtdb.firebaseio.com",
  projectId: "economia-6cb82",
  storageBucket: "economia-6cb82.appspot.com",
  messagingSenderId: "681329130946",
  appId: "1:681329130946:web:27cc7213f521f7c3ad2a5b",
  measurementId: "G-0HDEG52PXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let database = firebase.database()

const fs = require("fs");
client.categories = fs.readdirSync("./commands/");
const { readdirSync } = require('fs');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const path = require('path');
require('colors');

client.commands = new Discord.Collection();
client.slash = new Discord.Collection();
client.aliases = new Discord.Collection();

const commands = []
readdirSync("./slash/").map(async dir => {
	readdirSync(`./slash/${dir}/`).map(async (cmd) => {
	commands.push(require(path.join(__dirname, `./slash/${dir}/${cmd}`)))
    })
})
const rest = new REST({ version: "9" }).setToken(token);

(async () => {
	try {
		console.log('Comecei a atualizar os comandos!'.yellow);
		await rest.put(
			Routes.applicationCommands(config.botID),
			{ body: commands },
		);
		console.log('Atualizei todos os comandos slash!'.green);
	} catch (error) {
		console.error(error);
	}
})();

["handlers", "events", "slash"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

  
client.login(config.token);