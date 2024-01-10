require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();

async function createThread() {
    try {
        const thread = await openai.beta.threads.create();
        console.log(thread.id)
    } catch (error) {
        console.log(error);
    }
}

if (process.argv.length < 2) {
    console.log(`node createNewThread.js`)
    exit(0)
} 

createThread();
