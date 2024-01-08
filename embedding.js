require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');


const openai = new OpenAI();

async function runEmbedding(text) {
    const data = await openai.embeddings.create({
        input:text, model:'text-embedding-ada-002',
    })

    return data.data
}

if (process.argv.length < 3) {
    console.log(`node embedding.js <text>`)
    exit(0)
} 


const text = process.argv[2];

runEmbedding(text).then(console.log)
