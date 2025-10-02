import { parentPort, workerData } from "worker_threads";
import { getWeather } from "../services/api.service.js";

if (parentPort) parentPort.postMessage(await getWeather(workerData));
