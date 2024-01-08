require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');


const openai = new OpenAI();

async function runimageGen(text) {
    const data = await openai.images.generate({
        prompt: text ,
        model:'dall-e-3'
    })

    return data.data
}

if (process.argv.length < 3) {
    console.log(`node imagegen.js <text>`)
    exit(0)
} 

const text = process.argv[2];

runimageGen(text).then(data => console.log(data[0].url))
