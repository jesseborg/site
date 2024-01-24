import { ProjectListItem } from '@/components/project-list-item';
import { getProjects } from '@/db/projects';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Projects'
};

export default function ProjectsPage() {
	return (
		<div className="flex flex-col gap-4 pt-1.5">
			<h1 className="font-bold">Projects</h1>
			<ProjectsList />
		</div>
	);
}

function ProjectsList() {
	const projects = getProjects();

	if (!projects.length) {
		return <p>No projects found...</p>;
	}

	return (
		<div className="group/parent flex flex-col focus-within:text-neutral-400 hover:text-neutral-400">
			{projects.map((project) => (
				<Link
					key={project.slug}
					href={{
						pathname: `/projects/${project.slug}`,
						query: { nav: 'projects' }
					}}
				>
					<ProjectListItem project={project.metadata} />
				</Link>
			))}
		</div>
	);
}
