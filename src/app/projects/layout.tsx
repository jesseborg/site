import { Suspense } from 'react';
import { NavLink } from './nav-link';

export default function PageLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative mx-auto grid max-w-2xl gap-6 lg:max-w-fit lg:grid-cols-[120px_672px_120px]">
			<nav className="left-0 top-12 mb-0 mr-6 h-fit pt-2 lg:sticky">
				<Suspense>
					<NavLink />
				</Suspense>
			</nav>
			{children}
		</div>
	);
}
