import type { Browser } from 'puppeteer-core';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import jober from '$lib/jober';
import createBrowserInstance from '$lib/helpers/createBrowserInstance';
import { loadEnv } from 'vite';
import { WalletClient } from '$lib/wallet';
import { CoinCapClient } from '$lib';
import {
	CMC_AUTH_TOKEN,
	CRYPTO_PORTFOLIO_NAME,
	CRYPTO_WALLET_NAME,
	WALLET_CREDENTIALS
} from '$env/static/private';

describe(
	'jobs service',
	() => {
		beforeAll(async () => {
			const env = loadEnv('test', process.cwd(), '');
			process.env = {
				...process.env,
				...env
			};
		});

		it('should perform sync-crypto-wallet job', async () => {
			await jober.runJob('sync-crypto-wallet');
			const browserInstance = await createBrowserInstance();
			const walletClient = new WalletClient(WALLET_CREDENTIALS, browserInstance);
			const coinClient = new CoinCapClient(CMC_AUTH_TOKEN);

			const portfolioBalance = await coinClient.getPortfolioBalance(CRYPTO_PORTFOLIO_NAME);
			const accounts = await walletClient.getAccounts();
			const cryptoWallet = accounts.find((account) => account.name === CRYPTO_WALLET_NAME);
			expect(cryptoWallet?.balance).toBe(portfolioBalance);
		});
	},
	{
		timeout: 60000
	}
);
