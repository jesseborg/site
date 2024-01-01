import Image from 'next/image';

type ProjectCardProps = {
	src: string;
	title: string;
	description: string;
	href: string;
};

export function ProjectCard(props: ProjectCardProps) {
	return (
		<a
			className="group rounded-xl border border-white/30 bg-neutral-900 p-1 transition-colors duration-200 hover:border-white/40"
			href={props.href}
			rel="noreferrer"
		>
			<div className="relative min-h-[230px] w-full min-w-[284px] overflow-hidden rounded-[10px]">
				<span className="fade-overlay">
					<Image
						className="rendering-pixelated w-full object-fill transition-all duration-200 ease-in-out [filter:grayscale(1)] group-hover:[filter:grayscale(0)]"
						src={props.src}
						alt={props.title}
						width={284}
						height={230}
					/>
				</span>

				<div className="absolute bottom-0 left-0 z-10 w-full p-4 duration-200 ease-in-out will-change-transform group-hover:-translate-y-[2px]">
					<p className="text-sm font-medium leading-6 text-neutral-50">{props.title}</p>
					<p className="text-sm font-normal leading-[9px] text-neutral-300">{props.description}</p>
				</div>
			</div>
		</a>
	);
}
