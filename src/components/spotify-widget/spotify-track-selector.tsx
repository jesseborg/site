import Image from 'next/image';
import { HTMLAttributes } from 'react';
import { Track, tracks } from './tracks';

type SpotifyTrackSelectorProps = {
	onChangeTrack?: (index: number) => void;
};

export function SpotifyTrackSelector({ onChangeTrack }: SpotifyTrackSelectorProps) {
	return (
		<div className="not-prose flex w-full justify-center gap-2 px-2">
			{tracks.map((track, index) => (
				<TrackSelectorItem
					onClick={() => onChangeTrack?.(index)}
					key={`${track.name} - ${track.artists.items[0]?.profile.name}`}
					track={track}
				/>
			))}
		</div>
	);
}

type TrackSelectorItemProps = {
	track: Track;
} & HTMLAttributes<HTMLButtonElement>;

function TrackSelectorItem({ track, ...props }: TrackSelectorItemProps) {
	return (
		<button
			role="button"
			aria-label={track.name}
			style={track.theme}
			className="flex select-none items-center gap-1 rounded-md border border-widget-700/80 bg-widget-800/80 px-2 py-1 backdrop-blur-sm transition-colors hover:bg-widget-700/80"
			{...props}
		>
			<Image
				aria-hidden
				className="rounded-sm"
				src={track.coverArt.url}
				alt={`${track.name} by ${track.artists.items[0]?.profile.name}`}
				width="16"
				height="16"
			/>
			<p className="pt-px text-center text-xs text-widget-100">{track.name}</p>
		</button>
	);
}
