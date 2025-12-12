const devices = require("./parse")("input_example_part2");

const countPaths = (
  graph,
  curr,
  cache = new Map(),
  dac = false,
  fft = false
) => {
  if (curr === "out") {
    if (!dac || !fft) {
      return 0;
    }

    return 1;
  }

  const cacheKey = `${curr},${dac},${fft}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const neighbors = graph[curr];
  let count = 0;
  for (const neighbor of neighbors) {
    count += countPaths(
      graph,
      neighbor,
      cache,
      dac || curr === "dac",
      fft || curr === "fft"
    );
  }

  cache.set(cacheKey, count);

  return count;
};

console.log(countPaths(devices, "svr"));
