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
			<body className={`${inter.variable} ${interDisplay.variable} overflow-x-hidden font-sans`}>
				{/* <Background /> */}
				<Providers>
					<main className="px-6 pb-16 pt-8 sm:pb-32 sm:pt-16">{children}</main>
				</Providers>
			</body>
		</html>
	);
}
