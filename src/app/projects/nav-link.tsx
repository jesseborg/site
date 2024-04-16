'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type RouteParams = {
	href: string;
	name: string;
};

type Routes = 'home' | 'projects';

const routes: Record<Routes, RouteParams> = {
	home: { href: '/', name: 'Home' },
	projects: { href: '/projects', name: 'Projects' }
};

export function NavLink() {
	const searchParams = useSearchParams();
	const nav = searchParams.get('nav')?.toLowerCase() as Routes;

	const path = routes[nav] ?? routes.home;

	return (
		<Link
			className="group flex rounded-sm text-sm italic text-theme-200 hover:text-theme-50 focus-visible:text-theme-50"
			href={path.href}
		>
			<span className="icon-right-hook-arrow mr-2 inline-block rotate-180 pt-px" />
			<span className="group-hover:underline">{path.name}</span>
		</Link>
	);
}
