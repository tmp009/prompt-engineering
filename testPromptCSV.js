const fs = require('fs')
const { prompt } = require("./sendPromptCSV");
const { exit } = require('process');

if (process.argv.length < 4) {
    console.log('node testPromptCSV.js <file> <text>')
    exit(0)
}

const fp = process.argv[2];
const message = process.argv[3];

const file = fs.readFileSync(fp, {'encoding':'utf8'})

async function run() {
    console.log(await prompt(`${message}:
    ${file}`))
}

run()