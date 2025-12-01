const fs = require("fs");
const input = fs.readFileSync("./input_example.txt", "utf-8");

let currentClick = 50;
let totalReachZero = 0;
const lines = input.split("\n");

for (const line of lines) {
  const number = Number(line.replace("R", "").replace("L", ""));
  if (isNaN(number)) {
    break;
  }
  
  if (line.startsWith("R")) {
    // that is the real change that will have on the currentClick
    const movement = number % 100;

    // if we have complete turns, for example, numbers > 100, we count
    const completeTurns = (number - movement) / 100;
    totalReachZero += completeTurns;

    // if we reach 100, which is possible, let's consider 0 going right, to not mistaken it with passing by 0 again
    currentClick = currentClick === 100 ? 0 : currentClick;
    // we can get a maximum of 99 before next 0, so we know how much we can move
    const availableToMove = 99 - currentClick;

    // let's check if our current movement is more than that
    const leftOver = movement - availableToMove;

    if (leftOver > 0) {
      // in this case we have another turn passing by zero
      totalReachZero++;
      currentClick = leftOver - 1; // -1 because we are considering 99, so the first one will make it 0
    } else {
      currentClick += movement;
    }
  }

  if (line.startsWith("L")) {
    // that is the real change that will have on the currentClick
    const movement = number % 100;

    // if we have complete turns, for example, numbers > 100, we count
    const completeTurns = (number - movement) / 100;
    totalReachZero += completeTurns;

    // if we are at 0 going left, let's consider we are already in 100, to not mistake that with a passing by 0
    currentClick = currentClick === 0 ? 100 : currentClick;
    // we can only go to the left the maximum of the current click - 1 without reaching 0
    const availableToMove = currentClick - 1;

    // let's check if our current movement is more than that
    const leftOver = movement - availableToMove;

    if (leftOver > 0) {
      // in this case we have another turn passing by zero
      totalReachZero++;
      currentClick = 100 - (leftOver - 1); // -1 because we are considering 99, so the first one will make it 0
    } else {
      currentClick -= movement;
    }
  }
}

console.log("total", totalReachZero);
