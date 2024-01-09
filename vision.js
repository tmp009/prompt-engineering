require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();

async function visionGPT(url, text) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: [{type: 'text', text: text}, {type:'image_url', image_url: url}] }],
            model:'gpt-4-vision-preview'
        })
        console.log(completion.choices[0].message.content)
    } catch (error) {
        console.log(error);
    }
}


if (process.argv.length < 4) {
    console.log(`node vision.js <link> <text>`)
    exit(0)

} 

const link = process.argv[2]
const text = process.argv[3]

visionGPT(link, text)
