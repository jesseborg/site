import { MDXComponent } from '@/components/mdx';
import { getProject } from '@/db/projects';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type ProjectPageProps = {
	params: {
		slug: string;
	};
};

export default function ProjectPage({ params }: ProjectPageProps) {
	const project = getProject(params.slug);

	if (!project) {
		return notFound();
	}

	const date = new Date(project.metadata.publishedAt).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});

	return (
		<div className="mx-auto w-fit">
			<div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[1fr_640px_1fr]">
				<nav className="left-0 top-12 mb-0 mr-6 h-fit pt-2 sm:sticky">
					<Link className="group flex text-sm italic text-neutral-200 hover:text-white" href="/">
						<span className="icon-right-hook-arrow mr-2 inline-block rotate-180 pt-px" />
						<span className="group-hover:underline">Home</span>
					</Link>
				</nav>
				<article className="flex max-w-[640px] flex-col gap-4 ">
					<Image
						className="w-full rounded-xl shadow-2xl shadow-black"
						src={project.metadata.header}
						alt="Project Header"
						width={640}
						height={170}
					/>
					<div className="flex flex-col gap-0.5">
						<h2 className="text-lg font-medium">{project.metadata.title}</h2>
						<time className="text-xs text-neutral-400">{date.toString()}</time>
					</div>
					<div className="prose text-sm font-light leading-5 tracking-[-0.28px] text-neutral-100">
						<MDXComponent source={project.content} />
					</div>
				</article>
			</div>
		</div>
	);
}
