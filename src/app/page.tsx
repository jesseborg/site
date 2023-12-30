'use client';

import { Background } from '@/components/background/background';

export default function Home() {
	return (
		<main className="flex h-[100svh] items-center justify-center">
			<Background />
			<h1 className="relative text-4xl font-bold text-white ">Hello World!</h1>
		</main>
	);
}
