const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
 const { Canvas, resolveImage } = require('canvas-constructor/skia');

async function createCanvas() {
	const image = await resolveImage('./images/kitten.png');

	return new Canvas(300, 400)
		.printImage(image, 0, 0, 300, 400)
		.setColor('#FFAE23')
		.setTextFont('28px Impact')
		.setTextAlign('center')
		.printText('Kitten!', 150, 370)
		.toBufferAsync();
}
}
module.exports.help = {
  name:"gayrate"
}