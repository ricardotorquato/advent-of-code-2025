const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");
const lines = input.split("\n");

const baseForms = [];
const grids = [];
let form = [];
for (const line of lines) {
  if (line.includes("#")) {
    form.push(line.split("").map((i) => (i === "#" ? 1 : 0)));
  }

  if (line === "") {
    baseForms.push(form);
    form = [];
  }

  if (line.includes("x")) {
    const [gridSize, forms] = line.split(": ");
    const [x, y] = gridSize.split("x");
    grids.push({
      x: Number(x),
      y: Number(y),
      desired: forms.split(" ").map(Number),
    });
  }
}

const turnClockwise = (form) => [
  [form[2][0], form[1][0], form[0][0]],
  [form[2][1], form[1][1], form[0][1]],
  [form[2][2], form[1][2], form[0][2]],
];

const flipHorizontal = (form) => {
  return form.map((row) => [...row].reverse());
};

const allForms = [];
for (const form of baseForms) {
  const turned1 = turnClockwise(form);
  const turned2 = turnClockwise(turned1);
  const turned3 = turnClockwise(turned2);
  const flipped0 = flipHorizontal(form);
  const flipped1 = flipHorizontal(turned1);
  const flipped2 = flipHorizontal(turned2);
  const flipped3 = flipHorizontal(turned3);

  const forms = [
    form,
    turned1,
    turned2,
    turned3,
    flipped0,
    flipped1,
    flipped2,
    flipped3,
  ];

  allForms.push(forms);
}

module.exports = { forms: allForms, grids };
