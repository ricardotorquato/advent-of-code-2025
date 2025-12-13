const { forms, grids } = require("./parse");

const tryToFit = (form, grid) => {
  const i = grid.length - 2;
  const j = grid[0].length - 2;

  const filled = form.map((item) =>
    item.reduce((pos, subitem, idx) => {
      if (subitem === 1) {
        pos.push(idx);
      }
      return pos;
    }, [])
  );

  const getSubGrid = (a, b) => {
    return [
      [grid[a][b], grid[a][b + 1], grid[a][b + 2]],
      [grid[a + 1][b], grid[a + 1][b + 1], grid[a + 1][b + 2]],
      [grid[a + 2][b], grid[a + 2][b + 1], grid[a + 2][b + 2]],
    ];
  };

  for (let a = 0; a < i; a++) {
    for (let b = 0; b < j; b++) {
      const subGrid = getSubGrid(a, b);
      let fit = true;
      if (filled[0].some((idx) => subGrid[0][idx] === 1)) {
        fit = false;
      }
      if (filled[1].some((idx) => subGrid[1][idx] === 1)) {
        fit = false;
      }
      if (filled[2].some((idx) => subGrid[2][idx] === 1)) {
        fit = false;
      }

      if (fit) {
        filled[0].forEach((idx) => {
          grid[a][b + idx] = 1;
        });
        filled[1].forEach((idx) => {
          grid[a + 1][b + idx] = 1;
        });
        filled[2].forEach((idx) => {
          grid[a + 2][b + idx] = 1;
        });

        return [true, grid];
      }
    }
  }

  return [false, grid];
};

const isTargetExceeded = (target, current) => {
  for (const i in target) {
    if (target[i] < current[i]) {
      return true;
    }
  }

  return false;
};

const isTargetReached = (target, current) => {
  for (const i in target) {
    if (target[i] !== current[i]) {
      return false;
    }
  }

  return true;
};

const isItPossibleToFit = (from, forms, initialGrid, target) => {
  const stack = [[from, [from], initialGrid, target.map(() => 0), null]];

  while (stack.length > 0) {
    const [curr, path, grid, current] = stack.pop();

    const formVariet = curr % 8;
    const formNumber = (curr - formVariet) / 8;
    const newCurrent = current.map((i, idx) =>
      idx === formNumber ? i + 1 : i
    );

    if (isTargetExceeded(target, newCurrent)) {
      continue;
    }

    const [doesItFit, newGrid] = tryToFit(forms[formNumber][formVariet], grid);

    if (!doesItFit) {
      continue;
    }

    if (isTargetReached(target, newCurrent)) {
      return true;
    }

    for (let i = 0; i < 48; i++) {
      stack.push([i, [...path, i], newGrid, newCurrent]);
    }
  }

  return false;
};

const buildInitialGrid = (x, y) => {
  let grid = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (!grid[i]) {
        grid[i] = [];
      }
      grid[i][j] = 0;
    }
  }

  return grid;
};

const checkPossibility = ({ x, y, desired }, forms) => {
  for (let i = 0; i < 48; i++) {
    const grid = buildInitialGrid(x, y);
    if (isItPossibleToFit(i, forms, grid, desired)) {
      return true;
    }
  }

  return false;
};

let sum = 0;
let problem = 0;
for (const grid of grids) {
  problem++;
  console.log(`Checking problem ${problem}`);
  if (checkPossibility(grid, forms)) {
    sum++;
  }
}

console.log(sum);
