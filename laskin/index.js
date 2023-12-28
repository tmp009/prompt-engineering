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

app.post('/calc', async (req, res) => {
    try {
        const equation = req.body.equation;
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a calclator." },    
                    {role: "user", content: 
                    `calculate the following equation: "${equation}". Return it as a JSON structer: {"answer": ANSWER} or {"answer": "Ei onnistunut"}`}
                ],
            model: "gpt-4"
          });
    
        res.json( JSON.parse(completion.choices[0].message.content) )
        
    } catch (error) {
        res.json({ answer: "Ei onnistunut" })
    }
});


app.listen(3000, 'localhost', ()=>console.log('http://localhost:3000/'))
