const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const fs = require("fs");
const botconfig = require("./botconfig.json");
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
  console.log("Couldn't find commands.");
  return;
  }

  jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded.`);
  bot.commands.set(props.help.name, props);
  });
});


bot.on("ready", async () => {
  
   
 // bot.user.setUsername('Rujtex')
 //bot.user.setAvatar('https://cdn.glitch.com/e50e708f-344b-48e9-a63d-ef3b3f7b9510%2Fl.png?v=1581636437611')
  try {
		let link = await bot.generateInvite();
		console.log(link);
	} catch (error) {
		bot.log(error.stack);
	}

  
    setInterval(async () => {
    const statuslist = [
      `?help | ${bot.guilds.size} servers`,
      `?help | ?prefix`,
      `${bot.users.size} members`
    ];
    const random = Math.floor(Math.random() * statuslist.length);

    try {
      bot.user.setActivity(`${statuslist[random]}`, {
  type: "STREAMING",
  url: "https://www.twitch.tv/logaut"
});
    {       
        }
             
    } catch (error) {
      console.error(error);
    }
  }, 10000);
 // var channel = bot.channels.get("544597343606145026");
//    channel.send(`${bot.user.username} is online on ${bot.guilds.size} servers and ${bot.users.size} members!`)
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers and ${bot.users.size} members!`);

});

bot.on('message', message => {
  if(message.content.startsWith(`<@${bot.user.id}>`)) {
    let prefixes = JSON.parse(fs.readFileSync("./JSON/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;
    if(message.author.bot || message.channel.type == "dm") return
    let mention = new Discord.RichEmbed()
    .setColor("#71368a")
    .setDescription(`**Sve komande možeš vidjeti komandom \`${prefix}help\`**`)
    message.channel.send(mention)
  }
});

bot.on("message", async message => {
  
    if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let prefixes = JSON.parse(fs.readFileSync("./JSON/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);


})


bot.login(process.env.SECRET);
