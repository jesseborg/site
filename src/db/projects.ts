import matter from 'gray-matter';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'path';

export type ProjectMetadata = {
	title: string;
	description: string;
	header: string;
	thumbnail: string;
	publishedAt: string;
};

function getMDXFiles(dir: string) {
	return readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(path: string) {
	const content = readFileSync(path, 'utf-8');
	return matter(content);
}

export function getProjects() {
	const dir = path.join(process.cwd(), 'src/content/projects');
	let mdxFiles = getMDXFiles(dir);

	const files = mdxFiles.map((file) => {
		const { data, content } = readMDXFile(path.join(dir, file));
		const slug = path.basename(file, path.extname(file));
		return {
			metadata: data as ProjectMetadata,
			slug,
			content
		};
	});

	if (files.length === 1) {
		return files;
	}

	// Sort by date
	return files.sort((a, b) => {
		if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
			return -1;
		}
		return 1;
	});
}

export function getProject(slug: string) {
	return getProjects().find((project) => project.slug === slug);
}
