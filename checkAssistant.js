require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');


const openai = new OpenAI();

async function getAssistants() {
    const assistants = await openai.beta.assistants.list()
    console.table(assistants.data,  ["id", "instructions", "name", "model"])
}

if (process.argv.length < 2) {
    console.log(`node checkAssistant.js`)
    exit(0)
} 

getAssistants()
