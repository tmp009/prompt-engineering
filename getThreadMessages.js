require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();

async function getMessages(threadId) {
    try {

        const messages = await openai.beta.threads.messages.list(threadId, {limit:100});
        const content = messages.data.map((v)=>v.content[0].text).reverse()

        content.forEach(v => console.log(v.value))            
    } catch (error) {
        console.log(error);
    }
}

if (process.argv.length < 3) {
    console.log(`node getThreadMessages.js <thread_id>`)
    exit(0)

} 

const threadId = process.argv[2];


getMessages(threadId)
