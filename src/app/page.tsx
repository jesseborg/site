import { CurrentTime } from '@/components/current-time';
import { SuitcaseIcon, TerminalIcon } from '@/components/icons';
import { ProjectCard } from '@/components/project-card';
import { Section } from '@/components/section';
import { Tooltip } from '@/components/tooltip';
import { getProjects } from '@/db/projects';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default function Home() {
	const projects = getProjects();

	return (
		<article className="mx-auto flex max-w-2xl flex-col gap-8">
			<div className="flex flex-col gap-3 font-mono text-xs">
				<div className="flex items-center">
					<span aria-hidden className="ping" />
					<p className="flex items-center gap-px">Available for work</p>
					<hr
						aria-hidden
						className="mx-3 flex-1 self-center border-neutral-600 mix-blend-lighten"
					/>
					<CurrentTime />
				</div>
				<div className="relative">
					<Image
						priority
						className="w-full"
						src="/images/header.png"
						alt="Monochromatic image of a bunch of leaves with a halftone effect applied"
						width={640}
						height={150}
					/>
					<Image
						draggable={false}
						className="rendering-pixelated relative mx-auto -mt-8 w-[90%]"
						src="/images/name.png"
						alt="My name 'Jesse Borg' gradually getting more pixelated with each letter"
						width={572}
						height={108}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-8 text-base">
				<div className="prose leading-6 -tracking-[0.2px] text-neutral-300 dark:prose-invert [&>span]:text-neutral-400">
					<p>
						Hi, I&apos;m Jesse! I&apos;ve been a hobbyist web developer for a while but only
						recently decided to start pursuing it as a career.
					</p>
					<p>
						I&apos;m mainly looking for work in front-end development, with a focus on creating
						beautiful<sup>*</sup> user interfaces. However, I also have an interest in back-end
						development.
					</p>

					<sub className="block text-neutral-600">*opinion</sub>
				</div>
				<Section.Root>
					<Section.Header>
						<Section.Icon>
							<SuitcaseIcon />
						</Section.Icon>
						<Section.Title>projects</Section.Title>
						<Section.Link className="group relative inline-flex gap-1" href="/projects">
							see more{' '}
							<div className="transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
								-&gt;
							</div>
						</Section.Link>
					</Section.Header>
					<Section.Body className="relative grid grid-cols-1 gap-2 sm:grid-cols-2">
						<NoiseGlow className="left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-6" />
						<NoiseGlow className="right-0 top-1/2 hidden h-96 w-32 -translate-y-1/2 translate-x-1/2 sm:block" />
						<NoiseGlow className="bottom-0 h-32 w-full translate-y-2/4" />
						{projects.map((project) => {
							return (
								<ProjectCard
									key={project.slug}
									src={project.metadata.thumbnail}
									title={project.metadata.title}
									description={project.metadata.description}
									href={`/projects/${project.slug}`}
								/>
							);
						})}
					</Section.Body>
				</Section.Root>
				<Section.Root>
					<Section.Header>
						<Section.Icon>
							<TerminalIcon />
						</Section.Icon>
						<Section.Title>what i use</Section.Title>
					</Section.Header>
					<Section.Body className="flex flex-wrap gap-2">
						<StackIcon href="https://figma.com" tooltip="Figma" />
						<StackIcon href="https://code.visualstudio.com" tooltip="VSCode" />
						<StackIcon href="https://www.typescriptlang.org" tooltip="TypeScript" />
						<StackIcon href="https://rust-lang.org" tooltip="Rust" />
						<StackIcon href="https://www.typescriptlang.org" tooltip="React" />
						<StackIcon href="https://tailwindcss.com" tooltip="Tailwind" />
						<StackIcon href="https://tauri.app" tooltip="Tauri" />
						<StackIcon href="https://www.prisma.io" tooltip="Prisma" />
						<StackIcon href="https://nextjs.org" tooltip="NextJS">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img alt="Next.js logo" src="/nextjs.svg" width="16" height="16" />
						</StackIcon>
					</Section.Body>
				</Section.Root>
			</div>
		</article>
	);
}

function StackIcon({
	href,
	tooltip,
	children
}: PropsWithChildren<{ href: string; tooltip: string }>) {
	return (
		<Tooltip tooltip={tooltip}>
			<Link
				aria-label={`Icon for ${tooltip}`}
				target="_blank"
				href={href}
				className={
					'rounded-md border-[0.5px] border-white/10 bg-neutral-900 p-[6px] text-white outline-offset-0 hover:bg-neutral-800'
				}
			>
				{!Boolean(children) && (
					<svg role="img" width="16" height="16">
						<use href={`/sprites.svg#${tooltip?.toLowerCase()}`} />
					</svg>
				)}
				{children}
			</Link>
		</Tooltip>
	);
}

function NoiseGlow({ className }: { className: string }) {
	return (
		<span
			className={cn(
				'rendering-pixelated absolute -z-10 bg-[url(/noise.webp)] [mask-image:radial-gradient(black_30%,transparent_80%)]',
				className
			)}
		/>
	);
}
