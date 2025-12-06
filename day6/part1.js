const { rows, operations } = require('./parse');
const lines = rows.map((line) => line.split(' ').map((number) => number.trim()).filter((number) => number !== '').map(Number));

cols = operations.map((op, idx) => ({ op, numbers: lines.map((l) => l[idx]) }));

const calcs = cols.map(({ op, numbers }) => {
  return numbers.reduce(
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
