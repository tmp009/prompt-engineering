require('dotenv').config();

const fs = require('fs');
const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();

async function speech(output, text) {
    try {
        const mp3 = await openai.audio.speech.create({
            model: 'tts-1',
            voice:'alloy',
            input: text
        })
        const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs.promises.writeFile(output, buffer);
    } catch (error) {
        console.log(error);
    }
}


if (process.argv.length < 4) {
    console.log(`node speech.js <output> <text>`)
    exit(0)

} 

const output = process.argv[2]
const text = process.argv[3]

speech(output, text)
