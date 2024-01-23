require('dotenv').config();

const fs = require('fs')
const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();

async function sendMessage(threadId, asstId, content, fileid) {
    try {

        await openai.beta.threads.messages.create(threadId, {
            role:'user',
            content:content,
            file_ids: [fileid]
        });


        await openai.beta.threads.runs.create(threadId, {
            assistant_id:asstId
        })


    } catch (error) {
        console.log(error);
    }
}

if (process.argv.length < 6) {
    console.log(`node sendThreadMessageFile.js <thread_id> <asst_id> <file_id> <message>`)
    exit(0)

} 

const threadId = process.argv[2];
const asstId = process.argv[3];
const fileId = process.argv[4];
const message = process.argv[5];

sendMessage(threadId, asstId, message, fileId)
