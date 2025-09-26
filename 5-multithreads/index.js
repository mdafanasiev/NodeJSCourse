const { performance, PerformanceObserver } = require('perf_hooks');
const { Worker} = require("worker_threads");
const {chunk} = require("lodash/array");
const getCountDividedByThree = require('./commonFunction.js');

const performanceObserver = new PerformanceObserver((items, observer) => {
	items.getEntries().forEach((entry) => {
		console.log(`${entry.name}	${entry.duration}`);
	})
});

performanceObserver.observe({entryTypes: ['measure']});

const bigArray = range(1, 300_000 + 1);
const CORES_NUMBER = 4;

function oneThreadSolution() {
	return new Promise((resolve, reject) => {
		performance.mark("one thread start");
		const divideBy3Count = getCountDividedByThree(bigArray);
		performance.mark("one thread end");
     	performance.measure("one thread", "one thread start", "one thread end");
		resolve(divideBy3Count);
	})
}

function multithreadSolution() {
  return new Promise((resolve, reject) => {
    let sum = 0;
    performance.mark("multithread start");

    for (const arrayPart of chunk(bigArray, bigArray.length / CORES_NUMBER)) {
      const worker = new Worker("./worker.js", { workerData: arrayPart });
      worker.on("message", (res) => {
        sum += res;
      });
    }
    performance.mark("multithread end");
    performance.measure("multithread", "multithread start", "multithread end");
    resolve(sum);
  });
}

const main = async() => {
	await oneThreadSolution();
	await multithreadSolution();
}


function range (start, stop, step = 1) {
  return Array.from(
    { length: Math.ceil((stop - start) / step) },
    (_, i) => start + i * step
  );
}

main();
