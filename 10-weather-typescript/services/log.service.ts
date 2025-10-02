import chalk from "chalk";
import dedent from "dedent-js";

interface Weather {
    name: string;
    weather: {
        description: string;
    }[];
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
}

const printError = (error: string) => {
    console.log(chalk.bgRed(" ERROR ") + " " + error);
};

const printSuccess = (message: string) => {
    console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(" HELP ")}
		Без параметров - вывод погоды
		-s [CITY] для установки городов
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		-l [LANGUAGE] для установки языка
		`
    );
};

const printWeather = (res: Weather, icon: string) => {
    console.log(
        dedent`${chalk.bgYellow(" WEATHER ")} Погода в городе ${res.name}
		${icon}  ${res.weather[0]!.description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}
		`
    );
};

export { printError, printSuccess, printHelp, printWeather };
