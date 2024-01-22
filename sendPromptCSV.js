require('dotenv').config();

const { OpenAI } = require('openai');

const openai = new OpenAI();

async function prompt(message) {
    const messages = [{role:'system', content: 'Only respond with the csv data. Start the message with the csv variable names if it exists'},{role:'user', content: message}]
    const completion = await openai.chat.completions.create({
        messages,
        model: "gpt-4"
    })

    return completion.choices[0].message.content
    
}

module.exports = { prompt }