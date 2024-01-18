import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const interDisplay = localFont({
	src: [
		{
			path: './InterDisplay-Regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: './InterDisplay-Medium.woff2',
			weight: '500',
			style: 'normal'
		}
	],
	variable: '--font-inter-display'
});

const satoshi = localFont({
	src: './Satoshi-Variable.woff2',
	variable: '--font-satoshi'
});

export { inter, interDisplay, satoshi };
