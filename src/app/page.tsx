import { CurrentTime } from '@/components/current-time';
import {
	FigmaIcon,
	NextIcon,
	PrismaIcon,
	ReactIcon,
	RustIcon,
	SuitcaseIcon,
	TailwindIcon,
	TauriIcon,
	TerminalIcon,
	TypeScriptIcon,
	VSCodeIcon
} from '@/components/icons';
import { ProjectCard } from '@/components/project-card';
import { Section } from '@/components/section';
import { getProjects } from '@/db/projects';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default function Home() {
	const projects = getProjects();

	return (
		<article className="mx-auto flex max-w-2xl flex-col">
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
						className="w-full"
						src="/images/header.png"
						alt="Monochromatic image of a bunch of leaves with a halftone effect applied"
						width={640}
						height={150}
					/>
					<Image
						draggable={false}
						className="rendering-pixelated relative mx-auto w-[90%] -translate-y-1/2"
						src="/images/name.png"
						alt="My name 'Jesse Borg' gradually getting more pixelated with each letter"
						width={572}
						height={108}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-8 text-base">
				<div className="prose leading-6 -tracking-[0.2px] text-neutral-300 dark:prose-invert [&_span]:text-neutral-400">
					<p>
						I&apos;m a hobbyist web developer looking for work in front-end development, with a
						growing interest in back-end and software development.
					</p>
					<p>
						Recently I&apos;ve been learning{' '}
						<Link target="_blank" href="https://rust-lang.org">
							Rust
						</Link>{' '}
						in my free time to create desktop apps with the{' '}
						<Link target="_blank" href="https://tauri.app">
							Tauri
						</Link>{' '}
						framework.
					</p>
				</div>
				<Section.Root>
					<Section.Header>
						<Section.Icon>
							<SuitcaseIcon />
						</Section.Icon>
						<Section.Title>projects</Section.Title>
						<Section.Link href="/projects">see more -&gt;</Section.Link>
					</Section.Header>
					<Section.Body className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
					<Section.Body className="flex gap-2">
						<StackIcon tooltip="Figma">
							<FigmaIcon />
						</StackIcon>
						<StackIcon tooltip="VSCode">
							<VSCodeIcon />
						</StackIcon>
						<StackIcon tooltip="TypeScript">
							<TypeScriptIcon />
						</StackIcon>
						<StackIcon tooltip="Rust">
							<RustIcon />
						</StackIcon>
						<StackIcon tooltip="React">
							<ReactIcon />
						</StackIcon>
						<StackIcon tooltip="Tailwind">
							<TailwindIcon />
						</StackIcon>
						<StackIcon tooltip="Tauri">
							<TauriIcon />
						</StackIcon>
						<StackIcon tooltip="Prisma">
							<PrismaIcon />
						</StackIcon>
						<StackIcon tooltip="NextJS">
							<NextIcon />
						</StackIcon>
					</Section.Body>
				</Section.Root>
			</div>
		</article>
	);
}

function StackIcon({ tooltip, children }: PropsWithChildren<{ tooltip?: string }>) {
	return (
		<div
			aria-label={tooltip}
			data-tooltip={tooltip}
			className={cn('rounded-md border-[0.5px] border-white/10 bg-neutral-900 p-[6px]', {
				tooltip: !!tooltip
			})}
		>
			{children}
		</div>
	);
}
