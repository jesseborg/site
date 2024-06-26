import { MDXComponent } from '@/components/mdx';
import { getProject } from '@/lib/projects';
import { dynamicBlurDataURL } from '@/lib/util';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type ProjectPageProps = {
	params: {
		slug: string;
	};
};

export default async function ProjectPage({ params }: ProjectPageProps) {
	const project = getProject(params.slug);

	if (!project) {
		return notFound();
	}

	const blurDataURL = await dynamicBlurDataURL(project.metadata.headerURL);

	const date = new Date(project.metadata.publishedAt).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});

	return (
		<article className="flex flex-col gap-4">
			<span className="halftone pointer-events-none relative overflow-hidden rounded after:blur-[0.5px] sm:rounded-xl">
				<Image
					className="pointer-events-auto w-full shadow-2xl shadow-black"
					loading="eager"
					placeholder="blur"
					blurDataURL={blurDataURL}
					src={project.metadata.headerURL}
					alt="Project Header"
					width={640}
					height={170}
					quality={100}
				/>
			</span>
			<div className="mb-0 flex flex-col gap-0.5 sm:mb-6">
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
		title: `${project.metadata.title} - jesse's site`,
		metadataBase: new URL('https://acme.com'),
		openGraph: {
			url: `/projects/${project.slug}`
		}
	};
}
