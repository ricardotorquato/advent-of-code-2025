const fs = require("fs");
const input = fs.readFileSync("./input_example.txt", "utf-8");

const ranges = input
  .split("\n")
  .filter((item) => item.indexOf("-") > 0)
  .map((item) => item.split("-").map(Number));
const ingredients = input
  .split("\n")
  .filter((item) => item.length > 0 && item.indexOf("-") === -1)
  .map(Number);

module.exports = { ranges, ingredients };
