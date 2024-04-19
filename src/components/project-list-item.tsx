import { ProjectMetadata } from '@/lib/projects';
import { cn } from '@/lib/util';
import { ComponentProps } from 'react';

type ProjectListItemProps = {
	project: Partial<ProjectMetadata>;
} & ComponentProps<'div'>;

export function ProjectListItem({ project, className, ...props }: ProjectListItemProps) {
	const date = new Date(project.publishedAt!).toLocaleDateString('en-AU', {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric'
	});

	return (
		<div
			{...props}
			className={cn(
				'-mx-2 flex gap-3 rounded-sm px-2 py-4 text-sm outline-offset-4 outline-theme-100',
				'hover:text-theme-100',
				'group-focus-within/link:text-theme-100 group-focus-visible/link:outline',
				className
			)}
		>
			<p>{project.title}</p>
			<p className="-ml-2 hidden text-theme-400 group-focus-within/link:!text-theme-400 group-focus-within/parent:text-theme-500 group-hover/link:!text-theme-400 group-hover/parent:text-theme-500 sm:block">
				{project.description}
			</p>
			<hr className="flex-1 self-center border-theme-700 bg-inherit group-focus-within/link:border-theme-600 group-hover/link:border-theme-600" />
			<span className="text-sm">{date}</span>
		</div>
	);
}

export function ProjectListItemSkeleton() {
	return (
		<div className="animate-pulse space-y-1">
			<div className="my-1 h-8 rounded bg-theme-800" />
			<div className="my-1 h-8 rounded bg-theme-800" />
		</div>
	);
}
