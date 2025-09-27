const { parentPort, workerData } = require("worker_threads");
const getCountDividedByThree = require("./commonFunction.js");

parentPort.postMessage(getCountDividedByThree(workerData));
