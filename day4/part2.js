const input = require("./parse");
const canBeMoved = require("./can_be_moved");

const rows = input.length;
const cols = input[0].length;

let totalCanBeMoved = 0;

let iterationTotal = 0;
let nextInput = [...input];

do {
  iterationTotal = 0;
  const currInput = [...nextInput];

  for (let rn = 0; rn < rows; rn++) {
    for (let cn = 0; cn < cols; cn++) {
      if (currInput[rn][cn] !== "@") {
        continue;
      }

      if (canBeMoved(input, rn, cn)) {
        iterationTotal++;
        nextInput[rn][cn] = '.';
      }
    }
  }

  totalCanBeMoved += iterationTotal;
} while (iterationTotal > 0);

console.log(totalCanBeMoved);
