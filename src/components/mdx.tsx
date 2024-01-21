import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { Badge } from './badge';
import { SpotifyWidget, SpotifyWidgetContainer } from './spotify-widget/spotify-widget';

function Anchor(
	props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
) {
	return (
		<a
			className="border-b-2 border-neutral-100 text-neutral-200 no-underline hover:text-neutral-50"
			target="_blank"
			{...props}
		/>
	);
}

export function MDXComponent(props: MDXRemoteProps) {
	return (
		<MDXRemote
			components={{
				Badge,
				Link,
				SpotifyWidget,
				SpotifyWidgetContainer,
				a: Anchor
			}}
			{...props}
		/>
	);
}
