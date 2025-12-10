const area = (point1, point2) => {
  const [x1, y1] = point1;
  const [x2, y2] = point2;

  const x = Math.abs(x1 - x2) + 1;
  const y = Math.abs(y1 - y2) + 1;

  return x * y;
};

module.exports = {
  area,
};
