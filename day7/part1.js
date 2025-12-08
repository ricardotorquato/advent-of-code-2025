const input = require("./parse");

const first = input.shift();
input.shift(); // ignoring second line

let selected = [first.findIndex((i) => i === "S")];
let count = 0;

for (const row of input) {
  const curSelected = [...selected];
  selected = [];
  for (const s of new Set(curSelected)) {
    if (row[s] === ".") {
      selected.push(s);
    } else {
      count++;
      if (row[s - 1] === ".") {
        selected.push(s - 1);
      }
      if (row[s + 1] === ".") {
        selected.push(s + 1);
      }
    }
  }
}

console.log(count);
