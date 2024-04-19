import { ProjectListItem } from './project-list-item';

type GitHubRepo = {
	name: string;
	html_url: string;
	description: string;
	created_at: string;
	homepage?: string;
};

export async function GitHubRepos() {
	const res = await fetch('https://api.github.com/users/jesseborg/repos');
	const json = (await res.json()) as Array<GitHubRepo>;
	const repos = json.filter((repo) => repo.homepage === null);

	return (
		<>
			{repos.map((repo) => (
				<a target="_blank" key={repo.name} href={repo.html_url}>
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
