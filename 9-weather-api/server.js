import express from "express";
import axios from "axios";

const app = express();
const port = 80;

app.use(express.json());

app.post("/weather", async (req, res) => {
    const weatherData = await getWeatherData(req.body.city);
    const resData = {
        city: weatherData.name,
        desc: weatherData.weather[0].description,
        temp: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
    };
    res.json(resData);
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: "message" });
});

app.listen(port, () => console.log("Server has started!"));

async function getWeatherData(city) {
    const token = "99c317250a068a825ab23353218258b1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}`;

    const { data } = await axios.get(url);

    return data;
}
