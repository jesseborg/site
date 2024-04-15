import { CurrentTime } from '@/components/current-time';
import { GitHubRepos } from '@/components/github-repos';
import { NextJSIcon, SuitcaseIcon, TerminalIcon } from '@/components/icons';
import { ProjectCard } from '@/components/project-card';
import { ProjectListItemSkeleton } from '@/components/project-list-item';
import { Section } from '@/components/section';
import { Tooltip } from '@/components/tooltip';
import { getProjects } from '@/lib/projects';
import { cn } from '@/lib/util';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren, Suspense } from 'react';

export default function Home() {
	return (
		<article className="mx-auto flex max-w-2xl flex-col gap-8">
			<div className="flex flex-col gap-3 font-mono text-xs">
				<div className="flex items-center">
					<span aria-hidden className="ping" />
					<p className="flex items-center gap-px">Available for work</p>
					<hr aria-hidden className="mx-3 flex-1 self-center border-theme-600" />
					<CurrentTime />
				</div>

				{/* Header Image */}
				<div className="relative mb-2 sm:mb-6">
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
						className="rendering-pixelated absolute bottom-0 left-1/2 mx-auto w-[90%] -translate-x-1/2 translate-y-1/2"
						src="/images/name.png"
						alt="My name 'Jesse Borg' gradually getting more pixelated with each letter"
						width={561}
						height={65}
					/>
					<NoiseGlow className="bottom-0 left-1/2 h-full w-[125%] -translate-x-1/2 translate-y-1/2" />
				</div>
			</div>
			<div className="flex flex-col gap-6 text-base">
				{/* Introduction */}
				<div className="prose !max-w-full leading-6 -tracking-[0.2px] text-theme-300 dark:prose-invert [&>span]:text-theme-400">
					<p>
						Hi, I&apos;m Jesse! I&apos;ve been a hobbyist web developer for around 2+ years but only
						recently decided to start pursuing it as a career.
					</p>
					<p>
						I&apos;m mainly looking for work in front-end development, with a focus on creating
						beautiful<sup>*</sup> user interfaces. However, I also have an interest in back-end
						development.
					</p>

					<sub className="block text-theme-600">*opinion</sub>
				</div>
				<ProjectsSection />
				<OpenSourceSection />
				<TechStackSection />
			</div>
		</article>
	);
}

function ProjectsSection() {
	const projects = getProjects();

	return (
		<Section.Root>
			<Section.Header>
				<Section.Icon>
					<SuitcaseIcon />
				</Section.Icon>
				<Section.Title>projects</Section.Title>
				<Section.Link className="group relative inline-flex gap-1" href="/projects">
					see more <AnimatedRightArrow />
				</Section.Link>
			</Section.Header>
			<Section.Body className="relative grid grid-cols-1 gap-2 sm:grid-cols-2">
				<NoiseGlow className="left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-6 opacity-60" />
				<NoiseGlow className="right-0 top-1/2 hidden h-96 w-32 -translate-y-1/2 translate-x-1/2 opacity-50 sm:block" />
				<NoiseGlow className="bottom-0 h-32 w-full translate-y-2/4 opacity-50" />
				{projects.map((project) => {
					return (
						<ProjectCard
							key={project.slug}
							src={project.metadata.thumbnailURL}
							title={project.metadata.title}
							description={project.metadata.description}
							href={`/projects/${project.slug}`}
						/>
					);
				})}
			</Section.Body>
		</Section.Root>
	);
}

function OpenSourceSection() {
	return (
		<Section.Root>
			<Section.Header>
				<Section.Icon>
					<Image
						alt="GitHub Mona loading gif"
						className="-scale-x-100"
						src="https://github.githubassets.com/images/mona-loading-dark.gif"
						width={24}
						height={24}
					/>
				</Section.Icon>
				<Section.Title className="-ml-2">open source</Section.Title>
				<Section.Link
					className="group relative inline-flex gap-1"
					href="https://github.com/jesseborg"
				>
					see more <AnimatedRightArrow />
				</Section.Link>
			</Section.Header>
			<Section.Body className="group/parent focus-within:text-theme-400 hover:text-theme-400">
				<Suspense fallback={<ProjectListItemSkeleton />}>
					<GitHubRepos />
				</Suspense>
			</Section.Body>
		</Section.Root>
	);
}

function TechStackSection() {
	return (
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
					<NextJSIcon />
				</StackIcon>
			</Section.Body>
		</Section.Root>
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
					'rounded-md border-[0.5px] border-theme-50/10 bg-theme-900 p-[6px] text-theme-300 outline-offset-0 hover:bg-theme-800'
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

function AnimatedRightArrow() {
	return (
		<div className="transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
			-&gt;
		</div>
	);
}
