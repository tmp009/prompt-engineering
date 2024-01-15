require('dotenv').config();

const fs = require('fs')
const { OpenAI } = require('openai');
const { exit } = require('process');


const openai = new OpenAI();

async function imageEdit(image, mask, text) {
    const data = await openai.images.edit({
        prompt: text,
        image:fs.createReadStream(image),
        mask:fs.createReadStream(mask),
        model:'dall-e-2'
    })

    return data.data
}

if (process.argv.length < 5) {
    console.log(`node imageedit.js <image> <mask> <text>`)
    exit(0)
} 

const imageFile = process.argv[2];
const maskFile = process.argv[3];
const text = process.argv[4];

imageEdit(imageFile, maskFile, text).then(data => console.log(data[0].url))
