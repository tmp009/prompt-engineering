require('dotenv').config();

const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();

const tools = [{
    type:'function',
    "function": {
        "name": "get_time",
        "description":
         `Get the coordinates of the specified location. The time will be in 24-hour format.
        Return the current time for the specified coordinate's area`,
        "parameters": {
          "type": "object",
          "properties": {
            "Ncoord": {
              "type": "number",
              "description":"The north coordinate of an area",
            },
            "Ecoord": {
                "type": "number",
                "description":"The east coordinate of an area",                  
            }
          },
          "required": ["Ncoord", "Ecoord"]
        }
      }
    }
]

async function get_time({Ncoord, Ecoord}) {
    const response = await fetch(`https://timeapi.io/api/Time/current/coordinate?latitude=${Ncoord}&longitude=${Ecoord}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    }
    )
    return await response.text();
}

if (process.argv.length < 3) {
    console.log('node testChatFunction.js <text>')
    exit(0)
}

const message = process.argv[2];

async function run(message) {
    const messages = [{role:'system', content: "If the user asks for the time of any place, respond using get_time function. You can only get one time information at an time"}, {role:'user', content: message}]
    const completion = await openai.chat.completions.create({
        messages,
        model: "gpt-4-1106-preview",
        tools: tools,
        tool_choice: {"type": "function", "function": {"name": "get_time"}}
    });

    const toolCalls = completion.choices[0].message.tool_calls;
    if (toolCalls) {
        const funcName = completion.choices[0].message.tool_calls[0].function.name;
        const funcArgs = JSON.parse(completion.choices[0].message.tool_calls[0].function.arguments);

        if (funcName == 'get_time') {
            messages.push({role:'function', name:funcName, content: await get_time(funcArgs)})
            const stream = await openai.chat.completions.create({
                messages,
                model: "gpt-4-1106-preview",
                stream:true
            });
    
            for await (const chunk of stream) {
                process.stdout.write(chunk.choices[0]?.delta?.content || "");
            }
        }
    }
    else {
        console.log(completion.choices[0].message.content)

    }
    
}

run(message)