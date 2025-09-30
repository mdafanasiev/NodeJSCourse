#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';
import { Worker } from "worker_threads";

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан token');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Токен сохранён');
	} catch (e) {
		printError(e.message);
	}
}

const saveCities = async (cities) => {
	if (!cities.length) {
		printError("Не передан город");
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.cities, cities);
		printSuccess("Город сохранён");
	} catch (e) {
		printError(e.message);
	}
};

const saveLanguage = async (lang) => {
  try {
    await saveKeyValue(TOKEN_DICTIONARY.lang, lang);
    printSuccess("Язык сохранён");
  } catch (e) {
    printError(e.message);
  }
};

const getForcast = async () => {
	try {
		const cities = process.env.CITIES ?? await getKeyValue(TOKEN_DICTIONARY.cities);
		for (const city of cities) {
		  const weatherWorker = new Worker("./workers/weather.worker.js", { workerData: city });
		  weatherWorker.on('message', (weather) => {
			printWeather(weather, getIcon(weather.weather[0].icon));
		  });
        }
	
	} catch (e) {
		if (e?.response?.status == 404) {
			printError('Неверно указан город');
		} else if (e?.response?.status == 401) {
			printError('Неверно указан токен');
		} else {
			printError(e.message);
		}
	}
}

const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		return printHelp();
	}
	if (args.s) {
		return saveCities(args.s);
	}
	if (args.t) {
		return saveToken(args.t);
	}
	if (args.l) {
      return saveLanguage(args.l);
    }
	return getForcast();
};

initCLI();