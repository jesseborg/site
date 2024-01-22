'use client';

import { useMouseWheel } from '@/hooks/use-mouse-wheel';
import { useRef, useState } from 'react';
import { Slider } from './slider';

type VolumeSliderProps = {
	loading?: boolean;
	volume?: number;
	onVolumeChange?: (volume: number) => void;
};

const STEP = 0.01;

export const VolumeSlider = ({
	loading = false,
	volume: initialVolume,
	onVolumeChange
}: VolumeSliderProps) => {
	const ref = useRef<HTMLSpanElement | null>(null);

	const [volume, setVolume] = useState(initialVolume ?? 0);

	useMouseWheel(
		ref,
		{
			onChange: async ({ deltaY }) => {
				if (deltaY) {
					commitValue(volume + STEP * (deltaY / -Math.abs(deltaY)));
				}
			}
		},
		[volume]
	);

	const handleValueChange = async (value: number) => {
		commitValue(value);
	};

	const commitValue = async (value: number) => {
		const volume = Math.max(0, Math.min(1, value));
		setVolume(volume);
		onVolumeChange?.(volume);
	};

	if (loading) {
		return <Skeleton />;
	}

	return (
		<div className="relative h-full w-1">
			<Slider
				ref={ref}
				aria-label="Volume"
				className="absolute left-1/2 -translate-x-1/2"
				orientation="vertical"
				value={[volume]}
				step={STEP}
				max={1}
				onValueChange={([value]) => handleValueChange(value!)}
			/>
		</div>
	);
};

function Skeleton() {
	return <div className="h-full w-1 animate-pulse rounded-full bg-widget-600" />;
}
