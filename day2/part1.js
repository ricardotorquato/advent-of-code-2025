const input = require("./parse");

const checkNumber = (number) => {
  const length = number.toString().length;

  if (length % 2 !== 0) {
    return false;
  }

  const cut = length / 2;

  return number.toString().substr(0, cut) === number.toString().substr(cut);
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
