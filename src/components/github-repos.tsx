import { ProjectListItem } from './project-list-item';

type GitHubRepo = {
	name: string;
	html_url: string;
	description: string;
	created_at: string;
	homepage?: string;
};

export async function GitHubRepos() {
	const res = await fetch(
		`https://api.github.com/users/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/repos`
	);
	const json = (await res.json()) as Array<GitHubRepo>;
	const repos = json.filter((repo) => repo.homepage === null);

	return (
		<>
			{repos.map((repo) => (
				<a target="_blank" key={repo.name} href={repo.html_url} className="group/link">
					<ProjectListItem
						className="py-2"
						project={{
							title: repo.name,
							description: repo.description,
							publishedAt: repo.created_at
						}}
					/>
				</a>
			))}
		</>
	);
}
