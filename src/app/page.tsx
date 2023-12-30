'use client';

import { Background } from '@/components/background/background';
import Image from 'next/image';

export default function Home() {
	return (
		<main className="flex h-[100svh] justify-center">
			<Background />

			<div className="flex w-full ">
				<Fade />
				<header className="flex w-[640px] flex-col gap-3 px-6 pt-8 font-mono text-xs sm:pt-16">
					<div className="flex items-center">
						<div className="flex items-center">
							<span aria-hidden className="ping" />
							<p>Available for work</p>
						</div>
						<hr
							aria-hidden
							className="mx-3 flex-1 self-center border-neutral-600 mix-blend-lighten"
						/>
						<p>9:15:00 PM</p>
					</div>

					<div className="relative">
						<Image
							src="/images/header.png"
							alt="Monochromatic image of a bunch of leaves with a halftone effect applied"
							width={640}
							height={150}
						/>
						<Image
							draggable={false}
							className="rendering-pixelated relative mx-auto -translate-y-1/2"
							src="/images/name.png"
							alt="My name gradually getting more pixelated with each letter"
							width={572}
							height={108}
						/>
					</div>
				</header>
				<Fade reverse />
			</div>
		</main>
	);
}

function Fade({ reverse = false }: { reverse?: boolean }) {
	return (
		<span
			className={
				'hidden h-full w-20 flex-1 from-black to-transparent sm:block' +
				(reverse ? ' bg-gradient-to-l' : ' bg-gradient-to-r')
			}
		/>
	);
}
