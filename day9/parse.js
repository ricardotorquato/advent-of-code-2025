const fs = require("fs");

const input = fs
  .readFileSync("./input_example.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(",").map(Number));

module.exports = input;
