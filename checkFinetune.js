require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');


const openai = new OpenAI();

async function getModels() {
    // const models = await openai.fineTunes.list()
    const models = await openai.fineTuning.jobs.list()
    console.table(models.data,  ["id", "status", "fine_tuned_model", "model"])
}

if (process.argv.length < 2) {
    console.log(`node checkFinetune.js`)
    exit(0)
} 

getModels()
