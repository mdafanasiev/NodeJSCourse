import chalk from "chalk";
import dedent from "dedent-js";

const printError = (errorMsg) => {
    console.log(chalk.bgRed(" ERROR ") + " " + errorMsg);
};

const printWeather = (res) => {
    console.log(
        dedent`${chalk.bgYellow(" WEATHER ")} Погода в городе ${res.city}
		${res.desc}
		Температура: ${res.temp}
		Влажность: ${res.humidity}%
		Скорость ветра: ${res.windSpeed}
		`
    );
};

export { printWeather, printError };
