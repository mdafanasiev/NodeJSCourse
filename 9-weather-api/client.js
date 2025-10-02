import axios from "axios";
import { printError, printWeather } from "./log.service.js";

const initCLI = () => {
    const city = process.argv[2];
    getWeather(city)
        .then((res) => printWeather(res))
        .catch((reason) => printError("Ошибка при получении погоды!"));
};

initCLI();

function getWeather(city) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.post("http://localhost/weather", {
                city,
            });
            resolve(data);
        } catch (e) {
            reject();
        }
    });
}
