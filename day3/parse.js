const fs = require("fs");
const input = fs.readFileSync("./input_example.txt", "utf-8");

module.exports = input.split("\n").map((range) => range.split("").map(Number));
