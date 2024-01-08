require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');


const openai = new OpenAI();

async function getModels() {
    const models = await openai.fineTunes.list()
    const models2 = await openai.fineTuning.jobs.list()
    console.table(models.data.concat(models2.data),  ["id", "status", "fine_tuned_model"])
}

if (process.argv.length < 2) {
    console.log(`node checkFinetune.js`)
    exit(0)
} 

getModels()
