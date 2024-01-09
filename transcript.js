require('dotenv').config();

const fs = require('fs')
const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();

async function transcribe(file, language) {
    try {
        const transcription = await openai.audio.transcriptions.create({
            file:fs.createReadStream(file),
            language: language,
            model: 'whisper-1'
        })

        console.log(transcription.text)
    } catch (error) {
        console.log(error);
    }
}


if (process.argv.length < 4) {
    console.log(`node transcript.js <file> <language>`)
    exit(0)

} 

const file = process.argv[2]
const lang = process.argv[3]

transcribe(file, lang)
