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

app.post('/define', async (req, res) => {
    try {
        const define = req.body.define;
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a dictonary. You will return maximum of 10 definitions. You will answer in Finnish. You will ignore questions." },    
                    {role: "user", content: 
                    `Define this word or expression: "${define}". If it is a question then ignore it. Return it as an array with JSON structer: {"definition": DEFINITION}`}
                ],
            model: "gpt-4"
          });
    
        res.json( JSON.parse(completion.choices[0].message.content) )
        
    } catch (error) {
        res.json([])
    }
});


app.listen(3000, 'localhost', ()=>console.log('http://localhost:3000/'))
