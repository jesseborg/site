import Link from 'next/link';

export default function PageLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative mx-auto grid max-w-2xl gap-6 lg:max-w-fit lg:grid-cols-[120px_672px_120px]">
			<nav className="left-0 top-12 mb-0 mr-6 h-fit pt-2 sm:sticky">
				<Link
					className="group flex rounded-sm text-sm italic text-neutral-200 hover:text-white focus-visible:text-white"
					href="/"
				>
					<span className="icon-right-hook-arrow mr-2 inline-block rotate-180 pt-px" />
					<span className="group-hover:underline">Home</span>
				</Link>
			</nav>
			{children}
		</div>
	);
}
