const input = require("./parse");
const { buildRangesBasedOnY, areAllPointsInside, area } = require("./geometry");

const rangesBasedOnY = buildRangesBasedOnY(input);

const areas = [];
for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    areas.push([i, j, area(input[i], input[j])]);
  }
}

areas.sort((a, b) => b[2] - a[2]);
for (const [i, j, totalArea] of areas) {
  if (areAllPointsInside(input[i], input[j], rangesBasedOnY)) {
    console.log(totalArea);
    break;
  }
}
