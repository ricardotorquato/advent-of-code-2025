const input = require("./parse");
const canBeMoved = require('./can_be_moved');

const rows = input.length;
const cols = input[0].length;

let totalCanBeMoved = 0;
for (let rn = 0; rn < rows; rn++) {
  for (let cn = 0; cn < cols; cn++) {
    if (input[rn][cn] !== "@") {
      continue;
    }

    if (canBeMoved(input, rn, cn)) {
      totalCanBeMoved++;
    }
  }
}

console.log(totalCanBeMoved);
