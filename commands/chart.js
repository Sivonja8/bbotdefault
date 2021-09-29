const Discord = require("discord.js");
const webshot = require("webshot");
const fs = require("fs")
module.exports.run = async (bot, message, args) => {
  let site = args.join(" ")
var options = {
  
    windowSize: {
    width: 1024
  , height: 768
  }
, shotSize: {
    width: 'window'
  , height: 'window'
  }
  , defaultWhiteBackground: false
, customCSS: ''
, takeShotOnCallback: false
, streamType: 'png'
, siteType: 'url'
, renderDelay: 10000
  , quality: 75
, errorIfStatusIsNot200: false
, errorIfJSException: false
, cookies: []
, captureSelector: false
, zoomFactor: 1
, userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
    + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
};
webshot('https://www.coingecko.com/en/coins/bitcoin/usd#panel', 'supa.png',  options,function(err) {
  if (!err) {
    console.log('Screenshot taken!');
  }
});
  setTimeout(function(){ 
    let attachment = new Discord.Attachment("../../app/supa.png", 'supa.png')
    let cuna =  new Discord.RichEmbed()
    .setTitle("Karina")
    .attachFile(attachment)
    .setImage(`attachment://supa.png`)
    //const karina = new Discord.Attachment("../../app/supa.png", 'supa.png')
                message.channel.send(cuna)
 }, 10000);
  
};

module.exports.help = {
  name:"chart"
}