const input = require("./parse");
const { area } = require("./geometry");

let largest = 0;
for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    const a = area(input[i], input[j]);
    if (a > largest) {
      largest = a;
    }
  }
}
console.log(largest);
