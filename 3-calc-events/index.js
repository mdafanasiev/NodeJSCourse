const EventEmitter = require("events");

const calcEmitter = new EventEmitter();
const operations = ['add', 'subtract', 'multiply', 'divide'];

for (opName of operations) {
	const op = require(`./${opName}.js`);
	const printOperationResult = printResult(op);
	calcEmitter.addListener(opName, printOperationResult);
}

function printResult(opFn) {
	return function(a, b) {
		const res = opFn(a, b);
		console.log(res);
	}
}

const OP_IDX = 4;
const FIRST_IDX = 2;
const SECOND_IDX = 3;

const firstNum = Number(process.argv[FIRST_IDX]);
const secondNum = Number(process.argv[SECOND_IDX]);
const operationName = process.argv[OP_IDX];

calcEmitter.emit(operationName, firstNum, secondNum);
