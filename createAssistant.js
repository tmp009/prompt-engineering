require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();

async function createAssistant(name, instruction) {
    try {
        const assistant = await openai.beta.assistants.create({
            name: name,
            instructions: instruction,
            tools: [{ type: "code_interpreter" }],
            model: "gpt-4-1106-preview"
        })

        console.log(assistant.id)
    } catch (error) {
        console.log(error);
    }
}


if (process.argv.length < 4) {
    console.log(`node createAssistant.js <name> <instruction>`)
    exit(0)

} 

const name = process.argv[2]
const inst = process.argv[3]

createAssistant(name, inst)
