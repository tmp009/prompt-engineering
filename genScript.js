require('dotenv').config();

const fs = require('fs')
const { OpenAI } = require('openai');
const { exit } = require('process');


const openai = new OpenAI();

async function genScript(text) {
    const data = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You will take the user's input and generate creative data based on the instructions given to you. Be precise as much as possible. If there's dialog, show them. The input will be in Finnish. You will respond in Finnish." },    
            { role: "system", content: "You will also put the timestamps in between scenes." },    
        {role: "user", content: text}
    ],
        model: "gpt-4-1106-preview"
    })

    return data.choices[0].message.content
}

if (process.argv.length < 4) {
    console.log(`node genScript.js <filename> <text>`)
    exit(0)
} 

const filename = process.argv[2];
const text = process.argv[3];

genScript(text).then(content => fs.writeFileSync(filename, content))
