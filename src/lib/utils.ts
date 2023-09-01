import { type ClassValue, clsx } from 'clsx';
import ms from 'ms';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function timeAgo(time?: number): string {
	if (!time) return 'Never';
	return `${ms(Date.now() - new Date(time).getTime())} ago`;
}
