import { ReactNode } from 'react';

export function Badge({ href, children }: { href: string; children: ReactNode }) {
	return (
		<a
			target="_blank"
			href={href}
			className="not-prose group inline-flex items-baseline gap-1 rounded-md border border-neutral-700 bg-neutral-800 px-1.5 py-1 text-sm text-white outline-offset-0 transition-colors hover:border-neutral-600 hover:bg-neutral-700 focus-visible:border-neutral-600 focus-visible:bg-neutral-700 [&>svg]:self-center"
		>
			{children}
			<span className="relative -top-0.5 origin-center font-sans-display text-xs text-neutral-300 transition-transform group-hover:-rotate-12 group-focus-visible:-rotate-12">
				&#x2197;
			</span>
		</a>
	);
}
