require('dotenv').config();

const fs = require('fs')
const { OpenAI } = require('openai');
const { exit } = require('process');

const openai = new OpenAI();

async function uploadFile(name) {
    try {
        const file = await openai.files.create({ file: fs.createReadStream(name), purpose: 'fine-tune'});
        return file.id
    } catch (error) {
        console.log(error);
    }
}

async function createFineTune(id, model) {
    try {
        const ft = await openai.fineTunes.create({training_file: id, model: model})
        return ft
    } catch (error) {
        console.log(error)
    }
}

if (process.argv.length < 4) {
    console.log(`node uploadFinetune.js <filename> <model>`)
    exit(0)

} 

uploadFile(process.argv[2])
    .then(id => createFineTune(id, process.argv[3]))
    .then(ft => console.log(ft.id))
