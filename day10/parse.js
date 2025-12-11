const fs = require("fs");

const lines = fs.readFileSync("./input_example.txt", "utf-8").split("\n");

const input = [];
for (const line of lines) {
  const [brackets] = line.match(/\[.+\]/);
  if (!brackets.startsWith("[")) {
    continue;
  }

  const expected = brackets.replace("[", "").replace("]", "");
  const start = "".padEnd(expected.length, ".");

  const buttons = [...line.matchAll(/\((\d+(,\d+)*)\)/g)]
    .filter(([match]) => match.startsWith("("))
    .map(([match]) =>
      match
        .replace("(", "")
        .replace(")", "")
        .split(",")
        .map((i) => Number(i.trim()))
    );

  const [joltage] = line.match(/\{(\d+(,\d+)*)\}/);
  if (!joltage.startsWith("{")) {
    continue;
  }

  const joltages = joltage
    .replace("{", "")
    .replace("}", "")
    .split(",")
    .map((i) => Number(i.trim()));

  input.push({ start, expected, buttons, joltages });
}

module.exports = input;
