require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');
const math = require('mathjs');


const openai = new OpenAI();

function similarity(a, b) {
    const dotProduct = math.dot(a, b);
    const magnitudeA = math.norm(a);
    const magnitudeB = math.norm(b);
    return dotProduct / (magnitudeA * magnitudeB);
}

async function getEmbedding(text) {
    const data = await openai.embeddings.create({
        input:text, model:'text-embedding-ada-002',
    })
    return data.data
}

async function runEmbedding(text1, text2) {
    const embedding1 = await getEmbedding(text1)
    const embedding2 = await getEmbedding(text2)

    console.log(similarity(embedding1[0].embedding, embedding2[0].embedding))
}

if (process.argv.length < 4) {
    console.log(`node embedding.js <text1> <text2>`)
    exit(0)
} 


const text1 = process.argv[2];
const text2 = process.argv[3];

runEmbedding(text1, text2)
