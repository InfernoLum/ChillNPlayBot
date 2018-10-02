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
	if(!userData[sender.id].money && userData[sender.id].money != 0) userData[sender.id].money = 600;

    if (message.content === 'ping') {
    	message.reply('pong');
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
							case 0: message.channel.send("💰You win!💰"); 
								userData[sender.id].money += Math.floor(FlippedCoins*2.5); 
							break;
			
							case 1: message.channel.send("💀You lose!💀"); 
								userData[sender.id].money -= FlippedCoins; 
							break;
			
			
						}
					}
				}else
				{
					message.reply("Minimum bet is 1");
				}

			break;
				message.channel.send(args);

			case "cmds": 
				message.channel.send(":regional_indicator_c: :regional_indicator_m: :regional_indicator_d: :regional_indicator_s:");
				message.channel.send(":one: *** - PING***");
				message.channel.send(":two: *** - 8BALL***");
				message.channel.send(":three: *** - FLIP [AMOUNT]***");
				message.channel.send(":four: *** - BAL***"); 
				message.delete(10*1000);
			break;
				
			case "bal":
				if(args[1] == " ")
				{
					message.reply("Your Balance is:" + " " + userData[sender.id].money + "💰"); break;
				}
				else
				{
					let bUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args);
					balEmb = new Discord.RichEmbed()
					.setTitle(message.author)
					.addField(bUser + "Has" + (userData[bUser.id].money + "💰"));
				}
				

			case "pay":
				let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args);
				console.log(pUser.id);
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
					pEmbed = new Discord.RichEmbed(title=message.author, description=("You sent " + args[2] + "💰"), color=0xa50fd0)
					pEmbed.add_field(name="To" + pUser);
					
					message.delete(10000);
				}

			break;

			case "mute":
				let _MuteUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args);
				if(args[1] != " ")
				{
					if(_MuteUser.mute == true)
					{
						message.reply("This user is already muted");
						message.delete(6000);
					}else
					{
						_MuteUser.setMute = true;
					}
				}
			break;

			case "unmute":
				let _UnmuteUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args);
				if(_UnmuteUser.mute != true)
				{
					message.reply("This user is not muted");
					message.delete(6000);
				}else
				{
					_UnmuteUser.setMute = false;
				}
			break;
		}
	}
});

// THIS  MUST  BE  THIS  WAY
client.login(token).catch(err => console.log(err));
