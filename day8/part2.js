const { distances, junctions } = require("./parse");

let circuits = [];
for (const [p1, p2] of distances) {
  const circuitOfJunction1 = circuits.findIndex((c) => c.has(p1));
  const circuitOfJunction2 = circuits.findIndex((c) => c.has(p2));

  if (circuitOfJunction1 >= 0 && circuitOfJunction1 === circuitOfJunction2) {
    continue;
  }

  if (circuitOfJunction1 >= 0 && circuitOfJunction2 >= 0) {
    const circuitP1 = circuits[circuitOfJunction1];
    const circuitP2 = circuits[circuitOfJunction2];

    const circuit = new Set([...circuitP1, ...circuitP2, p1, p2]);

    circuits = circuits.filter((_, idx) => ![circuitOfJunction1, circuitOfJunction2].includes(idx));
    circuits.push(circuit);
  } else if (circuitOfJunction1 >= 0) {
    circuits[circuitOfJunction1].add(p2);
  } else if (circuitOfJunction2 >= 0) {
    circuits[circuitOfJunction2].add(p1);
  } else {
    const circuit = new Set([p1, p2]);
    circuits.push(circuit);
  }

  if (circuits.length === 1 && circuits[0].size === junctions.length) {
    console.log(junctions[p1][0] * junctions[p2][0]);
    break;
  }
}