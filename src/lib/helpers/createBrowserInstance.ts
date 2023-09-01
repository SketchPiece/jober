import puppeteer from 'puppeteer-core';
import { NODE_ENV, BLESS_TOKEN } from '$env/static/private';
import createServiceError from './createServiceError';

export default async function createBrowserInstance() {
	try {
		if (NODE_ENV === 'test') {
			return await puppeteer.launch({
				executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
			});
		} else {
			return await puppeteer.connect({
				browserWSEndpoint: `wss://chrome.browserless.io?token=${BLESS_TOKEN}`
			});
		}
	} catch (error) {
		throw createServiceError('BrowserInstance', error as Error);
	}
}
