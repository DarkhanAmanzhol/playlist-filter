const parseToOptionsArray = (array) => {
  let options = [];
  for (let i = 0; i < array.length; i++) {
    options.push({ value: array[i], label: array[i] });
  }
  return options;
};

module.exports = { parseToOptionsArray };
