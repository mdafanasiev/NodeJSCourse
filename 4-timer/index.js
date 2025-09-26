const HOURS_IDX = 2;
const MINUTES_IDX = 3;
const SECONDS_IDX = 4;

const hours = timeToMs(parseInt(process.argv[HOURS_IDX]), "h");
const mins = timeToMs(parseInt(process.argv[MINUTES_IDX]), "m");
const seconds = timeToMs(parseInt(process.argv[SECONDS_IDX]), "s");

const totalTime = hours + mins + seconds;

setTimeout(() => console.log('timer is called'), totalTime);


function timeToMs(time, type) {
	switch(type) {
		case 'h':
			return time * 3600 * 1000;
		case 'm':
			return time * 60 * 1000;
		case 's':
			return time * 1000;
	}
}