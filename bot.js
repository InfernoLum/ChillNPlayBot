const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token
const fs = require('fs');

let prfx = '?';

var gotCoins = new Set();
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
	if(!userData[sender.id].money && userData[sender.id].money != 0) userData[sender.id].money = 600;

    if (message.content === 'ping') {
    	message.reply('pong');
	}
	if(message.content === "embed")
	{
		const embed = new Discord.MessageEmbed()
		.setColor(0xffffff)
		.setFooter('This is a test embed')
		.setDescription('This is the description of the embed')
		message.channel.send(embed)
	}

	let command = message.content.slice(prfx.length).trim().split(/ +/g).shift().toLowerCase();
	//let args = message.content.slice(prfx.length).slice(command.length);
	//let args2 = message.content.slice(prfx.length).slice(command.length).split(" ");
	let args = message.content.split(" ");

	if(message.content.startsWith(prfx + command))
	{
					
		switch(command.toLowerCase())
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
				let FlippedCoins = parseInt(args[1]);
				if(FlippedCoins >= 1)
				{
					if(userData[sender.id].money >= FlippedCoins)
					{
						switch(_coin)
						{
							case 0: 
								userData[sender.id].money += Math.floor(FlippedCoins*2.5); 
								message.reply("💰You win!💰" + " Your new balance is: " + userData[sender.id].money); 
							break;
			
							case 1: 
								userData[sender.id].money -= FlippedCoins; 
								message.reply("💀You lose!💀" + " Your new balance is: " + userData[sender.id].money); 
							break;
			
			
						}
					}
				}else
				{
					message.reply("Minimum bet is 1");
				}

			break;
				message.channel.send(args);

			case "help": 
				message.channel.send(":regional_indicator_c: :regional_indicator_m: :regional_indicator_d: :regional_indicator_s:");
				message.channel.send(":one: *** - PING***");
				message.channel.send(":two: *** - 8BALL [QUESTION]***");
				message.channel.send(":three: *** - FLIP [AMOUNT OF COINS]***");
				message.channel.send(":four: *** - BAL [USER]***");
				message.channel.send(":five: *** - FREECOINS") 
				message.delete(10000);
			break;
				
			case "bal":
				console.log(args[1]);
				if(args[1] === undefined)
				{
					message.reply("Your Balance is: " + userData[sender.id].money + "💰");
				}
				else
				{
					let bUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args);
					message.reply("This user has: " + userData[bUser.id].money + "💰");
				}
			break;

			case "pay":
				let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args);
				//console.log(pUser.id);
				if (!userData[pUser.id]) 
				{
					userData[pUser.id] = {
						money: 600
					};
				}
				if(userData[sender.id].money >= parseInt(args[2]))
				{
					userData[pUser.id].money += parseInt(args[2]);
					userData[sender.id].money -= parseInt(args[2]);
					message.channel.send(pUser + " You were sent " + args[2] + "💰" + " by " + message.author);
					message.channel.send(pUser + "Your new balance is: " + userData[pUser.id].money)
					message.delete(10000);
				}
			break;
			case "freecoins":
				if(gotCoins.has(message.author.id))
				{
					message.reply("You can get free coins every 30 minutes!");
				}else
				{
					message.reply("You have been given some free coins.");
					userData[sender.id].money += 1200;
					gotCoins.add(message.author.id);
				}
			break;

			case "mute":
			break;

			case "unmute":
			break;
		}
	}
	setTimeout(() => {
		gotCoins.delete(message.author.id);
	}, 1800000);
});

// THIS  MUST  BE  THIS  WAY
client.login(token).catch(err => console.log(err));
