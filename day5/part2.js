let { ranges } = require("./parse");

ranges.sort((a, b) => a[0] - b[0]);

const newRanges = [];
let [currentStart, currentEnd] = ranges[0];

for (let i = 1; i < ranges.length; i++) {
  const [start, end] = ranges[i];

  if (start <= currentEnd + 1) {
    currentEnd = Math.max(currentEnd, end);
  } else {
    newRanges.push([currentStart, currentEnd]);
    currentStart = start;
    currentEnd = end;
  }
}

newRanges.push([currentStart, currentEnd]);

console.log(newRanges.reduce((sum, [start, end]) => sum + (end - start + 1), 0));
