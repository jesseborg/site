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
			<h1 className="font-bold">Projects</h1>
			<div className="group/parent flex flex-col focus-within:text-neutral-400 hover:text-neutral-400">
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
			href={{
				pathname: `/projects/${project.slug}`,
				query: { ref: 'projects' }
			}}
			className="group/link -mx-2 flex gap-3 rounded-sm px-2 py-4 text-sm outline-2 outline-offset-4 outline-neutral-100 transition-colors focus-within:text-neutral-100 hover:text-neutral-100 hover:transition-none focus-visible:outline"
			key={project.slug}
		>
			<p>{project.metadata.title}</p>
			<p className="-ml-2 hidden text-neutral-400 group-focus-within/link:!text-neutral-400 group-focus-within/parent:text-neutral-500 group-hover/link:!text-neutral-400 group-hover/parent:text-neutral-500 sm:block">
				{project.metadata.description}
			</p>
			<hr className="flex-1 self-center border-neutral-700 bg-inherit group-hover/link:border-neutral-600" />
			<span className="text-sm">{date}</span>
		</Link>
	);
}
