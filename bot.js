const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token
const fs = require('fs');

let prfx = '?';


let userData = JSON.parse(fs.readFileSync('userData.json' , 'utf8'));


client.on('ready', () => {
    console.log('Hello Starchild!');
});

client.on('message', message => {
	
	//Vars
	let sender = message.author;
	let msg = message.content.toUpperCase();


	//Events
	if (!userData[sender.id]) userData[sender.id] = {}
	if(!userData[sender.id].money) userData[sender.id].money = 600;

    if (message.content === 'ping') {
    	message.reply('pong');
	}
	  
    if (message.content === 'flip') {
	    message.reply('flop');
	}
	
	if(message.content === 'money')
	{
		message.reply(userData[sender.id].money);
	}

	if(message.content === 'getmymoney')
	{
		userData[sender.id].money -= 100;
		message.reply("I took your money" + userData[sender.id].money);
	}

	let command = message.content.slice(prfx.length).trim().split(/ +/g).shift().toLowerCase();
	let args = message.content.slice(prfx.length).slice(command.length).toLowerCase();
	
	if(message.content.startsWith(prfx + command))
	{

		switch(command)
		{
			case "ping": message.channel.send("Pong!"); break;
			case "8ball":
			if(message.content.length >= 6)
			{
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
			}
			break;
			case "flip":
			
				let _coin = Math.floor((Math.random() * 2));
				userData[sender.id].money -= 100;
				switch(_coin)
				{
					case 0: message.channel.send("You win!"); break;
					default: message.channel.send("You lose!"); userData[sender.id].money -= 100; break;
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
