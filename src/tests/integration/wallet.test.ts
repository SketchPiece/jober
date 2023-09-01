import { WalletClient, type Account } from '$lib/wallet';
import type { Browser } from 'puppeteer-core';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { loadEnv } from 'vite';
import { WALLET_SESSION_KEY } from '$env/static/private';
import createBrowserInstance from '$lib/helpers/createBrowserInstance';
import kv from '$lib/kv';

describe(
	'wallet client',
	() => {
		let browserInstance: Browser;
		let walletClient: WalletClient;

		let accounts: Account[];

		beforeAll(async () => {
			const env = loadEnv('test', process.cwd(), '');
			process.env = {
				...process.env,
				...env
			};
			browserInstance = await createBrowserInstance();

			kv.set(WALLET_SESSION_KEY, null);
			walletClient = new WalletClient(WALLET_SESSION_KEY, browserInstance);
		});

		afterAll(async () => {
			await browserInstance.close();
		});

		it('should login and get accounts', async () => {
			accounts = await walletClient.getAccounts();
			expect(accounts).not.toHaveLength(0);
		});

		it('should add expense to account', async () => {
			const account = accounts[0];
			await walletClient.addRecord(account.name, 100, 'expense');
			const newAccounts = await walletClient.getAccounts();
			expect(account.balance).toBeGreaterThan(newAccounts[0].balance);
			accounts = newAccounts;
		});

		it('should add income to account', async () => {
			const account = accounts[1];
			await walletClient.addRecord(account.name, 100, 'income');
			const newAccounts = await walletClient.getAccounts();
			expect(account.balance).toBeLessThan(newAccounts[1].balance);
			accounts = newAccounts;
		});
	},
	{
		timeout: 60000
	}
);
