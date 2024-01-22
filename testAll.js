const fs = require('fs')
const { prompt } = require("./sendPromptCSV")

const file = fs.readFileSync('product.csv', {'encoding':'utf8'})
const prompts = [
    "give 3 products sorted by price ascending where price is less than 20eur and are suitable for winter use",
    "give all products under 4eur",
    "give all products under 8eur sorted by ascending price",
    "give all products under (4x2)eur sorted by descending price",
    "give all products above (4x2)eur sorted by ascending price",
    "give all products below (4x2)eur sorted by descending price",
    "give all products below (4+2)eur sorted by descending price",
    "give all products above 40eur sorted by descending price",
    "Find a product that is size m",
    "sort products based on their name in ascending order",
    "show me the top 3.6 products",
    "show me the top 4 products",
    "give me all waterproof product based on the product's description",
    "give me 2 products that are pink",
    "give me the heaviest product",
    "give me a product with the dimensions 16x19x37cm"
]


function createPrompt(text) {
    return `${text}:
    ${file}`
}

function testAll() {
    prompts.forEach(promptString => {
        prompt(createPrompt(promptString))
        .then(res => {console.log(`[${promptString}]:\n${res}\n\n`)})
        .catch(console.log)
    })
}

testAll()