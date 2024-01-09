import { Project, getProjects } from '@/db/projects';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Projects'
};

export default function ProjectsPage() {
	const projects = getProjects();

	if (!projects.length) {
		return (
			<div>
				<h1>No projects found</h1>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 pt-1.5">
			<h1>Projects</h1>
			<div className="group/parent flex flex-col hover:text-neutral-400">
				{projects.map((project) => (
					<ProjectListItem key={project.slug} project={project} />
				))}
			</div>
		</div>
	);
}

function ProjectListItem({ project }: { project: Project }) {
	const date = new Date(project.metadata.publishedAt).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric'
	});

	return (
		<Link
			href={`/projects/${project.slug}`}
			className="group/link flex gap-3 py-4 text-sm transition-colors hover:text-neutral-100 hover:transition-none"
			key={project.slug}
		>
			<p>{project.metadata.title}</p>
			<p className="-ml-2 text-neutral-400 group-hover/link:!text-neutral-400 group-hover/parent:text-neutral-500">
				{project.metadata.description}
			</p>
			<hr className="flex-1 self-center border-neutral-700 bg-inherit group-hover/link:border-neutral-600" />
			<span className="text-sm">{date}</span>
		</Link>
	);
}
