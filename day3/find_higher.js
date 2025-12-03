module.exports = (arr) => {
  let curr = arr[0];
  let pos = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > curr) {
      curr = arr[i];
      pos = i;
    }
  }

  return [pos, curr];
};
