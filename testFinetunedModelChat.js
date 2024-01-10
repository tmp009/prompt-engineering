require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();


if (process.argv.length < 4) {
    console.log('node testFinetunedModelChat.js <model> <text>')
    exit(0)
}

const model = process.argv[2];
const message = process.argv[3];

async function run() {
    const completion = await openai.chat.completions.create({
        messages: [{role:'user', content: message}],
        model: model
    });
    console.log(completion.choices[0].message)
}

run()