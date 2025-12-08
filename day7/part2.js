const input = require("./parse");

const first = input.shift();
input.shift(); // ignoring second line

let startPoint = first.findIndex((i) => i === "S");
let selected = [startPoint];

let graph = {};

let rowNum = 1;
for (const row of input) {
  const curSelected = [...selected];
  selected = [];
  for (const s of new Set(curSelected)) {
    graph[`(${rowNum},${s})`] = [];
    if (row[s] === ".") {
      selected.push(s);
      graph[`(${rowNum},${s})`].push(`(${rowNum + 1},${s})`);
    } else {
      if (row[s - 1] === ".") {
        selected.push(s - 1);
        graph[`(${rowNum},${s})`].push(`(${rowNum + 1},${s - 1})`);
      }
      if (row[s + 1] === ".") {
        selected.push(s + 1);
        graph[`(${rowNum},${s})`].push(`(${rowNum + 1},${s + 1})`);
      }
    }
  }
  rowNum++;
}

for (const s of selected) {
  graph[`(${rowNum},${s})`] = [];
}

function countPaths(start, cache = new Map()) {
  if (cache.has(start)) {
    return cache.get(start);
  }

  const neighbors = graph[start] || [];

  if (neighbors.length === 0) {
    return 1;
  }

  let totalPaths = 0;

  for (const neighbor of neighbors) {
    totalPaths += countPaths(neighbor, cache);
  }

  cache.set(start, totalPaths);
  return totalPaths;
}

console.log(countPaths(`(1,${startPoint})`));
