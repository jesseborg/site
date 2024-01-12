'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const routes = [
	{ href: '/', name: 'Home' },
	{ href: '/projects', name: 'Projects' }
];

export default function PageLayout({ children }: { children: React.ReactNode }) {
	const searchParams = useSearchParams();
	const ref = searchParams.get('ref');

	const path = routes.find((link) => link.href.slice(1) === ref) ?? routes[0]!;

	return (
		<div className="relative mx-auto grid max-w-2xl gap-6 lg:max-w-fit lg:grid-cols-[120px_672px_120px]">
			<nav className="left-0 top-12 mb-0 mr-6 h-fit pt-2 sm:sticky">
				<Link
					className="group flex rounded-sm text-sm italic text-neutral-200 hover:text-white focus-visible:text-white"
					href={path.href}
				>
					<span className="icon-right-hook-arrow mr-2 inline-block rotate-180 pt-px" />
					<span className="group-hover:underline">{path.name}</span>
				</Link>
			</nav>
			{children}
		</div>
	);
}
