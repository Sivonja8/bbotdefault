const Discord = require('discord.js')
const fetch = require('node-fetch');
const QuickChart = require('quickchart-js');
const axios = require('axios'); 


module.exports.run = async (bot, message, args) => {
  

   const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${args[0]}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
const { dataa } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${args[0]}/tickers`
        );
        // Check if data exists
    let majko = data[0].price_change_percentage_24h >= 0 ? ':chart_with_upwards_trend:' : ':chart_with_downwards_trend:';
  let cuna = data[0].price_change_percentage_24h >= 0 ? '#49eb34' : '#eb4034';
         let trend = data[0].price_change_percentage_24h  > 0 ? '▲' : '▼';
  let trendPercentPrefix = data[0].price_change_percentage_24h > 0 ? '+' : '';
    let trendPercent = data[0].price_change_percentage_24h
    let karina = trendPercent.toFixed(2);
  let sunce = data[0].market_cap_rank    



        const getPrice = async () => {

            
                const result = await fetch(`https://api.coingecko.com/api/v3/coins/${args[0]}/market_chart?vs_currency=usd&days=14&interval=daily`)
                const json = await result.json()
                return json

            
        }
        const chartData = await getPrice();
        console.log(chartData.prices[0][1])


        let arrDate = []
        let arrPrice = []
        const chart = new QuickChart();
        let j = chartData.prices.length;
        for (let i = 0; i < j; i++) {
            let timestamp = chartData.prices[i][0];
            let time = new Date(timestamp)
            let date = `${time.getMonth() + 1}-${time.getDate()}`
            arrDate.push(date)
            let price = chartData.prices[i][1]
            arrPrice.push(price)
        }
        chart.setConfig({
            type: 'line',
            data: {
                labels: arrDate,
                datasets:
                    [{
                        label: `Price (${args.curr ? args.curr : 'usd'}) last ${args.days || args.curr ? args.days : '14'} days `,
                        fontColor: 'white',
                        fill: false,
                        backgroundColor: 'transparent',
                        borderColor: '#EF8E19',
                        data: arrPrice
                    }]
            },
            options: {
                legend: {
                    labels: {
                        fontColor: '#aaa',
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                        },
                        // gridLines: {
                        //   color: '#aaa'
                        // }
                    }]
                }
            }
        });
        if (args.theme === "light" || args.coin === "light" || args.curr === "light") {
            chart.setConfig({
                type: 'line',
                data: {
                    labels: arrDate,
                    datasets:
                        [{
                            label: `Price (${args.curr ? args.curr : 'usd'}) last ${args.days || args.curr ? args.days : '14'} days `,
                            fontColor: 'white',
                            fill: false,
                            backgroundColor: 'transparent',
                            borderColor: '#EF8E19',
                            data: arrPrice
                        }]
                },
                options: {
                    legend: {
                        labels: {
                            fontColor: '#fff',
                        }
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontColor: '#fff'
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                                fontColor: '#fff'
                            },
                            // gridLines: {
                            //   color: '#aaa'
                            // }
                        }]
                    }
                }
            });
        }
        chart.setBackgroundColor('transparent')
        let url = chart.getUrl()

        // if (message.content) {
        //     const chartEmbed = {
        //         image: {
        //             url: chart.getUrl(),
        //         },
        //     };
        //     msg.channel.send({ embed: chartEmbed });
        // }

        const filter = (reaction, user) => {
            return reaction.emoji.name === '🔎' && user.id === message.author.id;
        };
        
        message.awaitReactions(filter, { max: 4, time: 10000, errors: ['time'] })
            .then(collected => console.log(collected.size))
            .catch(collected => {
                console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
            });


        var timestamp = Date.now()
        var date = new Date(timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;

        
         
           
           let gayembed = new Discord.RichEmbed()

  //  .setDescription(`:bar_chart: RXC`)
    .setColor(cuna)
      //  .setImage(`${data[0].image}`)
           .setImage(url)
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
          //  .addField("Tickers",`${data[0].tickers.market}$`,true)
          .setFooter(`${data[0].name}`,`${data[0].image}`)
          .setTimestamp();
    return message.channel.send(gayembed);
                
             
                
                

            
            
        

    

}

module.exports.help = {
  name:"rxcinfo"
}