import { MDXComponent } from '@/components/mdx';
import { getProject } from '@/db/projects';
import Image from 'next/image';
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
		<article className="flex flex-col gap-4">
			<span className="halftone pointer-events-none relative overflow-hidden rounded-xl after:blur-[0.5px]">
				<Image
					className="pointer-events-auto w-full shadow-2xl shadow-black"
					src={project.metadata.header}
					alt="Project Header"
					width={640}
					height={170}
					quality={100}
				/>
			</span>
			<div className="mb-6 flex flex-col gap-0.5">
				<h1 className="text-lg font-medium">{project.metadata.title}</h1>
				<time className="text-xs text-neutral-400">{date.toString()}</time>
			</div>
			<div className="prose max-w-none font-light leading-snug text-neutral-100 dark:prose-invert">
				<MDXComponent source={project.content} />
			</div>
		</article>
	);
}

export async function generateMetadata({ params }: ProjectPageProps) {
	const project = getProject(params.slug);

	if (!project) {
		return;
	}

	return {
		title: project.metadata.title,
		metadataBase: new URL('https://acme.com'),
		openGraph: {
			url: `/projects/${project.slug}`
		}
	};
}
