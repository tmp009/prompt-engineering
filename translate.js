require('dotenv').config();

const fs = require('fs')
const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();

async function translate(file) {
    try {
        const translation = await openai.audio.translations.create({
            file:fs.createReadStream(file),
            model: 'whisper-1'
        })

        console.log(translation.text)
    } catch (error) {
        console.log(error);
    }
}


if (process.argv.length < 3) {
    console.log(`node transcript.js <file>`)
    exit(0)

} 

const file = process.argv[2]

translate(file)
