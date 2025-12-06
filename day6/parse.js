const fs = require('fs');

const rows = fs.readFileSync('./input_example.txt', 'utf-8').split('\n');
const operations = rows.pop().split(' ').map((item) => item.trim()).filter((item) => item !== '');

module.exports = { rows, operations };