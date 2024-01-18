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

async function get_time(Ncoord, Ecoord) {
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
    console.log('node testChatFunction2.js <text>')
    exit(0)
}
async function run() {
  const message = process.argv[2];
  const messages = [
    { role: "user", content: message },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: messages,
    tools: tools
  });
  const responseMessage = response.choices[0].message;

  const toolCalls = responseMessage.tool_calls;
  if (responseMessage.tool_calls) {
    const availableFunctions = {
      get_time: get_time
    }; 

    messages.push(responseMessage); 
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const functionToCall = availableFunctions[functionName];
      const functionArgs = JSON.parse(toolCall.function.arguments);
      const functionResponse = await functionToCall(
        functionArgs.Ncoord,
        functionArgs.Ecoord
      );

      messages.push({
        tool_call_id: toolCall.id,
        role: "tool",
        name: functionName,
        content: functionResponse,
      }); 
    }
    const stream = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: messages,
      stream:true
    });
    for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
  }
}


run().catch(console.error);