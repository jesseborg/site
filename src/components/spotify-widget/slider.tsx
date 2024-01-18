'use client';

import { cn } from '@/utils/cn';
import * as RadixSlider from '@radix-ui/react-slider';
import { forwardRef } from 'react';

type SliderPropsBase = {};
type SliderProps = SliderPropsBase & RadixSlider.SliderProps;

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
	({ value, className, ...props }, ref) => {
		return (
			<RadixSlider.Slider
				ref={ref}
				aria-label="Slider"
				className={cn(
					'group relative flex touch-none select-none items-center',
					'data-[orientation=horizontal]:h-5 data-[orientation=horizontal]:w-full',
					'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col',
					className
				)}
				max={100}
				step={1}
				value={value}
				{...props}
			>
				<RadixSlider.Track
					className={cn(
						'relative flex-grow rounded-full bg-widget-300/50',
						'data-[orientation=horizontal]:h-1',
						'data-[orientation=vertical]:w-1'
					)}
				>
					<RadixSlider.Range
						className={cn(
							'absolute rounded-full bg-widget-300 transition-colors group-focus-within:bg-widget-100 group-hover:bg-widget-100',
							'data-[orientation=horizontal]:h-full',
							'data-[orientation=vertical]:w-full'
						)}
					/>
				</RadixSlider.Track>
				{value?.map((_, i) => (
					<RadixSlider.Thumb
						key={i}
						className={cn(
							'block h-[10px] w-[10px] rounded-lg bg-widget-100 opacity-0 shadow-widget-500 transition-opacity hover:bg-widget-50 focus:outline-none group-focus-within:opacity-100 group-hover:opacity-100',
							'data-[orientation=horizontal]:shadow-[-2px_0_4px_-1px_var(--tw-shadow-colored)]',
							'data-[orientation=vertical]:shadow-[0_2px_4px_-1px_var(--tw-shadow-colored)]'
						)}
					/>
				))}
			</RadixSlider.Slider>
		);
	}
);
Slider.displayName = 'Slider';
