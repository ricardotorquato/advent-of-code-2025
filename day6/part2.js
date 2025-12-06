const { rows, operations } = require("./parse");

const size = rows[0].length;

const groups = [];
let temp = [];

for (let i = 0; i < size; i++) {
  const str = rows
    .map((row) => row[i])
    .join("")
    .trim();

  if (!!str.trim().length) {
    temp.push(Number(str));
  } else {
    groups.push(temp);
    temp = [];
  }
}
groups.push(temp);

const calcs = operations.map((op, idx) => {
  return groups[idx].reduce(
    (total, number) => {
      if (op === "*") {
        return total * number;
      }

      return total + number;
    },
    op === "*" ? 1 : 0
  );
});

console.log(calcs.reduce((sum, num) => sum + num, 0));
