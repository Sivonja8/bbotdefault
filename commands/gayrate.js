const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const fs = require("fs");
const dotenv = require('dotenv');
const axios = require('axios'); 

module.exports.run = async (bot, message, args) => {
if (!args[0]) return message.channel.send('**Unesi ime kriptovalute**')
var BAM = 1.65;
      
        // Get crypto price from coingecko API
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${args[0]}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
const { dataa } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/tickers`
        );
        // Check if data exists
        
let majko = data[0].price_change_percentage_24h >= 0 ? ':chart_with_upwards_trend:' : ':chart_with_downwards_trend:';
  let cuna = data[0].price_change_percentage_24h >= 0 ? '#49eb34' : '#eb4034';
         let trend = data[0].price_change_percentage_24h  > 0 ? '▲' : '▼';
  let trendPercentPrefix = data[0].price_change_percentage_24h > 0 ? '+' : '';
    let trendPercent = data[0].price_change_percentage_24h
    let karina = trendPercent.toFixed(2);
  let sunce = data[0].market_cap_rank
  
  let a =data[0].current_price
  let b =data[0].market_cap
  let c =data[0].total_volume
  let d =data[0].high_24h
  let e =data[0].low_24h
  //console.log(sunce)
  if(args[1]=="bam"){
  if (sunce ==null){
    let gayembed = new Discord.RichEmbed()

  //  .setDescription(`:bar_chart: RXC`)
    .setColor(cuna)
      //  .setImage(`${data[0].image}`)
           .setThumbnail(`${data[0].image}`)
         // .setDescription("karina")
          .setDescription(majko +" "+`**${data[0].name}** (${trendPercentPrefix}**${karina}%**) ${trend}`)
          .addField("Symbol",`${data[0].symbol}`)
        //  .addField("Symbol",`${trendPercentPrefix}${karina}% ${trend} `)
          .addField("Current Price",(a*BAM).toFixed(8)+" KM" )
          .addField("Market Cap",b*BAM+" KM",true)
           .addField("Market Cap Rank",`X`,true)
           .addField("24 Hour Trading Vol",(c*BAM).toFixed(8)+" KM")
           .addField("24h High",(d*BAM).toFixed(8)+" KM",true)
          .addField("24h Low",(e*BAM).toFixed(8)+" KM",true)
          .setFooter(`${data[0].name}`,`${data[0].image}`)
          .setTimestamp();
    return message.channel.send(gayembed);
    
  }
  else 
  {
      let gayembed = new Discord.RichEmbed()

  //  .setDescription(`:bar_chart: RXC`)
    .setColor(cuna)
      //  .setImage(`${data[0].image}`)
           .setThumbnail(`${data[0].image}`)
         // .setDescription("karina")
          .setDescription(majko +" "+`**${data[0].name}** (${trendPercentPrefix}**${karina}%**) ${trend}`)
          .addField("Symbol",`${data[0].symbol}`)
        //  .addField("Symbol",`${trendPercentPrefix}${karina}% ${trend} `)
          .addField("Current Price",(a*BAM).toFixed(8)+" KM" )
          .addField("Market Cap",b*BAM+" KM",true)
               .addField("Market Cap Rank",`${data[0].market_cap_rank}`,true)
           .addField("24 Hour Trading Vol",(c*BAM).toFixed(8)+" KM")
           .addField("24h High",(d*BAM).toFixed(8)+" KM",true)
          .addField("24h Low",(e*BAM).toFixed(8)+" KM",true)
          .setFooter(`${data[0].name}`,`${data[0].image}`)
          .setTimestamp();
    return message.channel.send(gayembed);
    
    } 
     
    }else{
      if (sunce ==null){
  let gayembed = new Discord.RichEmbed()

  //  .setDescription(`:bar_chart: RXC`)
    .setColor(cuna)
      //  .setImage(`${data[0].image}`)
           .setThumbnail(`${data[0].image}`)
         // .setDescription("karina")
          .setDescription(majko +" "+`**${data[0].name}** (${trendPercentPrefix}${karina}%) **${trend}**`)
          .addField("Symbol",`${data[0].symbol}`)
        //  .addField("Symbol",`${trendPercentPrefix}${karina}% ${trend} `)
          .addField("Current Price",`${data[0].current_price}$`)
          .addField("Market Cap",`${data[0].market_cap}$`,true)
           .addField("Market Cap Rank",`X`,true)
           .addField("24 Hour Trading Vol",`${data[0].total_volume}$`)
           .addField("24h High",`${data[0].high_24h}$`,true)
          .addField("24h Low",`${data[0].low_24h}$`,true)
          .setFooter(`${data[0].name}`,`${data[0].image}`)
          .setTimestamp();
    return message.channel.send(gayembed);
  }
  else 
  {
          let gayembed = new Discord.RichEmbed()

  //  .setDescription(`:bar_chart: RXC`)
    .setColor(cuna)
      //  .setImage(`${data[0].image}`)
           .setThumbnail(`${data[0].image}`)
         // .setDescription("karina")
          .setDescription(majko +" "+`**${data[0].name}** (${trendPercentPrefix}${karina}%) **${trend}**`)
          .addField("Symbol",`${data[0].symbol}`)
        //  .addField("Symbol",`${trendPercentPrefix}${karina}% ${trend} `)
          .addField("Current Price",`${data[0].current_price}$`)
          .addField("Market Cap",`${data[0].market_cap}$`,true)
           .addField("Market Cap Rank",`${data[0].market_cap_rank}`,true)
           .addField("24 Hour Trading Vol",`${data[0].total_volume}$`)
           .addField("24h High",`${data[0].high_24h}$`,true)
          .addField("24h Low",`${data[0].low_24h}$`,true)
          //  .addField("Tickers",`${data[0].tickers.market}$`,true)
          .setFooter(`${data[0].name}`,`${data[0].image}`)
          .setTimestamp();
    return message.channel.send(gayembed);
     
    } 
      
    }
};


module.exports.help = {
  name:"price"
}