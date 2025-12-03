const input = require("./parse");
const findHigher = require("./find_higher");

let sum = 0;
for (const j in input) {
  let line = input[j];
  let subSum = 0;
  for (let i = 11; i >= 0; i--) {
    const sliced = i === 0 ? line : line.slice(0, i * -1);
    const [pos, number] = findHigher(sliced);

    line = line.slice(pos + 1);
    subSum += number * 10 ** i;
  }

  sum += subSum;
}

console.log(sum);
