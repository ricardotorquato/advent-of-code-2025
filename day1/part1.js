const fs = require('fs');
const input = fs.readFileSync('./input_example.txt', 'utf-8');

let click = 50;
let total = 0;
const lines = input.split('\n');

for(const line of lines) {
    const number = Number(line.replace('R', '').replace('L', ''));
    if (isNaN(number)) {
        break;
    }

    if (line.startsWith('R')) {
        click += number;
    } else {
        click -= number;
    }

    // any multiple of 100 means that we achieve 0 in a circular sequence from 1 - 100
    if (click % 100 === 0) {
        total++;
    }
}

console.log('total', total);
