const input = require('./parse');
const findHigher = require("./find_higher");

let sum = 0;
for(const line of input) {
    const [pos, first] = findHigher(line.slice(0,-1));
    const [_, second] = findHigher(line.slice(pos + 1));

    sum += (first * 10) + second;
}

console.log(sum);