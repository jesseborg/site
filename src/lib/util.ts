import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs));
}

const baseURL = process.env.NEXT_PUBLIC_URL;

type Options = {
	width: number;
	quality: number;
};

export async function dynamicBlurDataURL(
	url: string,
	options: Options = {
		width: 16,
		quality: 75
	}
) {
	const response = await fetch(
		`${baseURL}/_next/image?url=${url}&w=${options.width}&q=${options.quality}`
	);

	const base64 = Buffer.from(await response.arrayBuffer()).toString('base64');

	return `data:image/png;base64,${base64}`;
}
