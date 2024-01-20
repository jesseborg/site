import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Badge } from './badge';
import { SpotifyWidget, SpotifyWidgetContainer } from './spotify-widget/spotify-widget';

export function MDXComponent(props: MDXRemoteProps) {
	return (
		<MDXRemote
			components={{
				Badge,
				Link,
				SpotifyWidget,
				SpotifyWidgetContainer
			}}
			{...props}
		/>
	);
}
