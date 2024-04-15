'use client';

import { cn } from '@/lib/util';
import { satoshi } from '@/styles/fonts';
import Image from 'next/image';
import Link from 'next/link';
import {
	CSSProperties,
	HTMLAttributes,
	PropsWithChildren,
	SVGAttributes,
	SyntheticEvent,
	useEffect,
	useRef,
	useState
} from 'react';
import { SpotifyTrackSelector } from './spotify-track-selector';
import { TimelineSlider } from './timeline-slider';
import { tracks, type Track } from './tracks';
import { VolumeSlider } from './volume-slider';

type AudioEvent = SyntheticEvent<HTMLAudioElement, Event>;

const loadingTheme = {
	'--widget-50': '244 245 250',
	'--widget-100': '229 229 244',
	'--widget-200': '209 210 236',
	'--widget-300': '177 180 223',
	'--widget-400': '139 142 207',
	'--widget-500': '114 112 193',
	'--widget-600': '101 93 179',
	'--widget-700': '92 80 160',
	'--widget-800': '82 71 134',
	'--widget-900': '67 60 108'
} as CSSProperties;

export function SpotifyWidgetContainer() {
	const [trackIndex, setTrackIndex] = useState(0);

	return (
		<div className="space-y-2">
			<SpotifyWidget
				track={tracks[trackIndex]!}
				onNextTrack={() => setTrackIndex((i) => (i + 1) % tracks.length)}
				onPreviousTrack={() => setTrackIndex((i) => (i - 1 + tracks.length) % tracks.length)}
			/>
			<SpotifyTrackSelector onChangeTrack={setTrackIndex} />
		</div>
	);
}

type SpotifyWidgetProps = {
	track: Track;
	onNextTrack?: () => void;
	onPreviousTrack?: () => void;
};

export function SpotifyWidget({ track, onNextTrack, onPreviousTrack }: SpotifyWidgetProps) {
	const videoRef = useRef<HTMLAudioElement | null>(null);

	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(0.5);

	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const theme = isLoading ? loadingTheme : track.theme;

	function handleTimelineSeek(value: number) {
		if (!videoRef.current) {
			return;
		}

		const currentTimeSeconds = value / 1000;
		videoRef.current.currentTime = currentTimeSeconds;
	}

	function updateVolume(volume: number) {
		if (!videoRef.current) {
			return;
		}

		videoRef.current.volume = volume;
		setVolume(volume);
	}

	function handleAudioTimeUpdate(event: AudioEvent) {
		setCurrentTime(event.currentTarget.currentTime * 1000);
	}

	function handleAudioLoadedData() {
		if (!videoRef.current) {
			return;
		}

		updateVolume(volume);

		// setIsPlaying(false);
		setIsLoading(false);
		setDuration(videoRef.current?.duration * 1000);
	}

	useEffect(() => {
		handleAudioLoadedData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoRef.current]);

	return (
		<div
			style={theme}
			className={cn(
				'not-prose h-[84px] w-[364px] overflow-hidden rounded-lg border border-widget-700/80 bg-widget-800/80 p-0.5 font-satoshi text-widget-200 backdrop-blur-sm transition-colors',
				satoshi.variable
			)}
		>
			<audio
				ref={videoRef}
				src={track.previews.audioPreview.url}
				autoPlay={isPlaying}
				onPause={() => setIsPlaying(false)}
				onPlay={() => setIsPlaying(true)}
				onTimeUpdate={handleAudioTimeUpdate}
				onLoadedData={handleAudioLoadedData}
			/>

			<div className="flex">
				<Thumbnail
					loading={isLoading}
					src={track.coverArt.url}
					alt={`Cover art for ${track.name} by ${track.artists.items[0]?.profile.name}`}
				>
					<Controls
						isPlaying={isPlaying}
						onPause={() => videoRef.current?.pause()}
						onPlay={() => videoRef.current?.play()}
						onNext={onNextTrack}
						onPrevious={onPreviousTrack}
					/>
				</Thumbnail>

				<div className="flex flex-1 gap-1 px-3 py-2">
					<div className="flex flex-1 flex-col">
						<TrackInfo loading={isLoading} className="flex-grow" track={track} />

						<TimelineSlider
							loading={isLoading}
							data={{
								timelinePosition: currentTime,
								timelineStartTime: 0,
								timelineEndTime: duration
							}}
							onSeek={handleTimelineSeek}
						/>
					</div>

					{/* Volume Slider */}
					<span className="pl-2">
						<VolumeSlider loading={isLoading} volume={volume} onVolumeChange={updateVolume} />
					</span>
				</div>
			</div>
		</div>
	);
}

type TrackInfoBaseProps = {
	loading?: boolean;
	track: Track;
};
type TrackInfoProps = TrackInfoBaseProps & HTMLAttributes<HTMLDivElement>;

function TrackInfo({ loading = false, track, className }: TrackInfoProps) {
	if (loading) {
		return (
			<div className="-mt-0.5 flex-1 animate-pulse space-y-1">
				<div className="h-3.5 w-1/2 rounded-full bg-widget-600" />
				<div className="h-3 w-1/4 rounded-full bg-widget-600" />
			</div>
		);
	}

	return (
		<div className={cn('-mt-1 -space-y-1', className)}>
			<Link
				className={
					'-mx-px inline-block max-w-full truncate rounded-sm px-px text-base font-medium leading-none outline-offset-2 hover:text-widget-100 hover:underline'
				}
				href={track.uri}
			>
				{track.name}
			</Link>
			<div className="flex gap-1">
				{track.artists.items.map((item) => (
					<Link
						key={item.profile.name}
						className={
							'max-w-full truncate rounded-sm text-xs outline-offset-2 hover:text-widget-100 hover:underline'
						}
						href={item.uri}
					>
						{item.profile.name}
					</Link>
				))}
			</div>
		</div>
	);
}

type ThumbnailProps = {
	loading?: boolean;
	src: string;
	alt: string;
};
function Thumbnail({ loading = false, src, alt, children }: PropsWithChildren<ThumbnailProps>) {
	if (loading) {
		return (
			<div className="relative flex h-[78px] w-[78px] items-center justify-center overflow-hidden rounded-md border border-widget-700">
				<div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-[#3f12b8] to-[#7b9287]" />
				<MusicalNoteIcon className="h-1/2 w-1/2" />
			</div>
		);
	}

	return (
		<div className="group relative h-[78px] w-[78px] self-center overflow-hidden rounded-md border border-widget-700">
			<Image className="sticky inset-0" alt={alt} src={src} width="76" height="76" />
			<div
				onAnimationStart={(event) =>
					(event.currentTarget.dataset['active'] = String(event.animationName === 'slide-in'))
				}
				className={cn(
					'absolute bottom-0 left-0 z-10 flex w-full items-center justify-center py-1 pt-2',
					'bg-gradient-to-b from-transparent via-widget-700/80 to-widget-800',
					'translate-y-full animate-slide-out transition-transform [animation-delay:1s]',
					'group-focus-within:animate-slide-in group-focus-within:delay-0 group-hover:animate-slide-in group-hover:[animation-delay:0] [&[data-active=true]]:translate-y-0'
				)}
			>
				{children}
			</div>
		</div>
	);
}

type ControlsProps = {
	isPlaying: boolean;
	onPlay?: () => void;
	onPause?: () => void;
	onNext?: () => void;
	onPrevious?: () => void;
};

function Controls({ isPlaying, onNext, onPause, onPlay, onPrevious }: ControlsProps) {
	return (
		<div className="pointer-events-auto flex">
			<button
				aria-label="Previous track"
				className="flex h-5 w-5 cursor-default flex-col items-center justify-center rounded-sm text-widget-200 outline-none outline-offset-2 transition-colors hover:text-widget-50"
				onClick={onPrevious}
			>
				<PreviousIcon />
			</button>
			{!isPlaying && (
				<button
					aria-label="Play track"
					className="flex h-5 w-5 cursor-default flex-col items-center justify-center rounded-sm text-widget-200 outline-none outline-offset-2 transition-colors hover:text-widget-50"
					onClick={onPlay}
				>
					<PlayIcon />
				</button>
			)}
			{isPlaying && (
				<button
					aria-label="Pause track"
					className="flex h-5 w-5 cursor-default flex-col items-center justify-center rounded-sm text-widget-200 outline-none outline-offset-2 transition-colors hover:text-widget-50"
					onClick={onPause}
				>
					<PauseIcon />
				</button>
			)}
			<button
				aria-label="Next track"
				className="flex h-5 w-5 cursor-default flex-col items-center justify-center rounded-sm text-widget-200 outline-none outline-offset-2 transition-colors hover:text-widget-50"
				onClick={onNext}
			>
				<NextIcon />
			</button>
		</div>
	);
}

function PauseIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
			<path
				fill="currentColor"
				d="M5 6a1 1 0 0 1 2 0v4.65a1 1 0 1 1-2 0V6Zm4 0a1 1 0 0 1 2 0v4.65a1 1 0 1 1-2 0V6Z"
			/>
		</svg>
	);
}
function NextIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
			<path
				fill="currentColor"
				d="M5 5.52a.47.47 0 0 1 .765-.367l3.482 2.785a.47.47 0 0 1 0 .735L5.765 11.46A.47.47 0 0 1 5 11.092V5.52ZM9.5 6a1 1 0 0 1 2 0v4.65a1 1 0 1 1-2 0V6Z"
			/>
		</svg>
	);
}
function PreviousIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
			<path
				fill="currentColor"
				d="M11.5 11.13a.47.47 0 0 1-.765.367L7.253 8.712a.47.47 0 0 1 0-.735l3.482-2.786a.47.47 0 0 1 .765.368v5.57ZM7 10.65a1 1 0 1 1-2 0V6a1 1 0 0 1 2 0v4.65Z"
			/>
		</svg>
	);
}
function PlayIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
			<path
				fill="currentColor"
				d="M6 5.468a.5.5 0 0 1 .815-.388l3.398 2.752a.5.5 0 0 1-.006.782l-3.398 2.67A.5.5 0 0 1 6 10.891V5.468Z"
			/>
		</svg>
	);
}

function MusicalNoteIcon(props: SVGAttributes<SVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className={cn('h-6 w-6', props.className)}
			{...props}
		>
			<path
				fillRule="evenodd"
				d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
