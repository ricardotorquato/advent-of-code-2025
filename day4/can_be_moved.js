module.exports = (input, rowNumer, colNumber) => {
  const rows = input.length;
  const cols = input[0].length;

  const adjs = [
    [rowNumer - 1, colNumber - 1],
    [rowNumer - 1, colNumber],
    [rowNumer - 1, colNumber + 1],
    [rowNumer, colNumber - 1],
    [rowNumer, colNumber + 1],
    [rowNumer + 1, colNumber - 1],
    [rowNumer + 1, colNumber],
    [rowNumer + 1, colNumber + 1],
  ];

  const totalAdjsWithRollsOfPaper = adjs
    .filter(([rn, cn]) => {
      if (rn < 0 || rn >= rows) {
        return false;
      }

      if (cn < 0 || cn >= cols) {
        return false;
      }

      return true;
    })
    .reduce((count, [rn, cn]) => {
      if (input[rn][cn] === "@") {
        return count + 1;
      }

      return count;
    }, 0);

  return totalAdjsWithRollsOfPaper < 4;
};
