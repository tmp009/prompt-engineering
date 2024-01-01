require('dotenv').config();

const path = require('path');
const express = require('express');
const { OpenAI } = require('openai');

const app = express();
const openai = new OpenAI();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "index.html"))
});

app.post('/chat', async (req, res) => {
    try {
        const messages = req.body.messages;
        if (messages.length > 50) {
            throw new Error("Liika viestiä! Lataa sivusto uudelleen.")
        }

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a chatbot." }].concat(messages),
            model: "gpt-4"
          });
    
        res.json( {content: completion.choices[0].message.content} )
        
    } catch (error) {
        res.status(403).json( {content: error.message} )
    }
});


app.listen(3000, 'localhost', ()=>console.log('http://localhost:3000/'))
