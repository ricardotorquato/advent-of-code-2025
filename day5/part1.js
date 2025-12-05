const { ranges, ingredients } = require("./parse");

console.log(
  ingredients.filter((ingredient) =>
    ranges.some(([start, end]) => start <= ingredient && end >= ingredient)
  ).length
);
