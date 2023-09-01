import { CoinCapClient } from '$lib';
import { beforeAll, describe, expect, it } from 'vitest';
import { CMC_AUTH_TOKEN } from '$env/static/private';

describe('coinmarketcap client', () => {
	let coinClient: CoinCapClient;
	let portfolioBalance: number;

	beforeAll(async () => {
		coinClient = new CoinCapClient(CMC_AUTH_TOKEN);
	});

	it('should get portfolio balance', async () => {
		portfolioBalance = await coinClient.getPortfolioBalance('Megafolio');
		expect(portfolioBalance).toBeGreaterThan(0);
	});

	it('should be fixed to 2 decimal places', () => {
		expect(portfolioBalance.toFixed(2)).toBe(portfolioBalance.toString());
	});
});
