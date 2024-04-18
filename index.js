const fs = require('fs/promises');

/**
 * Read and Parse a number from a file.
 *
 * @param path - Valid path to the file.
 * @returns {Promise<number>}
 */
const readAndParseFile = async (path) => {
  const data = await fs.readFile(path, 'utf-8');
  const num = parseFloat(data);

  if (isNaN(num)) throw new Error('File should contain a valid numeral!');

  return num;
};

/**
 * Sum operation on the numbers extracted from a file.
 *
 * @returns {Promise<number>}
 */
const calculate = async () => {
  try {
    const num1 = await readAndParseFile('./a.txt');
    const num2 = await readAndParseFile('./b.txt');
    const sum = num1 + num2;

    console.log(`${num1} + ${num2} = ${sum}`);
  } catch (err) {
    console.error(`Error in calculations: ${err.message}`);
  }
};

calculate();