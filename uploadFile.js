require('dotenv').config();

const fs = require('fs')
const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();

async function uploadFile(filepath) {
    try {
        const file = await openai.files.create({
            file: fs.createReadStream(filepath, {encoding: 'utf8'}),
            purpose: "assistants"
        });

        return file.id
    } catch (error) {
        console.log(error);
    }
}


if (process.argv.length < 3) {
    console.log(`node uploadFile.js <filename>`)
    exit(0)

} 

uploadFile(process.argv[2])
    .then(console.log)
