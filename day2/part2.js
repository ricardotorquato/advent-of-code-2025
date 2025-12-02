const input = require("./parse");

const checkNumber = (number) => {
  const length = number.toString().length;

  for(let d = 2; d <= length; d++) {
    if (length % d !== 0) {
      continue;
    }

    const parts = [];
    for(let i = 0; i < d; i++) {
      parts.push(number.toString().substr(i * (length / d), length / d));
    }

    const areAllEqual = parts.every((part) => part === parts[0]);
    if (areAllEqual) {
      return true;
    }
  }

  return false;
};

const numbers = [];
for (const [from, to] of input) {
  for (let i = Number(from); i <= Number(to); i++) {
    if (checkNumber(i)) {
      numbers.push(i);
    }
  }
}

const total = numbers.reduce((sum, n) => sum + Number(n), 0);

console.log(total);