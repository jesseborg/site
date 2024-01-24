import { ProjectMetadata } from '@/db/projects';
import { cn } from '@/utils/cn';
import { HTMLAttributes } from 'react';

type ProjectListItemProps = {
	project: Partial<ProjectMetadata>;
} & HTMLAttributes<HTMLDivElement>;

export function ProjectListItem({ project, className }: ProjectListItemProps) {
	const date = new Date(project.publishedAt!).toLocaleDateString('en-AU', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric'
	});

	return (
		<div
			className={cn(
				'group/link -mx-2 flex gap-3 rounded-sm px-2 py-4 text-sm outline-2 outline-offset-4 outline-neutral-100 transition-colors focus-within:text-neutral-100 hover:text-neutral-100 hover:transition-none focus-visible:outline',
				className
			)}
		>
			<p>{project.title}</p>
			<p className="-ml-2 hidden text-neutral-400 group-focus-within/link:!text-neutral-400 group-focus-within/parent:text-neutral-500 group-hover/link:!text-neutral-400 group-hover/parent:text-neutral-500 sm:block">
				{project.description}
			</p>
			<hr className="flex-1 self-center border-neutral-700 bg-inherit group-hover/link:border-neutral-600" />
			<span className="text-sm">{date}</span>
		</div>
	);
}

export function ProjectListItemSkeleton() {
	return (
		<div className="animate-pulse space-y-1">
			<div className="my-1 h-8 rounded bg-neutral-800" />
			<div className="my-1 h-8 rounded bg-neutral-800" />
		</div>
	);
}
