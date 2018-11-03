const server = require('server');
const Discord = require('discord.js');
const config = require('config');
const { get, post } = server.router;
var guild;
var channel;

const token = config.get('discord.token');
const guildid = config.get('guild.id');
const channelname = config.get('guild.channel');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
guild = client.guilds.get(guildid);
channel = guild.channels.find("name", channelname);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(token);

//I would add an option for the port but it's hardcoded on the server anyway.
server({ port: 45678 }, [
  get('/', ctx => {console.log(ctx.query); 
	  channel.send(ctx.query.mesg);
	  return 200;}),
  post('/', ctx => console.log(ctx.data))
]);
