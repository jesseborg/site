import { Background } from '@/components/background/background';
import { inter, interDisplay } from '@/styles/fonts';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Jesse Borg',
	description: ''
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="relative">
			<body className={`${inter.variable} ${interDisplay.variable} font-sans`}>
				<Background />
				{children}
			</body>
		</html>
	);
}
