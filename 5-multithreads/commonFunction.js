function getCountDividedByThree(arr) {
  return arr.reduce((acc, val) => {
    if (val % 3 === 0) acc += val;
  }, 0);
}

module.exports = getCountDividedByThree;