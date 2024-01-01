let messages = [];


async function msgToNode(message) {
    const div = document.createElement("div");
    div.classList.add("message");

    let span = document.createElement("span");
    let time = new Date()
    
    div.appendChild(Object.assign(document.createElement("p"), {innerHTML: message.kirjoittaja}))
    div.appendChild(Object.assign(document.createElement("p"), {innerHTML: message.viesti}))
    div.appendChild(Object.assign(document.createElement("p"), {innerHTML: `${time.toDateString()} ${time.toLocaleTimeString()}`}))
    div.appendChild(span)
    return div
}


async function sendMsg() {
    const response = await fetch('/chat',  {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            messages
        }),
    })

    return await response.json()
}

function scrollDown() {
    let content = document.getElementById("messages")
    content.childNodes[content.childNodes.length-1].scrollIntoView();
}

document.getElementById("send-btn").addEventListener("click", async (e)=>{
    e.target.disabled = 'true';

    const message = document.getElementById("msg").value;
    document.getElementById("msg").value = '';
    const messageList = document.getElementById("messages");

    if (message.length > 0) {
        messageList.appendChild(await msgToNode({viesti: message, kirjoittaja: 'Sinä'}));
        messages.push({ role: "user", content: message });
        scrollDown();
        
        const reply = await sendMsg(messages);

        messages.push({ role: "system", content: reply.content });
        messageList.appendChild(await msgToNode({viesti: reply.content, kirjoittaja: 'System'}));
        e.target.disabled = '';
        scrollDown();
    }
})