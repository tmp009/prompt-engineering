const text = document.querySelector("input");
const definitions = document.querySelector('h3');
const button = document.querySelector('button');

button.addEventListener("click", async ()=>{

    definitions.innerHTML = 'Haetaan...';

    const data = await fetch('/define', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            define: text.value
        }),
    })
    
    definitions.innerHTML = '';

    const jsonData = await data.json();

    if (jsonData.length) {
        jsonData.forEach(word => {
            const element = document.createElement('p')
            element.innerText = word.definition;
            definitions.appendChild(element);
        });
    } else {
        definitions.innerHTML = 'Ei löytynyt'
    }
})
