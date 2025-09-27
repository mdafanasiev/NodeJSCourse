function getCountDividedByThree(arr) {
  return arr.reduce((acc, val) => {
    if (val % 3 === 0) acc += 1;
  }, 0);
}

module.exports = getCountDividedByThree;