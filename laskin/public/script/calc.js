const equation = document.querySelector("input");
const answer = document.querySelector('h3');
const button = document.querySelector('button');

button.addEventListener("click", ()=>{

    fetch('/calc', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            equation: equation.value
        }),
    }).then(data => data.json())
    .then(json => answer.textContent = json.answer)
})
