const input = require("./parse");

const transform = (text, button) => {
  let arr = text.split("");
  for (const i of button) {
    arr[i] = arr[i] === "." ? "#" : ".";
  }

  return arr.join("");
};

const allIndexCombinations = (n) => {
  const result = [];
  const total = Math.pow(2, n);

  for (let i = 0; i < total; i++) {
    const combination = [];
    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) {
        combination.push(j);
      }
    }
    result.push(combination);
  }

  return result;
};

checkItem = (start, expected, buttons) => {
  const matches = [];
  const indexes = allIndexCombinations(buttons.length);

  for (const index of indexes) {
    const selectedButtons = buttons.filter((_, idx) => index.includes(idx));
    const merged = selectedButtons.flatMap((item) => item);

    if (transform(start, merged) === expected) {
      matches.push(index);
    }
  }

  matches.sort((a, b) => a.length - b.length);
  return matches[0].length;
};

// const test = {
//   start: "....",
//   expected: ".##.",
//   buttons: [[3], [1, 3], [2], [2, 3], [0, 2], [0, 1]],
// };

let sum = 0;
for (const { start, expected, buttons } of input) {
  sum += checkItem(start, expected, buttons);
}

console.log(sum);
