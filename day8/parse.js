const fs = require("fs");
const distance = require("./distance");

const junctions = fs
  .readFileSync("./input_example.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(",").map(Number));

const distances = [];
for (let i = 0; i < junctions.length; i++) {
  for (let j = i + 1; j < junctions.length; j++) {
    distances.push([i, j, distance(junctions[i], junctions[j])]);
  }
}

distances.sort((item1, item2) => item1[2] - item2[2]);

module.exports = { distances, junctions};
