const fs = require('fs').promises

async function main() {
    try {
        fs.writeFile('dados.txt', 'teu cu', 'utf-8')
        console.log('sin')
    }  
    catch (error) { 
        console.log('Errro fdp')
    }
}

console.log(-5-5)