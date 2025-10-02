const getArgs = (args) => {
	const res = {};
	const [executer, file, ...rest] = args;
	rest.forEach((value, index, array) => {
		if (value.charAt(0) == '-') {
			if (index == array.length - 1) {
				res[value.substring(1)] = true;
			} else if (array[index + 1].charAt(0) != '-') {
				if (value.charAt(1) == 's') {
					let currIdx = index + 1;
					const cities = [];
					
					while (true) {
						if (currIdx == array.length || array[currIdx].startsWith('-')) 
							break;

						cities.push(array[currIdx]);
						currIdx++;
					}
					
					res[value.substring(1)] = cities;
				}
				else {
					res[value.substring(1)] = array[index + 1];
				}
			} else {
				res[value.substring(1)] = true;
			}
		}
	});
	return res;
};

export { getArgs }