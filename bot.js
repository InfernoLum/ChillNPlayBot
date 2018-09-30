const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token
let prfx = '?';
client.on('ready', () => {
    console.log('Hello Starchild!');
});

client.on('message', message => {
    
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
    if (message.content === 'flip') {
	    message.reply('flop');
    }
    let command = message.content.slice(prfx.length).trim().split(/ +/g).shift().toLowerCase();
	if(message.content.startsWith(prfx + command))
	{

		switch(command)
		{
			case "ping": message.channel.send("Pong!"); break;
			case ("8ball" && command.lenght > 6):
				console.log("Something should happen now");
				let _answer = Math.floor((Math.random() * 5));
				switch(_answer)
				{
					case 0: message.channel.send("Most likely"); break;
					case 1: message.channel.send("Yes"); break;
					case 2: message.channel.send("Maybe"); break;
					case 3: message.channel.send("Not likely"); break;
					case 4: message.channel.send("No"); break;
				}
			break;
			case "flip":
			
				let _coin = Math.floor((Math.random() * 2));
				switch(_coin)
				{
					case 0: message.channel.send("It's Heads"); break;
					default: message.channel.send("It's Tails"); break;
				}
			break;
			case "cmds": 
				message.channel.send(":regional_indicator_c: :regional_indicator_m: :regional_indicator_d: :regional_indicator_s:");
				message.channel.send(":one: *** - PING***");
				message.channel.send(":two: *** - 8BALL***");
				message.channel.send(":three: *** - FLIP***"); break;

		}
	}
});

// THIS  MUST  BE  THIS  WAY
client.login(token).catch(err => console.log(err));
