import { Background } from '@/components/background/background';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Jesse Borg',
	description: ''
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="relative">
			<body className={inter.className}>
				<Background />
				{children}
			</body>
		</html>
	);
}
