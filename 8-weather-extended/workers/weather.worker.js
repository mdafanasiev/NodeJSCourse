import { parentPort, workerData } from "worker_threads";
import { getWeather } from "../services/api.service.js";

parentPort.postMessage(await getWeather(workerData));
