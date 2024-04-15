import { Providers } from '@/components/providers';
import { inter, interDisplay } from '@/styles/fonts';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Jesse Borg',
	description: 'todo',
	metadataBase: new URL('https://acme.com'),
	alternates: {
		canonical: '/'
	},
	openGraph: {
		type: 'website',
		images: '/og.png',
		url: '/'
	},
	robots: {
		index: false,
		follow: false
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="relative">
			<body
				className={`${inter.variable} ${interDisplay.variable} space-y-8 overflow-x-hidden px-6 py-8 font-sans sm:py-16`}
			>
				{/* <Background /> */}
				<Providers>
					<main>{children}</main>
				</Providers>

				<footer className="text-center text-xs text-theme-500">
					Thanks for checking out my site,{' '}
					<a
						className="border-b-[1px] border-theme-400 text-theme-400 hover:border-theme-300 hover:text-theme-300"
						href="https://github.com/jesseborg/site"
					>
						view source.
					</a>
				</footer>
			</body>
		</html>
	);
}
