require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();

async function moderate(text) {
    try {
        const moderation = await openai.moderations.create({
            input:text
        })

        console.log(moderation.results)
    } catch (error) {
        console.log(error);
    }
}


if (process.argv.length < 3) {
    console.log(`node moderate.js <text>`)
    exit(0)

} 

const text = process.argv[2]

moderate(text)
