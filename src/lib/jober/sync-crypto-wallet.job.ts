import { CoinCapClient } from '$lib/coincap';
import createBrowserInstance from '$lib/helpers/createBrowserInstance';
import { WalletClient } from '$lib/wallet';
import type { Job } from './types';
import {
	WALLET_CREDENTIALS,
	CMC_AUTH_TOKEN,
	CRYPTO_WALLET_NAME,
	CRYPTO_PORTFOLIO_NAME
} from '$env/static/private';

interface Record {
	type: 'income' | 'expense';
	amount: number;
}

function createRecord(portfolioBalance: number, walletBalance: number): Record | null {
	if (portfolioBalance > walletBalance) {
		return {
			type: 'income',
			amount: portfolioBalance - walletBalance
		};
	} else if (portfolioBalance < walletBalance) {
		return {
			type: 'expense',
			amount: walletBalance - portfolioBalance
		};
	} else return null;
}

export const syncCryptoWallet = {
	name: 'Sync Crypto Wallet',
	description: 'Synchronizes CoinMarketCap portfolio with the Wallet app',
	handler: async () => {
		const browserInstance = await createBrowserInstance();
		const walletClient = new WalletClient(WALLET_CREDENTIALS, browserInstance);
		const coinClient = new CoinCapClient(CMC_AUTH_TOKEN);
		const portfolioBalance = await coinClient.getPortfolioBalance(CRYPTO_PORTFOLIO_NAME);
		const accounts = await walletClient.getAccounts();
		const cryptoWallet = accounts.find((account) => account.name === CRYPTO_WALLET_NAME);
		if (!cryptoWallet) throw new Error(`Wallet with the name "${CRYPTO_WALLET_NAME}" not found`);
		const record = createRecord(portfolioBalance, cryptoWallet.balance);
		if (!record) return;
		await walletClient.addRecord(CRYPTO_WALLET_NAME, record.amount, record.type);
	}
} satisfies Job;
