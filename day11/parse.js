const fs = require("fs");

module.exports = (filename) => {
  const lines = fs.readFileSync(`./${filename}.txt`, "utf-8").split("\n");
  const connections = {};

  for (const line of lines) {
    const [pc, conn] = line.split(":");

    if (!connections[pc]) {
      connections[pc] = [];
    }

    connections[pc].push(...conn.trim().split(" "));
  }

  return connections;
};
