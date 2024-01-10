require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();

async function sendMessage(threadId, asstId, content) {
    try {
        await openai.beta.threads.messages.create(threadId, {
            role:'user',
            content:content
        });


        await openai.beta.threads.runs.create(threadId, {
            assistant_id:asstId
        })

    } catch (error) {
        console.log(error);
    }
}

if (process.argv.length < 5) {
    console.log(`node sendThreadMessage.js <thread_id> <asst_id> <message>`)
    exit(0)

} 

const threadId = process.argv[2];
const asstId = process.argv[3];
const message = process.argv[4];

sendMessage(threadId, asstId, message)
