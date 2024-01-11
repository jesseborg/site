import { CurrentTime } from '@/components/current-time';
import { SuitcaseIcon, TerminalIcon } from '@/components/icons';
import { ProjectCard } from '@/components/project-card';
import { Section } from '@/components/section';
import { Tooltip } from '@/components/tooltip';
import { getProjects } from '@/db/projects';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren, ReactNode } from 'react';

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
				<div className="prose leading-6 -tracking-[0.2px] text-neutral-300 dark:prose-invert [&_span]:text-neutral-400">
					<p>
						I&apos;m a hobbyist web developer looking for work in front-end development, with a
						growing interest in back-end and software development.
					</p>
					<p className="leading-7">
						{"Recently I've been learning "}
						<Badge href="https://rust-lang.org">
							<svg role="img" width="16" height="16">
								<use href="/sprites.svg#rust" />
							</svg>
							Rust
						</Badge>
						{' in my free time to create desktop apps with the '}
						<Badge href="https://tauri.app">
							<svg role="img" width="16" height="16">
								<use href="/sprites.svg#tauri" />
							</svg>
							Tauri
						</Badge>
						{' framework.'}
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

function Badge({ href, children }: { href: string; children: ReactNode }) {
	return (
		<Link
			target="_blank"
			href={href}
			className="not-prose inline-flex items-baseline gap-1 rounded-md border border-neutral-700 bg-neutral-800 px-1.5 py-1 text-sm text-white outline-offset-0 transition-colors hover:border-neutral-600 hover:bg-neutral-700 focus-visible:border-neutral-600 focus-visible:bg-neutral-700 [&>svg]:self-center"
		>
			{children}
			<span className="icon-north-east-arrow self-start text-xs [&::before]:text-neutral-300" />
		</Link>
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
