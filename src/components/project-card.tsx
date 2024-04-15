import { dynamicBlurDataURL } from '@/lib/util';
import Image from 'next/image';
import Link from 'next/link';

type ProjectCardProps = {
	src: string;
	title: string;
	description: string;
	href: string;
};

export async function ProjectCard(props: ProjectCardProps) {
	const blurDataURL = await dynamicBlurDataURL(props.src);

	return (
		<Link
			className="group min-w-[332px] rounded-xl border border-theme-50/30 bg-theme-900 p-1 transition-colors duration-200 hover:border-theme-50/40 focus-visible:border-2 focus-visible:border-theme-300 focus-visible:outline-0"
			href={props.href}
			rel="noreferrer"
		>
			<div className="relative w-full overflow-hidden rounded-lg border border-theme-700/50">
				<span className="fade-overlay">
					<span className="halftone">
						<Image
							className="rendering-pixelated w-full object-fill transition-all duration-200 ease-in-out [filter:grayscale(1)] group-hover:transition-none group-hover:[filter:grayscale(0)] group-focus-visible:[filter:grayscale(0)]"
							loading="eager"
							placeholder="blur"
							blurDataURL={blurDataURL}
							src={props.src}
							alt={props.title}
							width={308}
							height={230}
						/>
					</span>
				</span>

				<div
					className={
						'absolute bottom-0 left-0 z-10 w-full p-4 font-sans-display duration-200 ease-in-out will-change-transform group-hover:-translate-y-[2px]'
					}
				>
					<p className="text-sm font-medium leading-4 text-white sm:leading-6">{props.title}</p>
					<p className="text-sm font-normal leading-4 text-neutral-300 sm:leading-[9px]">
						{props.description}
					</p>
				</div>
			</div>
		</Link>
	);
}
