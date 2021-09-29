const Discord = require('discord.js')
const fetch = require('node-fetch');
const QuickChart = require('quickchart-js');
const axios = require('axios'); 


module.exports.run = async (bot, message, args) => {
  

   const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=rxc&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
const { dataa } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/rxc/tickers`
        );
        // Check if data exists
    let majko = data[0].price_change_percentage_24h >= 0 ? ':chart_with_upwards_trend:' : ':chart_with_downwards_trend:';
  let cuna = data[0].price_change_percentage_24h >= 0 ? '#49eb34' : '#eb4034';
         let trend = data[0].price_change_percentage_24h  > 0 ? '▲' : '▼';
  let trendPercentPrefix = data[0].price_change_percentage_24h > 0 ? '+' : '';
    let trendPercent = data[0].price_change_percentage_24h
    let karina = trendPercent.toFixed(2);
  let sunce = data[0].market_cap_rank    

                
             
                
                

const { Canvas } = require('canvas-constructor/skia');
// or `canvas-constructor/cairo` if you are using `canvas`

new Canvas(300, 300)
	.setColor('#AEFD54')
	.printRectangle(5, 5, 290, 290)
	.setColor('#FFAE23')
	.setTextFont('28px Impact')
	.printText('Hello World!', 130, 150)
	.toBuffer();
            
        
message.channel.send(Canvas.toBuffer())
    

}

module.exports.help = {
  name:"market"
}