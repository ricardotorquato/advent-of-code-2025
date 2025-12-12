const area = (point1, point2) => {
  const [x1, y1] = point1;
  const [x2, y2] = point2;

  const x = Math.abs(x1 - x2) + 1;
  const y = Math.abs(y1 - y2) + 1;

  return x * y;
};

const buildRangesBasedOnY = (points) => {
  const definedY = [...new Set(points.map((p) => p[1]))];
  const definedX = [...new Set(points.map((p) => p[0]))];

  const rangesBasedOnY = {};
  for (const y of definedY) {
    const pointsOfY = points
      .filter((p) => p[1] === y)
      .sort((a, b) => a[0] - b[0]);
    rangesBasedOnY[y] = [pointsOfY[0][0], pointsOfY[pointsOfY.length - 1][0]];
  }

  const newYs = {};
  const rangesBasedOnX = {};
  for (const x of definedX) {
    const pointsOfX = points
      .filter((p) => p[0] === x)
      .sort((a, b) => a[1] - b[1]);

    rangesBasedOnX[x] = [pointsOfX[0][1], pointsOfX[pointsOfX.length - 1][1]];

    const yInside = pointsOfX[pointsOfX.length - 1][1] - pointsOfX[0][1];
    const newY = new Array(yInside)
      .fill(0)
      .map((_, i) => i + pointsOfX[0][1])
      .filter((y) => !definedY.includes(y));

    for (const y of newY) {
      if (!newYs[y]) {
        newYs[y] = [];
      }
      newYs[y].push(x);
    }
  }

  for (const [y, xs] of Object.entries(newYs)) {
    xs.sort((a, b) => a - b);
    rangesBasedOnY[y] = [xs[0], xs[xs.length - 1]];
  }

  for (const [x, ys] of Object.entries(rangesBasedOnX)) {
    for (const [y, xs] of Object.entries(rangesBasedOnY)) {
      if (Number(y) >= ys[0] && Number(y) <= ys[1]) {
        if (xs[0] > Number(x)) {
          rangesBasedOnY[y][0] = Number(x);
        }

        if (xs[1] < Number(x)) {
          rangesBasedOnY[y][1] = Number(x);
        }
      }
    }
  }

  return rangesBasedOnY;
};

const areAllPointsInside = (point1, point2, rangesBasedOnY) => {
  const startX = Math.min(point1[0], point2[0]);
  const endX = Math.max(point1[0], point2[0]);

  const startY = Math.min(point1[1], point2[1]);
  const endY = Math.max(point1[1], point2[1]);

  for (let y = startY; y <= endY; y++) {
    const [minX, maxX] = rangesBasedOnY[y];
    if (minX > startX || maxX < endX) {
      return false;
    }
  }

  return true;
};

module.exports = {
  area,
  areAllPointsInside,
  buildRangesBasedOnY,
};
