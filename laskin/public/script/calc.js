const equation = document.querySelector("input");
const answer = document.querySelector('h3');
const button = document.querySelector('button');

button.addEventListener("click", async ()=>{

    const data = await fetch('/calc', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            equation: equation.value
        }),
    })
    
    const jsonData = await data.json();
    answer.textContent = jsonData.answer;
})
