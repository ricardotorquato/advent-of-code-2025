const connections = require("./parse")('input');

const from = "you";
const to = "out";

const findPaths = (graph, from, to) => {
  const allPaths = [];
  const stack = [[from, [from], new Set([from])]];

  while (stack.length > 0) {
    const [node, path, visited] = stack.pop();

    if (node === to) {
      allPaths.push(path);
      continue;
    }

    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        const newVisited = new Set(visited);
        newVisited.add(neighbor);
        stack.push([neighbor, [...path, neighbor], newVisited]);
      }
    }
  }

  return allPaths;
};

const paths = findPaths(connections, from, to);
console.log(paths.length);
