'use client';

import { useState } from 'react';
import { Slider } from './slider';

type TimelineProps = {
	loading?: boolean;
	data: {
		timelineStartTime: number;
		timelineEndTime: number;
		timelinePosition: number;
	};
	isPlaying?: boolean;
	onSeek?: (value: number) => void;
};

let timeout: NodeJS.Timeout;

export function TimelineSlider({ loading = false, data, onSeek }: TimelineProps) {
	const [sliderPosition, setSliderPosition] = useState(data.timelinePosition);

	const [isDragging, setIsDragging] = useState(false);

	const commitValue = async (value: number) => {
		setSliderPosition(value);
		setIsDragging(false);

		onSeek?.(value);
	};

	const handleValueChange = (value: number) => {
		setIsDragging(true);
		setSliderPosition(value);
	};

	const handleValueCommit = async (value: number) => {
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			commitValue(value);
		}, 10);
	};

	if (loading) {
		return <Skeleton />;
	}

	return (
		<div className="flex flex-1 flex-col gap-1 text-[10px]">
			<div className="flex h-[10px] w-full items-center justify-between">
				<TimeStamp value={isDragging ? sliderPosition : data.timelinePosition} />
				<TimeStamp value={data.timelineEndTime} />
			</div>
			<span className="pointer-events-auto flex h-1 items-center">
				<Slider
					value={[isDragging ? sliderPosition : data.timelinePosition]}
					max={data.timelineEndTime}
					step={data.timelineEndTime / Math.round(data.timelineEndTime / 1000)}
					onValueChange={([value]) => handleValueChange(value!)}
					onValueCommit={([value]) => handleValueCommit(value!)}
				/>
			</span>
		</div>
	);
}

function Skeleton() {
	return (
		<div className="animate-pulse">
			<div className="mb-1 flex justify-between">
				<div className="h-2 w-[10%] rounded-full bg-widget-600" />
				<div className="h-2 w-[10%] rounded-full bg-widget-600" />
			</div>
			<div className="h-1 rounded-full bg-widget-600" />
		</div>
	);
}

type FormattedTimeProps = {
	value: number;
};

function TimeStamp({ value = 0 }: FormattedTimeProps) {
	return <p className={'transition-all duration-200'}>{formatTime(value)}</p>;
}

function roundAccurate(value: number, decimalPlaces: number) {
	return Number(Math.round(Number(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces);
}

function getTimeData(value: number) {
	const timestamp = Number(value) / 100;
	const minutes = Math.floor(timestamp / 600);
	const seconds = roundAccurate((timestamp / 10) % 60, 3);

	return {
		minutes,
		seconds
	};
}

function formatTime(value: number) {
	const { minutes, seconds } = getTimeData(value);
	const paddedSeconds = String(Math.floor(seconds)).padStart(2, '0');

	return `${minutes}:${paddedSeconds}`;
}
