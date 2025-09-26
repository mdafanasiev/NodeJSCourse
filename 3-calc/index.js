const OP_IDX = 4;
const FIRST_IDX = 2;
const SECOND_IDX = 3;

const firstNum = Number(process.argv[FIRST_IDX]);
const secondNum = Number(process.argv[SECOND_IDX]);
const operationName = process.argv[OP_IDX];

const operation = require(`./${operationName}.js`);
console.log(operation(firstNum, secondNum));